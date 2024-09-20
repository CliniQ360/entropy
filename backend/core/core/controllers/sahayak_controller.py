from core.agents.workflow import build_workflow
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
from core.apis.schemas.conversation_input_schema import ConversationResume
from core.controllers.conversation_controller import ConversationController

logging = logger(__name__)


class SahayakController:
    def __init__(self):

        self.DB_URI = os.getenv("DB_URI")

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

    def speech_to_speech(self, request):
        try:
            master_start = time.time()
            logging.info("executing SahayakController.speech_to_speech function")
            audio_file_folder_path = f"/app/audio_data"
            os.makedirs(audio_file_folder_path, exist_ok=True)
            audio_file_name = request.pop("audio_file_name")
            audio_data = request.pop("audio_data")
            _, audio_file_ext = os.path.splitext(audio_file_name)
            input_file_name = f"C360-AUDIO-{str(uuid.uuid1().int)[:6]}-input"
            output_file_name = f"C360-AUDIO-{str(uuid.uuid1().int)[:6]}-output"
            inp_audio_file_path = (
                f"{audio_file_folder_path}/{input_file_name}{audio_file_ext}"
            )
            logging.info(f"Saving audio file to local at {inp_audio_file_path=}")
            with open(inp_audio_file_path, "wb") as f:
                f.write(audio_data)
            if request.get("translate"):
                logging.info("Translating file using Groq whisper")
                transcription_result = GroqHelper().translate(
                    file_path=inp_audio_file_path
                )

            else:
                logging.info("Trancribing file using Groq whisper")
                transcription_result = GroqHelper().transcribe(
                    file_path=inp_audio_file_path
                )
            end = time.time()
            logging.info(f"Transcription Time: {end-master_start}")
            transcribed_text = transcription_result.get("transcription")
            logging.info(f"Transcription Text: {transcribed_text=}")
            request.update({"user_message": transcribed_text})
            conversation_response = ConversationController().resume_conversation(
                **request
            )
            agent_message = conversation_response.get("agent_message")
            output_audio_file_path = (
                f"{audio_file_folder_path}/{output_file_name}{audio_file_ext}"
            )
            logging.info(f"executing text to speech function")
            agent_audio_data = ElevenLabsHelper.text_to_speech_generator(
                text=agent_message, output_path=output_audio_file_path
            )

            # Encode audio bytes as base64
            audio_base64 = base64.b64encode(agent_audio_data).decode("utf-8")
            conversation_response.update({"agent_audio_data": audio_base64})
            return conversation_response
        except Exception as error:
            logging.error(
                f"Error in SahayakController.speech_to_speech function: {error}"
            )
            raise error
