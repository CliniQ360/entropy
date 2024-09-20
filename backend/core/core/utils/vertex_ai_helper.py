from langchain_google_vertexai import ChatVertexAI
import os

project = os.environ["PROJECT_ID"]
location = os.environ["LOCATION"]

llm_pro = ChatVertexAI(
    model="gemini-1.5-pro-001", temperature=0.0, project=project, location=location
)

llm_flash = ChatVertexAI(
    model="gemini-1.5-flash-001", temperature=0.0, project=project, location=location
)
