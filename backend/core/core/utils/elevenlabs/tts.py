from groq import Groq
import os, io
from elevenlabs import VoiceSettings
from elevenlabs.client import ElevenLabs

from dotenv import load_dotenv

load_dotenv()


class ElevenLabsHelper:
    def __init__(self):
        self.api_key = os.environ.get("ELEVENLABS_API_KEY")
        self.client = ElevenLabs(api_key=self.api_key)
        self.voice_id = os.environ.get("ELEVENLABS_VOICE_ID")
        self.local_testing = os.environ.get("LOCAL_TESTING")

    def text_to_speech_generator(self, text: str):
        print("Inside TTS 11labs")
        if self.local_testing == "True":
            print(f"Bypassing audio generation")
            return None
        result = self.client.text_to_speech.convert(
            voice_id=self.voice_id,
            optimize_streaming_latency="0",
            output_format="mp3_22050_32",
            text=text,
            voice_settings=VoiceSettings(
                stability=0.9,
                similarity_boost=0.5,
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
