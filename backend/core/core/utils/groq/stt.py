from groq import Groq
import os


class GroqHelper:
    def __init__(self):
        self.api_key = os.environ.get("GROQ_API_KEY")
        self.client = Groq(api_key=self.api_key)

    def translate(self, file_path: str, prompt: str = None):
        try:
            audio_file = open(file_path, "rb")
            translation = self.client.audio.translations.create(
                model="whisper-large-v3",
                file=audio_file,
                extra_query={
                    "language": "hi",
                    "compression_ratio_threshold": 2.0,
                    "no_speech_threshold": 0.1,
                },
                prompt=prompt,
            )
            return {"transcription": translation.text}
        except Exception as error:
            raise error

    def transcribe(self, file_path: str, prompt: str = None):
        try:
            audio_file = open(file_path, "rb")
            transcription = self.client.audio.transcriptions.create(
                model="whisper-large-v3",
                file=audio_file,
                extra_query={
                    "compression_ratio_threshold": 2.0,
                    "no_speech_threshold": 0.1,
                },
                prompt=prompt,
            )
            return {"transcription": transcription.text}
        except Exception as error:
            raise error
