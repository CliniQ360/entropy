from fastapi import APIRouter, HTTPException, status, UploadFile, File
from typing import List, Optional
import asyncio
import openai
import os
import uuid
from core.apis.schemas.conversation_input_schema import ConversationResume
from core.apis.schemas.conversation_output_schema import ConversationOutput
from core.controllers.text_conversation_controller import TextConversationController
from core.controllers.audio_conversation_controller import AudioConversationController
from core import logger

conversation_router = APIRouter()
logging = logger(__name__)


@conversation_router.post(
    "/v1/langgraph/start_conversation", response_model=ConversationOutput
)
async def start_conversation():
    try:
        logging.info(f"Calling /v1/langgraph/start_conversation endpoint")
        thread_id = str(uuid.uuid4())
        logging.debug(f"{thread_id=}")
        return AudioConversationController().start_conversation(thread_id)
    except Exception as error:
        logging.error(f"Error in /v1/langgraph/start_conversation endpoint: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(error),
            headers={"WWW-Authenticate": "Bearer"},
        )


@conversation_router.post("/v1/langgraph/upload_documents")
async def upload_documents(files: Optional[List[UploadFile]] = File(None)):
    try:
        logging.info(f"Calling /v1/langgraph/upload_documents endpoint")
        return AudioConversationController().upload_documents(files=files)
    except Exception as error:
        logging.error(f"Error in /v1/langgraph/upload_documents endpoint: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(error),
            headers={"WWW-Authenticate": "Bearer"},
        )


@conversation_router.get("/v1/langgraph/state")
def get_state(thread_id: str):
    try:
        logging.info(f"Calling /v1/langgraph/state endpoint")
        return AudioConversationController().get_state(thread_id=thread_id)
    except Exception as error:
        logging.error(f"Error in /v1/langgraph/state endpoint: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(error),
            headers={"WWW-Authenticate": "Bearer"},
        )


@conversation_router.post(
    "/v1/langgraph/resume_conversation", response_model=ConversationOutput
)
def resume_conversation(request: ConversationResume):
    try:
        logging.info(f"Calling /v1/langgraph/resume_conversation endpoint")
        logging.debug(f"{request=}")
        request_dict = request.model_dump()
        return AudioConversationController().resume_conversation(**request_dict)
    except Exception as error:
        logging.error(f"Error in /v1/langgraph/resume_conversation endpoint: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(error),
            headers={"WWW-Authenticate": "Bearer"},
        )
