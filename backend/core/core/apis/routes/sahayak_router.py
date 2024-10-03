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


@sahayak_router.post("/v1/sahayak/start_conversation", response_model=SahayakOutput)
def start_conversation(language: str):
    try:
        return SahayakController().start_audio_conversation(language=language)
    except Exception as error:
        logging.error(f"Error in /v1/sahayak/start_conversation endpoint: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(error),
            headers={"WWW-Authenticate": "Bearer"},
        )


@sahayak_router.post("/v1/sahayak/resume_conversation", response_model=SahayakOutput)
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
        logging.info(f"Calling /v1/sahayak/resume_conversation endpoint")
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
        return SahayakController().resume_audio_conversation(request=payload)
    except Exception as error:
        logging.error(f"Error in /v1/sahayak/resume_conversation endpoint: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(error),
            headers={"WWW-Authenticate": "Bearer"},
        )


@sahayak_router.post("/v1/sahayak/upload_documents")
async def upload_documents(thread_id: str, files: List[UploadFile]):
    try:
        logging.info(f"Calling /v1/sahayak/upload_documents endpoint")
        return await SahayakController().upload_documents(
            thread_id=thread_id, files=files
        )
    except Exception as error:
        logging.error(f"Error in /v1/sahayak/upload_documents endpoint: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(error),
            headers={"WWW-Authenticate": "Bearer"},
        )


@sahayak_router.post("/v1/audio/generate_bytes")
def generate_audio_bytes(text: str):
    try:
        return SahayakController().generate_audio_bytes(text=text)
    except Exception as error:
        logging.error(f"Error in /v1/audio/generate_bytes endpoint: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(error),
            headers={"WWW-Authenticate": "Bearer"},
        )


# @sahayak_router.post("/v1/chatbot")
# async def init_conversation(
#     thread_id: str = None,
#     audio_file: UploadFile = File(None),
#     translate: bool = True,
#     state: str = None,
# ):
#     try:
#         logging.info(f"Calling /v1/conversation/init endpoint")
#         logging.debug(f"{thread_id=}")
#         audio_file_data = await audio_file.read()
#         audio_file_name = audio_file.filename
#         return ConversationController().conversation_init(
#             audio_file_data=audio_file_data,
#             audio_file_name=audio_file_name,
#             translate=translate,
#         )

#     except Exception as error:
#         logging.error(f"Error in /v1/conversation/init endpoint: {error}")
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail=str(error),
#             headers={"WWW-Authenticate": "Bearer"},
#         )
