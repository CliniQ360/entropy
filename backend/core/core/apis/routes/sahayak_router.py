from fastapi import APIRouter, HTTPException, status, UploadFile, File
from typing import List, Optional
import asyncio
import openai
import os
import uuid
from core.apis.schemas.conversation_input_schema import SahayakResumeConversation
from core.apis.schemas.sahayak_output_schema import SahayakOutput
from core.controllers.sahayak_controller import SahayakController
from core import logger

sahayak_router = APIRouter()
logging = logger(__name__)


@sahayak_router.post("/v1/sahayak/resume_conversation", response_model=SahayakOutput)
async def resume_conversation(
    request: SahayakResumeConversation, audio_file: UploadFile = File(None)
):
    try:
        logging.info(f"Calling /v1/sahayak/resume_conversation endpoint")
        logging.debug(f"{request=}")
        request_dict = request.__dict__()
        audio_data = await audio_file.read()
        audio_file_name = audio_file.filename
        request_dict.update(
            {"audio_data": audio_data, "audio_file_name": audio_file_name}
        )
        return SahayakOutput(SahayakController().speech_to_speech(request=request_dict))
    except Exception as error:
        logging.error(f"Error in /v1/sahayak/resume_conversation endpoint: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(error),
            headers={"WWW-Authenticate": "Bearer"},
        )


@sahayak_router.post("/v1/chatbot")
async def init_conversation(
    thread_id: str = None,
    audio_file: UploadFile = File(None),
    translate: bool = True,
    state: str = None,
):
    try:
        logging.info(f"Calling /v1/conversation/init endpoint")
        logging.debug(f"{thread_id=}")
        audio_file_data = await audio_file.read()
        audio_file_name = audio_file.filename
        return ConversationController().conversation_init(
            audio_file_data=audio_file_data,
            audio_file_name=audio_file_name,
            translate=translate,
        )

    except Exception as error:
        logging.error(f"Error in /v1/conversation/init endpoint: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(error),
            headers={"WWW-Authenticate": "Bearer"},
        )
