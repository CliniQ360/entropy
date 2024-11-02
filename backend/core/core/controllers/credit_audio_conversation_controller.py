from core.agents.workflows.text_conversation_workflow import build_workflow
from psycopg_pool import ConnectionPool
from langgraph.checkpoint.postgres import PostgresSaver
from core.utils.elevenlabs.tts import ElevenLabsHelper
from core.utils.sarvam_helper import SarvamAPI
from core import logger
import os, base64

logging = logger(__name__)


class CreditAudioConversationController:
    def __init__(self):

        self.DB_URI = os.getenv("DB_URI")
        self.stt_service = os.getenv("STT_SERVICE")

    def start_conversation(self, thread_id: str, language: str):
        try:
            logging.info(f"CreditAudioConversationController: start_conversation")
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
                        "human_selection",
                        "human_loan_amount_selection",
                        "human_recheck_approval",
                        "human_account_details_feedback",
                        "resume_after_kyc_redirect",
                        "resume_after_emdt_redirect",
                        "human_loan_tnc_feedback",
                        "resume_loan_agreement_signing",
                        "human_bureau_offer_feedback",
                    ],
                    interrupt_after=[
                        "send_ack",
                        "submit_form_ack",
                        "human_refreh_offer",
                        "aa_redirect",
                    ],
                    checkpointer=checkpointer,
                )

                thread = {"configurable": {"thread_id": thread_id}}
                for event in workflow.stream(
                    {
                        "agent_message": ["Hello!"],
                        "language": language,
                        "thread_id": thread_id,
                    },
                    thread,
                ):
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
                language = workflow.get_state(thread).values.get("language")
                return_payload = {
                    "thread_id": thread_id,
                    "user_message": user_message,
                    "agent_message": agent_message,
                    "next_state": next_state,
                    "language": language,
                    "customer_details": {},
                    "customer_account_details": {},
                }
                logging.info(f"{return_payload=}")
                return return_payload
        except Exception as error:
            logging.error(
                f"Error in CreditAudioConversationController.start_conversation: {error}"
            )
            raise error

    def resume_conversation(self, **kwargs):
        try:
            logging.info(f"CreditAudioConversationController: resume_conversation")
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
                        "human_selection",
                        "human_loan_amount_selection",
                        "human_recheck_approval",
                        "human_account_details_feedback",
                        "resume_after_kyc_redirect",
                        "resume_after_emdt_redirect",
                        "human_loan_tnc_feedback",
                        "resume_loan_agreement_signing",
                        "human_bureau_offer_feedback",
                    ],
                    interrupt_after=[
                        "send_ack",
                        "submit_form_ack",
                        "human_refreh_offer",
                        "aa_redirect",
                    ],
                    checkpointer=checkpointer,
                )
                print("Workflow compiled")
                if state == "human_document_upload_feedback":
                    print(f"{state=}")
                    if kwargs.get("document_upload_flag"):
                        print("updating workflow state")
                        base_path = (
                            f"/app/data/CUSTOMER_DATA/{thread_id}/PERSONAL_DOCUMENTS"
                        )
                        file_path_list = []
                        for file in os.listdir(base_path):
                            file_path_list.append(f"{base_path}/{file}")
                        workflow.update_state(
                            thread,
                            {
                                "document_upload_flag": kwargs.get(
                                    "document_upload_flag"
                                ),
                                "document_list": file_path_list,
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
                        {
                            "user_message": kwargs.get("user_message"),
                            "user_message_hindi": kwargs.get("user_message_hindi"),
                        },
                        as_node=state,
                    )
                elif state == "human_bureau_offer_feedback":
                    workflow.update_state(
                        thread,
                        {
                            "user_message": kwargs.get("user_message"),
                            "user_message_hindi": kwargs.get("user_message_hindi"),
                            "offer_item_id": kwargs.get("offer_item_id"),
                        },
                        as_node=state,
                    )
                elif state == "aa_redirect":
                    workflow.update_state(
                        thread,
                        {"dummy": "aa_redirect"},
                        as_node=state,
                    )
                elif state == "resume_after_aa_redirect":
                    workflow.update_state(
                        thread,
                        {"dummy": "resume_after_aa_redirect"},
                        as_node=state,
                    )
                elif state == "refresh_offer":
                    workflow.update_state(
                        thread,
                        {"dummy": "refresh_offer"},
                        as_node=state,
                    )
                elif state == "human_selection":
                    workflow.update_state(
                        thread,
                        {
                            "user_message": kwargs.get("user_message"),
                            "user_message_hindi": kwargs.get("user_message_hindi"),
                            "offer_item_id": kwargs.get("offer_item_id"),
                        },
                        as_node=state,
                    )
                elif state == "human_loan_amount_selection":
                    workflow.update_state(
                        thread,
                        {
                            "selected_loan_amount": kwargs.get("selected_loan_amount"),
                        },
                        as_node=state,
                    )
                elif state == "resume_after_kyc_redirect":
                    workflow.update_state(
                        thread,
                        {"dummy": "resume_after_kyc_redirect"},
                        as_node=state,
                    )
                elif state == "human_account_details_feedback":
                    workflow.update_state(
                        thread,
                        {"user_message": kwargs.get("user_message")},
                        as_node=state,
                    )
                elif state == "human_account_details_verification_feedback":
                    workflow.update_state(
                        thread,
                        {
                            "user_message": kwargs.get("user_message"),
                            "user_message_hindi": kwargs.get("user_message_hindi"),
                        },
                        as_node=state,
                    )
                elif state == "resume_after_emdt_redirect":
                    workflow.update_state(
                        thread,
                        {
                            "user_message": kwargs.get("user_message"),
                            "user_message_hindi": kwargs.get("user_message_hindi"),
                        },
                        as_node=state,
                    )
                elif state == "human_loan_tnc_feedback":
                    workflow.update_state(
                        thread,
                        {
                            "user_message": kwargs.get("user_message"),
                            "user_message_hindi": kwargs.get("user_message_hindi"),
                        },
                        as_node=state,
                    )
                elif state == "resume_loan_agreement_signing":
                    workflow.update_state(
                        thread,
                        {"dummy": "resume_loan_agreement_signing"},
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
                if workflow.get_state(thread).values.get("user_message_hindi"):
                    user_message_hindi = workflow.get_state(thread).values.get(
                        "user_message_hindi"
                    )[-1]
                else:
                    user_message_hindi = "None"
                next_state = workflow.get_state(thread).next[0]
                collected_details_list = workflow.get_state(thread).values.get(
                    "customer_details"
                )
                customer_details = {}
                if collected_details_list:
                    for item in collected_details_list:
                        if isinstance(item, dict):
                            collected_details = item
                        else:
                            collected_details = item.dict()
                        for key, value in collected_details.items():
                            if (
                                value != None
                                and value != " "
                                and value != "None"
                                and value != "NA"
                                and value != 0
                            ):
                                customer_details[key] = value
                    print(f"Inside resume_conversation {customer_details=}")
                customer_account_details_list = workflow.get_state(thread).values.get(
                    "customer_account_details"
                )
                customer_account_details = {}
                if customer_account_details_list:
                    for item in customer_account_details_list:
                        if isinstance(item, dict):
                            collected_details = item
                        else:
                            collected_details = item.dict()
                        for key, value in collected_details.items():
                            if (
                                value != None
                                and value != " "
                                and value != "None"
                                and value != "NA"
                                and value != 0
                            ):
                                customer_account_details[key] = value
                    print(f"{customer_account_details=}")
                txn_id = workflow.get_state(thread).values.get("txn_id")
                aa_redirect_url = workflow.get_state(thread).values.get("aa_url")
                kyc_redirect_url = workflow.get_state(thread).values.get("kyc_url")
                emndt_redirect_url = workflow.get_state(thread).values.get("emndt_url")
                loan_signing_redirect_url = workflow.get_state(thread).values.get(
                    "loan_signing_redirect_url"
                )
                loan_agreement_url = workflow.get_state(thread).values.get(
                    "loan_agreement_url"
                )
                offer_list = workflow.get_state(thread).values.get("offer_list")
                offer_summary = workflow.get_state(thread).values.get("offer_summary")
                final_offer = workflow.get_state(thread).values.get("final_offer")
                modified = workflow.get_state(thread).values.get("modified")
                language = workflow.get_state(thread).values.get("language")
                agent_message_modified = workflow.get_state(thread).values.get(
                    "agent_message_modified"
                )
                if modified:
                    agent_message = agent_message_modified
                if self.stt_service == "11LABS":
                    logging.info(f"executing text to speech with 11LABS")

                    agent_audio_data = ElevenLabsHelper().text_to_speech_generator(
                        text=agent_message
                    )
                    if agent_audio_data:
                        # Encode audio bytes as base64
                        audio_base64 = base64.b64encode(agent_audio_data).decode(
                            "utf-8"
                        )
                    else:
                        audio_base64 = ""
                else:
                    logging.info(f"executing text to speech with Sarvam")

                    agent_audio_data = SarvamAPI().sarvam_tts(text=agent_message)
                    if agent_audio_data:
                        # Encode audio bytes as base64
                        audio_base64 = agent_audio_data
                    else:
                        audio_base64 = ""

                return {
                    "thread_id": thread_id,
                    "user_message": user_message,
                    "user_message_hindi": user_message_hindi,
                    "agent_message": agent_message,
                    "next_state": next_state,
                    "customer_details": customer_details,
                    "customer_account_details": customer_account_details,
                    "txn_id": txn_id if txn_id else "None",
                    "aa_redirect_url": aa_redirect_url if aa_redirect_url else "None",
                    "kyc_redirect_url": (
                        kyc_redirect_url if kyc_redirect_url else "None"
                    ),
                    "emndt_redirect_url": (
                        emndt_redirect_url if emndt_redirect_url else "None"
                    ),
                    "loan_signing_redirect_url": (
                        loan_signing_redirect_url
                        if loan_signing_redirect_url
                        else "None"
                    ),
                    "offer_list": offer_list if offer_list else [],
                    "offer_summary": offer_summary if offer_summary else "None",
                    "loan_agreement_url": (
                        loan_agreement_url if loan_agreement_url else "None"
                    ),
                    "final_offer": final_offer if final_offer else [],
                    "modified": modified if modified else False,
                    "agent_message_modified": (
                        agent_message_modified if agent_message_modified else "None"
                    ),
                    "agent_audio_data": audio_base64,
                    "language": language,
                }
        except Exception as error:
            logging.error(
                f"Error in CreditAudioConversationController.resume_conversation: {error}"
            )
            raise error

    def get_state(self, thread_id: str):
        try:
            thread = {"configurable": {"thread_id": thread_id}}
            return self.workflow.get_state(thread).next
        except Exception as error:
            logging.error(
                f"Error in CreditAudioConversationController.get_state: {error}"
            )
            raise error

    async def upload_documents(self, files):
        try:
            logging.info(f"CreditAudioConversationController: upload_documents")
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
            logging.error(
                f"Error in CreditAudioConversationController.upload_documents: {error}"
            )
