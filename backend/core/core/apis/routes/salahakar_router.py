from fastapi import APIRouter, HTTPException, status, UploadFile, File
from fastapi.responses import Response
from typing import List, Optional
import asyncio
import openai
import os
import uuid
from core.apis.schemas.conversation_input_schema import SahayakResumeConversation
from core.apis.schemas.sahayak_output_schema import SahayakOutput
from core.controllers.salahakar_controller import SalahakarController
from core.controllers.insurance_audio_conversation_controller import (
    InsuranceAudioConversationController,
)
from core import logger

salahakar_router = APIRouter()
logging = logger(__name__)


@salahakar_router.post("/v1/salahakar/start_conversation")
def start_conversation(language: str):
    try:
        return SalahakarController().start_audio_conversation(language=language)
    except Exception as error:
        logging.error(f"Error in /v1/salahakar/start_conversation endpoint: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(error),
            headers={"WWW-Authenticate": "Bearer"},
        )


@salahakar_router.post("/v1/salahakar/resume_conversation")
async def resume_conversation(
    thread_id: str,
    state: str,
    language: str = "en",
    translate: bool = False,
    document_upload_flag: bool = False,
    file: UploadFile | None = None,
    offer_item_id: str = None,
    selected_loan_amount: str = None,
):
    try:
        logging.info(f"Calling /v1/salahakar/resume_conversation endpoint")
        print(f"{file=}")
        if not file:
            audio_data = None
            audio_file_name = None
        else:
            audio_data = await file.read()
            audio_file_name = file.filename
        payload = {
            "thread_id": thread_id,
            "state": state,
            "translate": translate,
            "language": language,
            "document_upload_flag": document_upload_flag,
            "audio_data": audio_data,
            "audio_file_name": audio_file_name,
            "offer_item_id": offer_item_id,
            "selected_loan_amount": selected_loan_amount,
        }
        return SalahakarController().resume_audio_conversation(request=payload)
    except Exception as error:
        logging.error(f"Error in /v1/salahakar/resume_conversation endpoint: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(error),
            headers={"WWW-Authenticate": "Bearer"},
        )


@salahakar_router.post("/v1/salahakar/upload_documents")
async def upload_documents(thread_id: str, files: List[UploadFile]):
    try:
        logging.info(f"Calling /v1/salahakar/upload_documents endpoint")
        return await SalahakarController().upload_documents(
            thread_id=thread_id, files=files
        )
    except Exception as error:
        logging.error(f"Error in /v1/salahakar/upload_documents endpoint: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(error),
            headers={"WWW-Authenticate": "Bearer"},
        )


@salahakar_router.get("/v1/salahakar/state")
def get_state(thread_id: str):
    try:
        logging.info(f"Calling /v1/salahakar/state endpoint")
        return InsuranceAudioConversationController().get_state(thread_id=thread_id)
    except Exception as error:
        logging.error(f"Error in /v1/salahakar/state endpoint: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(error),
            headers={"WWW-Authenticate": "Bearer"},
        )


@salahakar_router.get("/v1/salahakar/workflow")
def get_workflow(thread_id: str):
    try:
        logging.info(f"Calling /v1/salahakar/workflow endpoint")
        image_bytes: bytes = InsuranceAudioConversationController().get_workflow(
            thread_id=thread_id
        )
        return Response(content=image_bytes, media_type="image/png")
    except Exception as error:
        logging.error(f"Error in /v1/salahakar/workflow endpoint: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(error),
            headers={"WWW-Authenticate": "Bearer"},
        )
