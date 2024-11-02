from typing_extensions import TypedDict
from typing import Annotated
import operator


class SahayakState(TypedDict):
    thread_id: str
    language: str
    document_upload_flag: bool
    document_list: list
    customer_extracted_details: dict
    agent_message: Annotated[list, operator.add]
    customer_details: Annotated[list, operator.add]
    customer_account_details: Annotated[list, operator.add]
    user_message: Annotated[list, operator.add]
    user_message_hindi: Annotated[list, operator.add]
    aa_url: str
    kyc_url: str
    emndt_url: str
    loan_signing_redirect_url: str
    txn_id: str
    dummy: str
    status: str
    offer_list: list
    offer_summary: str
    offer_item_id: str
    selected_loan_amount: str
    loan_document_url: str
    final_offer: list
    loan_agreement_summary: str
    loan_agreement_text: str
    loan_agreement_url: str
    user_query: Annotated[list, operator.add]
    engine_answer: Annotated[list, operator.add]
    agent_message_modified: str
    modified: bool = False


class SalahakarState(TypedDict):
    thread_id: str
    language: str
    document_upload_flag: bool
    document_list: list
    customer_extracted_details: dict
    agent_message: Annotated[list, operator.add]
    customer_details: Annotated[list, operator.add]
    buyer_details: Annotated[list, operator.add]
    nominee_details: Annotated[list, operator.add]
    user_message: Annotated[list, operator.add]
    user_message_hindi: Annotated[list, operator.add]
    kyc_url: str
    payment_url: str
    txn_id: str
    dummy: str
    status: str
    selected_offer_item_id: str
    offer_list: list
    offer_summary: str
    offer_item_id: str
    final_offer: list
    user_query: Annotated[list, operator.add]
    engine_answer: Annotated[list, operator.add]
    agent_message_modified: str
    modified: bool = False
    insurance_plan_for: str
    offer_document_text: dict
    selected_add_ons: Annotated[list, operator.add]
