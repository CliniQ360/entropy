from core.agents.workflow import build_workflow
from psycopg_pool import ConnectionPool
from langgraph.checkpoint.postgres import PostgresSaver
from core import logger
import os

logging = logger(__name__)


class ConversationController:
    def __init__(self):

        self.DB_URI = os.getenv("DB_URI")

    def start_conversation(self, thread_id: str):
        try:
            logging.info(f"ConversationController: start_conversation")
            logging.info(f"Stating workflow with thread_id: {thread_id}")
            with ConnectionPool(
                conninfo=self.DB_URI,
                max_size=20,
                kwargs={"autocommit": True, "prepare_threshold": 0},
            ) as conn:
                builder = build_workflow()
                PostgresSaver(conn).setup()
                checkpointer = PostgresSaver(conn=conn)
                workflow = builder.compile(
                    interrupt_before=[
                        "human_document_upload_feedback",
                        "human_feedback",
                        "human_verification_feedback",
                        "human_update_feedback",
                        "human_selection",
                        "human_loan_amount_selection",
                        "human_recheck_approval",
                        "human_account_details_feedback",
                        "resume_after_kyc_redirect",
                        "human_account_details_verification_feedback",
                        "resume_after_emdt_redirect",
                        "human_loan_tnc_feedback",
                        "resume_loan_agreement_signing",
                    ],
                    interrupt_after=["submit_form", "send_ack", "human_refreh_offer"],
                    checkpointer=checkpointer,
                )

                thread = {"configurable": {"thread_id": thread_id}}
                for event in workflow.stream({"agent_message": ["Hello!"]}, thread):
                    agent_message = event.get("agent_message", "")
                    logging.info(f"{agent_message=}")
                    user_message = event.get("user_message", "")
                    logging.info(f"{user_message=}")
                if workflow.get_state(thread).values.get("agent_message"):
                    agent_message = workflow.get_state(thread).values.get(
                        "agent_message"
                    )[-1]
                else:
                    agent_message = "None"
                logging.info(f"{agent_message=}")
                if workflow.get_state(thread).values.get("user_message"):
                    user_message = workflow.get_state(thread).values.get(
                        "user_message"
                    )[-1]
                else:
                    user_message = "None"
                next_state = workflow.get_state(thread).next[0]
                return_payload = {
                    "thread_id": thread_id,
                    "user_message": user_message,
                    "agent_message": agent_message,
                    "next_state": next_state,
                }
                logging.info(f"{return_payload=}")
                return return_payload
        except Exception as error:
            logging.error(
                f"Error in ConversationController.start_conversation: {error}"
            )
            raise error

    def resume_conversation(self, **kwargs):
        try:
            logging.info(f"ConversationController: resume_conversation")
            thread_id = kwargs.get("thread_id")
            thread = {"configurable": {"thread_id": thread_id}}
            state = kwargs.get("state")
            logging.info(
                f"Resuming workflow with thread_id: {thread_id} and state: {state}"
            )
            with ConnectionPool(
                conninfo=self.DB_URI,
                max_size=20,
                kwargs={"autocommit": True, "prepare_threshold": 0},
            ) as conn:
                builder = build_workflow()
                PostgresSaver(conn).setup()
                checkpointer = PostgresSaver(conn=conn)
                workflow = builder.compile(
                    interrupt_before=[
                        "human_document_upload_feedback",
                        "human_feedback",
                        "human_verification_feedback",
                        "human_update_feedback",
                        "human_selection",
                        "human_loan_amount_selection",
                        "human_recheck_approval",
                        "human_account_details_feedback",
                        "resume_after_kyc_redirect",
                        "human_account_details_verification_feedback",
                        "resume_after_emdt_redirect",
                        "human_loan_tnc_feedback",
                        "resume_loan_agreement_signing",
                    ],
                    interrupt_after=["submit_form", "send_ack", "human_refreh_offer"],
                    checkpointer=checkpointer,
                )
                print("Workflow compiled")
                if state == "human_document_upload_feedback":
                    print(f"{state=}")
                    if kwargs.get("document_upload_flag"):
                        print("updating workflow state")
                        workflow.update_state(
                            thread,
                            {
                                "document_upload_flag": kwargs.get(
                                    "document_upload_flag"
                                ),
                                "document_list": kwargs.get("file_path_list"),
                            },
                            as_node=state,
                        )
                        print("workflow state updated")
                    else:
                        print("updating workflow state")
                        workflow.update_state(
                            thread,
                            {
                                "document_upload_flag": kwargs.get(
                                    "document_upload_flag"
                                )
                            },
                            as_node=state,
                        )
                        print("workflow state updated")
                elif (
                    state == "human_feedback" or state == "human_verification_feedback"
                ):
                    workflow.update_state(
                        thread,
                        {"user_message": kwargs.get("user_message")},
                        as_node=state,
                    )
                elif state == "resume_after_aa_redirect":
                    workflow.update_state(
                        thread,
                        {"dummy": "resume_after_aa_redirect"},
                        as_node=state,
                    )
                print("Streaming workflow")
                for event in workflow.stream(None, thread):
                    agent_message = event.get("agent_message", "")
                    logging.info(f"{agent_message=}")
                    user_message = event.get("user_message", "")
                    logging.info(f"{user_message=}")
                if workflow.get_state(thread).values.get("agent_message"):
                    agent_message = workflow.get_state(thread).values.get(
                        "agent_message"
                    )[-1]
                else:
                    agent_message = "None"
                logging.info(f"{agent_message=}")
                if workflow.get_state(thread).values.get("user_message"):
                    user_message = workflow.get_state(thread).values.get(
                        "user_message"
                    )[-1]
                else:
                    user_message = "None"
                next_state = workflow.get_state(thread).next[0]
                return {
                    "thread_id": thread_id,
                    "user_message": user_message,
                    "agent_message": agent_message,
                    "next_state": next_state,
                }
        except Exception as error:
            logging.error(
                f"Error in ConversationController.resume_conversation: {error}"
            )
            raise error

    def get_state(self, thread_id: str):
        try:
            thread = {"configurable": {"thread_id": thread_id}}
            return self.workflow.get_state(thread).next
        except Exception as error:
            logging.error(f"Error in ConversationController.get_state: {error}")
            raise error

    async def upload_documents(self, files):
        try:
            logging.info(f"ConversationController: upload_documents")
            file_path_list = []
            for document in files:
                document_name = document.filename
                logging.info(f"{document_name=}")
                document_data = await document.read()
                document_key = f"/app/CUSTOMER_DATA/{document_name}"
                with open(document_key, "wb") as f:
                    f.write(document_data)
                file_path_list.append(document_key)
            return {"file_path_list": file_path_list}
        except Exception as error:
            logging.error(f"Error in ConversationController.upload_documents: {error}")
