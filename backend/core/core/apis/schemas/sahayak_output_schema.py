from pydantic import BaseModel, Field


class SahayakOutput(BaseModel):
    thread_id: str
    user_message: str = None
    agent_message: str
    next_state: str
    aa_redirect_url: str = None
    kyc_redirect_url: str = None
    emndt_redirect_url: str = None
    loan_signing_redirect_url: str = None
    txn_id: str = None
    customer_account_details: dict
    customer_details: dict
    offer_list: list = []
    offer_summary: str = None
    agent_audio_data: bytes
    loan_agreement_url: str = None
    final_offer: list = []
