from langchain_google_vertexai import ChatVertexAI

from langchain_core.messages import HumanMessage
import os, base64
from pydantic import BaseModel

project = os.environ["PROJECT_ID"]
location = os.environ["LOCATION"]

llm_pro = ChatVertexAI(
    model="gemini-1.5-pro-001",
    temperature=0.0,
    project=project,
    location=location,
    top_p=0.4,
)

llm_flash = ChatVertexAI(
    model="gemini-1.5-flash-001",
    temperature=0.0,
    project=project,
    location=location,
    top_p=0.4,
)

llm_002_pro = ChatVertexAI(
    model="gemini-1.5-pro-002",
    temperature=0.0,
    project=project,
    location=location,
    top_p=0.4,
)

llm_002_flash = ChatVertexAI(
    model="gemini-1.5-flash-002",
    temperature=0.0,
    project=project,
    location=location,
    top_p=0.4,
)


class Transcription(BaseModel):
    transription_in_english: str
    transription_in_hindi: str


def translate(gcs_uri: str, input_prompt: str = None):
    if input_prompt:
        prompt = input_prompt
    else:
        prompt = "Transcribe the audio verbatim. Ignore any background noise and transcribe only the primary audio."
    message = HumanMessage(
        [
            prompt,
            {
                "type": "media",
                "file_uri": gcs_uri,
                "mime_type": "audio/mpeg",
            },
        ]
    )
    structured_llm = llm_pro.with_structured_output(Transcription)
    response = structured_llm.invoke([message])
    return {
        "transcription": response.transription_in_english,
        "transcription_hindi": response.transription_in_hindi,
    }


def transcribe(gcs_uri: str, input_prompt: str = None):
    if input_prompt:
        prompt = input_prompt
    else:
        prompt = "Transcribe the audio verbatim. Ignore any background noise and transcribe only the primary audio."
    message = HumanMessage(
        [
            prompt,
            {
                "type": "media",
                "file_uri": gcs_uri,
                "mime_type": "audio/mpeg",
            },
        ]
    )
    response = llm_pro.invoke([message])
    return {"transcription": response.content}
