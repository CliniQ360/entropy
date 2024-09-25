from openai import OpenAI
from pydantic import BaseModel
from enum import Enum
import base64
import os
import openai
from langchain_openai import ChatOpenAI

client = OpenAI()


class Gender(str, Enum):
    Male = "Male"
    Female = "Female"
    Others = "Others"


class UserDetails(BaseModel):
    first_name: str
    middle_name: str
    last_name: str
    gender: Gender
    date_of_birth: str
    address: str
    city: str
    state: str


def openAI_vision_inference(image_bytes, prompt: str, model: str = "gpt-4o-mini"):
    content = [
        {
            "type": "text",
            "text": "You are a helpful OCR agent. Extract all the user information from the images attached.",
        }
    ]
    for image_byte in image_bytes:
        base64_image = base64.b64encode(image_byte).decode("utf-8")
        image_obj = {
            "type": "image_url",
            "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"},
        }
        content.append(image_obj)
    completion = client.beta.chat.completions.parse(
        model=model,
        messages=[{"role": "user", "content": content}],
        max_tokens=300,
        response_format=UserDetails,
    )
    return completion.choices[0].message.parsed


class WhisperHelper:
    def __init__(self):
        self.api_key = os.environ.get("OPENAI_API_KEY")
        openai.api_key = self.api_key
        self.temperature = 0.0

    def translate(self, file_path: str, prompt: str = None):
        try:
            audio_file = open(file_path, "rb")
            translation = openai.audio.translations.create(
                model="whisper-1",
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
            transcription = openai.audio.transcriptions.create(
                model="whisper-1",
                file=audio_file,
                extra_query={
                    "language": "en",
                    "compression_ratio_threshold": 2.0,
                    "no_speech_threshold": 0.1,
                },
                prompt=prompt,
            )
            return {"transcription": transcription.text}
        except Exception as error:
            raise error


llm_4o = ChatOpenAI(model="gpt-4o-2024-05-13", temperature=0)
llm_4omini = ChatOpenAI(model="gpt-4o-mini-2024-07-18", temperature=0)
