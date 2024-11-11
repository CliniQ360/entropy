from core.agents.workflows.insurance_workflow import build_workflow
from psycopg_pool import ConnectionPool
from langgraph.checkpoint.postgres import PostgresSaver
from core.utils.elevenlabs.tts import ElevenLabsHelper
from core.utils.sarvam_helper import SarvamAPI
from core import logger
import os, base64

logging = logger(__name__)


class InsuranceAudioConversationController:
    def __init__(self):

        self.DB_URI = os.getenv("DB_URI")
        self.stt_service = os.getenv("STT_SERVICE")

    def start_conversation(self, thread_id: str, language: str):
        try:
            logging.info(f"InsuranceAudioConversationController: start_conversation")
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
                        "human_intent_feedback",
                        "human_document_upload_feedback",
                        "human_feedback",
                        "human_verification_feedback",
                        "human_selection",
                        "human_plan_selection_confirmation",
                        "resume_after_kyc",
                        "human_buyer_feedback",
                        "human_buyer_verification_feedback",
                        "human_nominee_feedback",
                        "human_nominee_verification_feedback",
                        "human_payment_redirect",
                        "end_conversation",
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
                f"Error in InsuranceAudioConversationController.start_conversation: {error}"
            )
            raise error

    def resume_conversation(self, **kwargs):
        try:
            logging.info(f"InsuranceAudioConversationController: resume_conversation")
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
                        "human_intent_feedback",
                        "human_document_upload_feedback",
                        "human_feedback",
                        "human_verification_feedback",
                        "human_selection",
                        "human_plan_selection_confirmation",
                        "resume_after_kyc",
                        "human_buyer_feedback",
                        "human_buyer_verification_feedback",
                        "human_nominee_feedback",
                        "human_nominee_verification_feedback",
                        "human_payment_redirect",
                        "end_conversation",
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
                    state == "human_selection"
                    or state == "human_add_on_selection"
                    or state == "human_add_on_confirmation"
                ):
                    workflow.update_state(
                        thread,
                        {
                            "user_message": kwargs.get("user_message"),
                            "user_message_hindi": kwargs.get("user_message_hindi"),
                            "selected_offer_item_id": kwargs.get("offer_item_id"),
                        },
                        as_node=state,
                    )
                elif state == "human_plan_selection_confirmation":
                    add_ons = kwargs.get("selected_add_ons")
                    selected_add_ons_list = add_ons.split(",")
                    selected_add_ons = []
                    for add_on in selected_add_ons_list:
                        selected_add_ons.append(
                            {"add_on_id": add_on, "add_on_count": 1}
                        )
                    workflow.update_state(
                        thread,
                        {
                            "user_message": kwargs.get("user_message"),
                            "user_message_hindi": kwargs.get("user_message_hindi"),
                            "selected_offer_item_id": kwargs.get("offer_item_id"),
                            "selected_add_ons": selected_add_ons,
                        },
                        as_node=state,
                    )
                else:
                    workflow.update_state(
                        thread,
                        {
                            "user_message": kwargs.get("user_message"),
                            "user_message_hindi": kwargs.get("user_message_hindi"),
                        },
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
                    if (
                        customer_details.get("diabetes") == "Yes"
                        or customer_details.get("bloodPressure") == "Yes"
                        or customer_details.get("heartAilments") == "Yes"
                        or customer_details.get("other") == "Yes"
                    ):
                        customer_details["any_pre_existing_disease"] = "Yes"
                    else:
                        customer_details["any_pre_existing_disease"] = "No"
                nominee_details_list = workflow.get_state(thread).values.get(
                    "nominee_details"
                )
                nominee_details = {}
                if nominee_details_list:
                    for item in nominee_details_list:
                        if isinstance(item, dict):
                            nominee_details = item
                        else:
                            nominee_details = item.dict()
                        for key, value in nominee_details.items():
                            if (
                                value != None
                                and value != " "
                                and value != "None"
                                and value != "NA"
                                and value != 0
                            ):
                                nominee_details[key] = value
                txn_id = workflow.get_state(thread).values.get("txn_id")
                offer_list = workflow.get_state(thread).values.get("offer_list")
                offer_summary = workflow.get_state(thread).values.get("offer_summary")
                final_offer = workflow.get_state(thread).values.get("final_offer")
                modified = workflow.get_state(thread).values.get("modified")
                language = workflow.get_state(thread).values.get("language")
                agent_message_modified = workflow.get_state(thread).values.get(
                    "agent_message_modified"
                )
                selected_add_ons = workflow.get_state(thread).values.get(
                    "selected_add_ons"
                )
                kyc_url = workflow.get_state(thread).values.get("kyc_url")
                payment_url = workflow.get_state(thread).values.get("payment_url")
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
                    "nominee_details": nominee_details,
                    "txn_id": txn_id if txn_id else "None",
                    "offer_list": offer_list if offer_list else [],
                    "offer_summary": offer_summary if offer_summary else "None",
                    "kyc_url": (kyc_url if kyc_url else "None"),
                    "payment_url": payment_url if payment_url else "None",
                    "final_offer": final_offer if final_offer else [],
                    "modified": modified if modified else False,
                    "agent_message_modified": (
                        agent_message_modified if agent_message_modified else "None"
                    ),
                    "agent_audio_data": audio_base64,
                    "language": language,
                    "selected_add_ons": selected_add_ons if selected_add_ons else [],
                }
        except Exception as error:
            logging.error(
                f"Error in InsuranceAudioConversationController.resume_conversation: {error}"
            )
            raise error

    def get_state(self, thread_id: str):
        try:
            thread = {"configurable": {"thread_id": thread_id}}
            return self.workflow.get_state(thread).next
        except Exception as error:
            logging.error(
                f"Error in InsuranceAudioConversationController.get_state: {error}"
            )
            raise error

    async def upload_documents(self, files):
        try:
            logging.info(f"InsuranceAudioConversationController: upload_documents")
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
                f"Error in InsuranceAudioConversationController.upload_documents: {error}"
            )

    def get_state(self, thread_id: str):
        try:
            thread = {"configurable": {"thread_id": thread_id}}
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
                        "human_intent_feedback",
                        "human_document_upload_feedback",
                        "human_feedback",
                        "human_verification_feedback",
                        "human_selection",
                        "human_plan_selection_confirmation",
                        "resume_after_kyc",
                        "human_buyer_feedback",
                        "human_buyer_verification_feedback",
                        "human_nominee_feedback",
                        "human_nominee_verification_feedback",
                        "human_payment_redirect",
                        "end_conversation",
                    ],
                    checkpointer=checkpointer,
                )
                print("Workflow compiled")
                next_state = workflow.get_state(thread).next[0]
                return {
                    "state": workflow.get_state(thread).values,
                    "next_state": next_state,
                }
        except Exception as error:
            logging.error(
                f"Error in InsuranceAudioConversationController.get_state: {error}"
            )
            raise error

    def get_workflow(self, thread_id: str):
        try:
            thread = {"configurable": {"thread_id": thread_id}}
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
                        "human_intent_feedback",
                        "human_document_upload_feedback",
                        "human_feedback",
                        "human_verification_feedback",
                        "human_selection",
                        "human_plan_selection_confirmation",
                        "resume_after_kyc",
                        "human_buyer_feedback",
                        "human_buyer_verification_feedback",
                        "human_nominee_feedback",
                        "human_nominee_verification_feedback",
                        "human_payment_redirect",
                        "end_conversation",
                    ],
                    checkpointer=checkpointer,
                )
                print("Workflow compiled")
                img_bytes = workflow.get_graph(xray=1).draw_mermaid_png()
                return img_bytes
        except Exception as error:
            logging.error(f"Error in TextConversationController.get_state: {error}")
            raise error
