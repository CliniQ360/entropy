from fastapi import APIRouter, HTTPException, status
import asyncio
import openai
import os
import uuid
from core.apis.schemas.conversation_input_schema import ConversationResume
from core.apis.schemas.conversation_output_schema import ConversationOutput
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
    except Exception as error:
        logging.error(f"Error in /v1/langgraph/start_conversation endpoint: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(error),
            headers={"WWW-Authenticate": "Bearer"},
        )


@conversation_router.post(
    "/v1/langgraph/resume_conversation", response_model=ConversationOutput
)
async def resume_conversation(request: ConversationResume):
    try:
        logging.info(f"Calling /v1/langgraph/resume_conversation endpoint")
        logging.debug(f"{request=}")
    except Exception as error:
        logging.error(f"Error in /v1/langgraph/resume_conversation endpoint: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(error),
            headers={"WWW-Authenticate": "Bearer"},
        )
