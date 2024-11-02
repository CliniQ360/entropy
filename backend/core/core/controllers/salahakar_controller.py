from psycopg_pool import ConnectionPool
from langgraph.checkpoint.postgres import PostgresSaver
from core import logger
import os, uuid, time
from groq import Groq
import base64
from fastapi import Response
from datetime import datetime
from core.utils.groq.stt import GroqHelper
from core.utils.elevenlabs.tts import ElevenLabsHelper
from core.utils.sarvam_helper import SarvamAPI
from core.controllers.insurance_audio_conversation_controller import (
    InsuranceAudioConversationController,
)
from core.utils.vertex_ai_helper.gemini_helper import transcribe, translate
from core.utils.vertex_ai_helper.gcs_helper import upload_blob_string
from core.utils.openai_helper import WhisperHelper

logging = logger(__name__)


class SalahakarController:
    def __init__(self):

        self.DB_URI = os.getenv("DB_URI")
        self.LLM_CONFIG = os.getenv("LLM_CONFIG")
        self.bucket_name = os.getenv("GCS_BUCKET_NAME")
        self.stt_service = os.getenv("STT_SERVICE")
        self.audio_file_folder_path = f"/app/audio_data"
        self.local_testing = os.getenv("LOCAL_TESTING")

    def text_generator(self, transcribed_text: str):
        if transcribed_text:
            logging.debug(f"{transcribed_text=}")
            return {"text": "Hi there! I am your personal loan assistant"}
            # return {
            #     "text": """Hi there! I am your personal loan assistant, here to guide you through the process of availing a loan on the ONDC network.
            #     Whether you were comparing loan options, checking eligibility, or submitting your application,
            #     I will help you every step of the way.
            #     Let us make securing your personal loan simple, fast, and hassle-free!"""
            # }

    async def upload_documents(self, thread_id, files):
        try:
            logging.info(f"SalahakarController: upload_documents")
            file_path_list = []
            for document in files:
                document_name = document.filename
                logging.info(f"{document_name=}")
                document_data = await document.read()
                document_path = (
                    f"/app/data/CUSTOMER_DATA/{thread_id}/PERSONAL_DOCUMENTS"
                )
                os.makedirs(document_path, exist_ok=True)
                document_key = f"{document_path}/{document_name}"
                with open(document_key, "wb") as f:
                    f.write(document_data)
                file_path_list.append(document_key)
            return {"file_path_list": file_path_list}
        except Exception as error:
            logging.error(f"Error in SalahakarController.upload_documents: {error}")
            raise error

    def start_audio_conversation(self, language: str):
        thread_id = str(uuid.uuid4())
        logging.debug(f"{thread_id=}")
        conversation_response = (
            InsuranceAudioConversationController().start_conversation(
                thread_id=thread_id, language=language
            )
        )
        agent_message = conversation_response.get("agent_message")
        output_file_name = f"C360-AUDIO-{str(uuid.uuid1().int)[:6]}-output.mp3"
        # output_audio_file_path = f"{self.audio_file_folder_path}/{output_file_name}"
        # logging.info(f"executing text to speech function")
        # agent_audio_data = ElevenLabsHelper().text_to_speech_generator(
        #     text=agent_message, output_path=output_audio_file_path
        # )
        # Encode audio bytes as base64
        language = conversation_response.get("language")
        welcome_message_audio_path = f"/app/data/STATIC_AUDIO_DATA/{self.stt_service}/{language}/welcome_message.txt"
        audio_base64_str = open(welcome_message_audio_path, "r").read()
        # audio_base64 = ""
        conversation_response.update({"agent_audio_data": audio_base64_str})
        return conversation_response

    def resume_audio_conversation(self, request):
        try:
            master_start = time.time()
            logging.info(
                "executing SalahakarController.resume_audio_conversation function"
            )
            os.makedirs(self.audio_file_folder_path, exist_ok=True)
            audio_data = request.get("audio_data", None)
            output_file_name = f"C360-AUDIO-{str(uuid.uuid1().int)[:6]}-output.mp3"
            if audio_data:
                logging.info(f"Audio data received")
                audio_file_name = request.get("audio_file_name", None)
                _, audio_file_ext = os.path.splitext(audio_file_name)
                # inp_audio_file_path = (
                #     f"{audio_file_folder_path}/{input_file_name}{audio_file_ext}"
                # )
                input_file_name = (
                    f"C360-AUDIO-{str(uuid.uuid1().int)[:6]}-input{audio_file_ext}"
                )
                inp_audio_file_path = f"{self.audio_file_folder_path}/{input_file_name}"
                custom_prompt = None
                if request.get("state") == "human_feedback":
                    custom_prompt = """The audio might contains technical information, including email addresses and domain names.
                        Do not convert the @ symbol into at the rate or the . symbol into dot. Please transcribe the audio verbatim with exact character
                        preservation for email addresses and technical terms.
                        Pay special attention to ensuring special characters are accurately captured, as is"""
                if self.LLM_CONFIG == "GOOGLE":
                    logging.info(f"Saving audio file to GCS at {input_file_name=}")
                    gcs_uri = upload_blob_string(
                        bucket_name=self.bucket_name,
                        destination_file_name=input_file_name,
                        content_type="audio/mpeg",
                        file=audio_data,
                    )
                    if request.get("language") == "en":
                        logging.info(f"Transcribing file")
                        transcription_result = transcribe(
                            gcs_uri=gcs_uri, input_prompt=custom_prompt
                        )
                    else:
                        logging.info(f"Translating file")
                        transcription_result = translate(
                            gcs_uri=gcs_uri,
                            # input_prompt=custom_prompt
                        )
                else:
                    logging.info(
                        f"Saving audio file to local at {inp_audio_file_path=}"
                    )
                    with open(inp_audio_file_path, "wb") as f:
                        f.write(audio_data)
                    # if request.get("translate"):
                    #     logging.info("Translating file using Groq whisper")
                    #     transcription_result = GroqHelper().translate(
                    #         file_path=inp_audio_file_path, prompt=custom_prompt
                    #     )
                    # else:
                    #     logging.info("Trancribing file using Groq whisper")
                    #     transcription_result = GroqHelper().transcribe(
                    #         file_path=inp_audio_file_path, prompt=custom_prompt
                    #     )
                    logging.info("Trancribing file using OpenAI Whisper")
                    transcription_result = WhisperHelper().transcribe(
                        file_path=inp_audio_file_path
                    )
                end = time.time()
                logging.info(f"Transcription Time: {end-master_start}")
                transcribed_text = transcription_result.get("transcription")
                translated_text = transcription_result.get("transcription_hindi", None)
                logging.info(f"Transcription Text: {transcribed_text=}")
                request.update({"user_message": [transcribed_text]})
                if translated_text:
                    request.update({"user_message_hindi": [translated_text]})
                # request.update({"gcs_uri": gcs_uri})
            else:
                logging.info(f"Audio data not received")
                request.update({"user_message": ["dummy message"]})
                # request.update({"gcs_uri": None})
            workflow_payload = {
                "thread_id": request.get("thread_id"),
                "state": request.get("state"),
                "user_message": request.get("user_message"),
                "user_message_hindi": request.get("user_message_hindi", []),
                "document_upload_flag": request.get("document_upload_flag"),
                "offer_item_id": request.get("offer_item_id"),
                "selected_loan_amount": request.get("selected_loan_amount"),
            }
            logging.info(f"{workflow_payload=}")
            conversation_response = (
                InsuranceAudioConversationController().resume_conversation(
                    **workflow_payload
                )
            )
            logging.info(f"{conversation_response=}")
            agent_message = conversation_response.get("agent_message")
            modified = conversation_response.get("modified")
            next_state = conversation_response.get("next_state")
            language = conversation_response.get("language")
            if modified:
                agent_message = conversation_response.get("agent_message_modified")
            # elif next_state == "human_loan_tnc_feedback":
            #     logging.info(
            #         f"Reading default audio message for human_loan_tnc_feedback"
            #     )
            #     congratulations_message_audio_path = f"/app/data/STATIC_AUDIO_DATA/{self.stt_service}/{language}/congratulations_message.txt"
            #     audio_base64 = open(congratulations_message_audio_path, "r").read()
            logging.info(f"executing text to speech function")
            if self.local_testing:
                audio_base64 = ""
            else:
                if self.stt_service == "11LABS":
                    logging.info(f"executing text to speech with 11LABS")
                    agent_audio_data = ElevenLabsHelper().text_to_speech_generator(
                        text=agent_message
                    )
                    # Encode audio bytes as base64
                    if agent_audio_data:
                        audio_base64 = base64.b64encode(agent_audio_data).decode(
                            "utf-8"
                        )
                    else:
                        audio_base64 = ""
                else:
                    logging.info(f"executing text to speech with Sarvam")
                    agent_audio_data = SarvamAPI().sarvam_tts(text=agent_message)
                    # Encode audio bytes as base64
                    if agent_audio_data:
                        audio_base64 = agent_audio_data
                    else:
                        audio_base64 = ""
            if language == "hi":
                user_message_hindi = conversation_response.get("user_message_hindi")
                conversation_response.update({"user_message": user_message_hindi})
            conversation_response.update({"agent_audio_data": audio_base64})
            return conversation_response
        except Exception as error:
            logging.error(
                f"Error in SalahakarController.resume_audio_conversation function: {error}"
            )
            raise error

    def generate_audio_bytes(self, text: str):
        logging.info(f"executing generate_audio_bytes function")
        logging.info(f"{text=}")
        agent_audio_data = ElevenLabsHelper().text_to_speech_generator(text=text)
        # Encode audio bytes as base64
        if agent_audio_data:
            audio_base64 = base64.b64encode(agent_audio_data).decode("utf-8")
        else:
            audio_base64 = ""
        return audio_base64
