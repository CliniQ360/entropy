from core.agents.workflows.text_conversation_workflow import build_workflow
from psycopg_pool import ConnectionPool
from langgraph.checkpoint.postgres import PostgresSaver
from core import logger
import os

logging = logger(__name__)


class AudioConversationController:
    def __init__(self):

        self.DB_URI = os.getenv("DB_URI")

    def start_conversation(self, thread_id: str):
        try:
            logging.info(f"AudioConversationController: start_conversation")
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
                    "customer_details": {},
                    "customer_account_details": {},
                }
                logging.info(f"{return_payload=}")
                return return_payload
        except Exception as error:
            logging.error(
                f"Error in AudioConversationController.start_conversation: {error}"
            )
            raise error

    def resume_conversation(self, **kwargs):
        try:
            logging.info(f"AudioConversationController: resume_conversation")
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
                        {"user_message": kwargs.get("user_message")},
                        as_node=state,
                    )
                elif state == "resume_after_emdt_redirect":
                    workflow.update_state(
                        thread,
                        {"user_message": kwargs.get("user_message")},
                        as_node=state,
                    )
                elif state == "human_loan_tnc_feedback":
                    workflow.update_state(
                        thread,
                        {"user_message": kwargs.get("user_message")},
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
                            if value != None and value != " " and value != "None":
                                customer_details[key] = value
                    print(f"{customer_details=}")
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
                            if value != None and value != " " and value != "None":
                                customer_account_details[key] = value
                    print(f"{customer_account_details=}")
                txn_id = workflow.get_state(thread).values.get("txn_id")
                aa_redirect_url = workflow.get_state(thread).values.get("aa_url")
                kyc_redirect_url = workflow.get_state(thread).values.get("kyc_url")
                emndt_redirect_url = workflow.get_state(thread).values.get("emndt_url")
                loan_signing_redirect_url = workflow.get_state(thread).values.get(
                    "loan_signing_redirect_url"
                )
                offer_list = workflow.get_state(thread).values.get("offer_list")
                offer_summary = workflow.get_state(thread).values.get("offer_summary")
                return {
                    "thread_id": thread_id,
                    "user_message": user_message,
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
                }
        except Exception as error:
            logging.error(
                f"Error in AudioConversationController.resume_conversation: {error}"
            )
            raise error

    def get_state(self, thread_id: str):
        try:
            thread = {"configurable": {"thread_id": thread_id}}
            return self.workflow.get_state(thread).next
        except Exception as error:
            logging.error(f"Error in AudioConversationController.get_state: {error}")
            raise error

    async def upload_documents(self, files):
        try:
            logging.info(f"AudioConversationController: upload_documents")
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
                f"Error in AudioConversationController.upload_documents: {error}"
            )