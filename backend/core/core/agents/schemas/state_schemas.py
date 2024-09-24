from typing_extensions import TypedDict
from typing import Annotated
import operator


class UserDetailsState(TypedDict):
    document_upload_flag: bool
    document_list: list
    customer_extracted_details: dict
    agent_message: Annotated[list, operator.add]
    customer_details: Annotated[list, operator.add]
    customer_account_details: Annotated[list, operator.add]
    user_message: Annotated[list, operator.add]
    aa_url: str
    kyc_url: str
    emndt_url: str
    loan_signing_redirect_url: str
    txn_id: str
    dummy: str


class OfferState(TypedDict):
    txn_id: str
    status: str
    user_message: Annotated[list, operator.add]
    offer_list: list
    offer_summary: str
    offer_item_id: str
    selected_loan_amount: str
    customer_account_details: Annotated[list, operator.add]
    aa_url: str
    kyc_url: str
    emndt_url: str
    loan_signing_redirect_url: str
    loan_document_url: str
    dummy: str


class LoanDocumentState(TypedDict):
    txn_id: str
    loan_signing_redirect_url: str
    loan_agreement_summary: str
    loan_agreement_text: str
    user_query: Annotated[list, operator.add]
    engine_answer: Annotated[list, operator.add]
    dummy: str
