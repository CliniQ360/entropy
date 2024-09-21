from langchain_google_vertexai import ChatVertexAI
from langchain_core.messages import HumanMessage
import os, base64

project = os.environ["PROJECT_ID"]
location = os.environ["LOCATION"]

llm_pro = ChatVertexAI(
    model="gemini-1.5-pro-001", temperature=0.0, project=project, location=location
)

llm_flash = ChatVertexAI(
    model="gemini-1.5-flash-001", temperature=0.0, project=project, location=location
)


def transcribe(gcs_uri: str, input_prompt: str = None):
    if input_prompt:
        prompt = input_prompt
    else:
        prompt = "Transcribe the audio file."
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
    response = llm_flash.invoke([message])
    return {"transcription": response.content}
