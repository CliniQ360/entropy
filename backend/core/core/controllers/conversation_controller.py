import os, uuid, time
from groq import Groq
from core import logger
import base64
from fastapi import Response
from datetime import datetime
from core.utils.groq.stt import GroqHelper
from core.utils.elevenlabs.tts import ElevenLabsHelper


logging = logger(__name__)


class ConversationController:
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

    def conversation_init(
        self,
        audio_file_data: bytes,
        audio_file_name: str,
        translate: bool,
    ):
        try:
            master_start = time.time()
            logging.info("executing ConversationController.conversation_init function")
            audio_file_folder_path = f"/app/audio_data"
            os.makedirs(audio_file_folder_path, exist_ok=True)
            _, audio_file_ext = os.path.splitext(audio_file_name)
            input_file_name = f"C360-AUDIO-{str(uuid.uuid1().int)[:6]}-input"
            output_file_name = f"C360-AUDIO-{str(uuid.uuid1().int)[:6]}-output"
            audio_file_path = (
                f"{audio_file_folder_path}/{input_file_name}{audio_file_ext}"
            )
            logging.info("Saving audio file to local")
            with open(audio_file_path, "wb") as f:
                f.write(audio_file_data)
            if translate:
                logging.info("Translating file using Groq whisper")
                transcription_result = GroqHelper().translate(file_path=audio_file_path)

            else:
                logging.info("Trancribing file using Groq whisper")
                transcription_result = GroqHelper().transcribe(
                    file_path=audio_file_path
                )
            end = time.time()
            logging.info(f"Transcription Time: {end-master_start}")
            transcribed_text = transcription_result.get("transcription")
            logging.info(f"Transcription Text: {transcribed_text=}")
            response_text = self.text_generator(transcribed_text=transcribed_text)
            output_audio_file_path = (
                f"{audio_file_folder_path}/{output_file_name}{audio_file_ext}"
            )
            logging.info(f"executing text to speech function")
            audio_data = ElevenLabsHelper.text_to_speech_generator(
                text=response_text.get("text"), output_path=output_audio_file_path
            )

            # Encode audio bytes as base64
            audio_base64 = base64.b64encode(audio_data).decode("utf-8")
            # audio_data_encoded = Response(content=audio_data, media_type="audio/mpeg")

            return {
                "audio_file": audio_base64,
                "text": response_text,
                "file_name": output_audio_file_path,
            }
        except Exception as error:
            logging.error(
                f"Error in ConversationController.conversation_init function: {error}"
            )
            raise error
