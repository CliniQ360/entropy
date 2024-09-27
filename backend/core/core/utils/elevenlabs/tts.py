from groq import Groq
import os, io
from elevenlabs import VoiceSettings
from elevenlabs.client import ElevenLabs

from dotenv import load_dotenv

load_dotenv()


class ElevenLabsHelper:
    def __init__(self):
        self.api_key = os.environ.get("ELEVENLABS_API_KEY")

    def text_to_speech_generator(text: str, output_path: str):
        print("Inside TTS 11labs")
        print(f"{os.environ.get("ELEVENLABS_API_KEY")=}")
        client = ElevenLabs(
            api_key=os.environ.get("ELEVENLABS_API_KEY"),
        )
        result = client.text_to_speech.convert(
            voice_id="pMsXgVXv3BLzUgSXRplE",
            optimize_streaming_latency="0",
            output_format="mp3_22050_32",
            text=text,
            voice_settings=VoiceSettings(
                stability=0.1,
                similarity_boost=0.3,
                style=0.2,
            ),
        )

        audio_buffer = io.BytesIO()

        for chunk in result:
            audio_buffer.write(chunk)

        # Move the buffer's position to the start
        audio_buffer.seek(0)
        # print(f"{audio_buffer.getvalue()}")
        # Return the bytes of the audio
        return audio_buffer.getvalue()