import os, uuid, time
from groq import Groq
from core import logger
import base64
from fastapi import Response
from datetime import datetime
from core.utils.groq.stt import GroqHelper
from core.utils.elevenlabs.tts import ElevenLabsHelper


logging = logger(__name__)


class ConversationController:
    def text_generator(self, transcribed_text: str):
        if transcribed_text:
            logging.debug(f"{transcribed_text=}")
            return {"text": "Hi there! I am your personal loan assistant"}
            # return {
            #     "text": """Hi there! I am your personal loan assistant, here to guide you through the process of availing a loan on the ONDC network.
            #     Whether you were comparing loan options, checking eligibility, or submitting your application,
            #     I will help you every step of the way.
            #     Let us make securing your personal loan simple, fast, and hassle-free!"""
            # }

    def conversation_init(
        self,
        audio_file_data: bytes,
        audio_file_name: str,
        translate: bool,
    ):
        try:
            master_start = time.time()
            logging.info("executing ConversationController.conversation_init function")
            audio_file_folder_path = f"/app/audio_data"
            os.makedirs(audio_file_folder_path, exist_ok=True)
            _, audio_file_ext = os.path.splitext(audio_file_name)
            input_file_name = f"C360-AUDIO-{str(uuid.uuid1().int)[:6]}-input"
            output_file_name = f"C360-AUDIO-{str(uuid.uuid1().int)[:6]}-output"
            audio_file_path = (
                f"{audio_file_folder_path}/{input_file_name}{audio_file_ext}"
            )
            logging.info("Saving audio file to local")
            with open(audio_file_path, "wb") as f:
                f.write(audio_file_data)
            if translate:
                logging.info("Translating file using Groq whisper")
                transcription_result = GroqHelper().translate(file_path=audio_file_path)

            else:
                logging.info("Trancribing file using Groq whisper")
                transcription_result = GroqHelper().transcribe(
                    file_path=audio_file_path
                )
            end = time.time()
            logging.info(f"Transcription Time: {end-master_start}")
            transcribed_text = transcription_result.get("transcription")
            logging.info(f"Transcription Text: {transcribed_text=}")
            response_text = self.text_generator(transcribed_text=transcribed_text)
            output_audio_file_path = (
                f"{audio_file_folder_path}/{output_file_name}{audio_file_ext}"
            )
            logging.info(f"executing text to speech function")
            audio_data = ElevenLabsHelper.text_to_speech_generator(
                text=response_text.get("text"), output_path=output_audio_file_path
            )

            # Encode audio bytes as base64
            audio_base64 = base64.b64encode(audio_data).decode("utf-8")
            # audio_data_encoded = Response(content=audio_data, media_type="audio/mpeg")

            return {
                "audio_file": audio_base64,
                "text": response_text.get("text"),
                "file_name": output_audio_file_path,
            }
        except Exception as error:
            logging.error(
                f"Error in ConversationController.conversation_init function: {error}"
            )
            raise error
