from typing_extensions import TypedDict
from typing import Annotated
import operator


class UserDetailsState(TypedDict):
    document_upload_flag: bool
    document_list: list
    customer_extracted_details: dict
    questions: Annotated[list, operator.add]
    customer_details: Annotated[list, operator.add]
    customer_account_details: Annotated[list, operator.add]
    answer: str
    urls: str
    txn_id: str


class OfferState(TypedDict):
    txn_id: str
    status: str
    answer: str
    offer_list: list
    offer_summary: str
    offer_item_id: str
    selected_loan_amount: str
    customer_account_details: Annotated[list, operator.add]
    urls: str
    loan_document_url: str


class LoanDocumentState(TypedDict):
    txn_id: str
    loan_document_url: str
    loan_agreement_summary: str
    loan_agreement_text: str
    user_query: Annotated[list, operator.add]
    engine_answer: Annotated[list, operator.add]
