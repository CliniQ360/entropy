from core.agents.schemas.state_schemas import UserDetailsState, OfferState
from core.agents.schemas.output_schemas import (
    UserDetailsResponse,
    UserDocumentDetails,
    GeneratedQuestion,
)
from core.utils.external_call import APIInterface
import os, json, time, base64
from core.utils.vertex_ai_helper import llm_flash, llm_pro
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage


def submit_form(state: UserDetailsState):
    credit_base_url = os.environ["CREDIT_BASE_URL"]
    search_url = f"{credit_base_url}/v1/credit/search"
    submit_url = f"{credit_base_url}/v1/credit/submitForm"
    select_url = f"{credit_base_url}/v1/credit/select"
    get_txn_url = f"{credit_base_url}/v1/txn_details"
    get_aa_url = f"{credit_base_url}/v1/credit/getAAUrl"
    # making initial search call
    search_resp, search_resp_code = APIInterface().post_with_params(
        route=search_url, params={"user_id": "3"}
    )
    collected_details_list = state.get("customer_details", None)
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
        print(customer_details)
    txn_id = search_resp.get("txn_id")
    print("Sleeping for 5 seconds")
    time.sleep(5)
    user_contact_number = customer_details.get("contactNumber")
    finvu_user_id = f"{user_contact_number}@finvu"
    customer_details.update({"bureauConsent": True, "aa_id": finvu_user_id})
    submit_payload = {"loanForm": customer_details}
    print(f"{submit_payload=}")
    json_payload = json.dumps(submit_payload)
    submit_resp, submit_resp_code = APIInterface().post_with_params(
        route=submit_url, params={"txn_id": txn_id}, data=json_payload
    )
    select_resp, select_resp_code = APIInterface().post_with_params(
        route=select_url, params={"txn_id": txn_id}
    )
    current_action = None
    while current_action != "ON_SELECT_CST":
        get_txn_resp, get_txn_resp_code = APIInterface().get(
            route=get_txn_url, params={"txn_id": txn_id}
        )
        current_action = get_txn_resp.get("current_action")
        print(f"{current_action=}")
        time.sleep(5)
    get_aa_resp, get_aa_resp_code = APIInterface().get(
        route=get_aa_url, params={"user_id": finvu_user_id, "txn_id": txn_id}
    )
    aa_url = get_aa_resp.get("aa_url")
    print(f"{aa_url=}")
    return {
        "urls": aa_url,
        "txn_id": txn_id,
        "agent_message": [
            f"Your details are successfully submitted. Please click on the link to proceed with the account aggregator flow.{aa_url}"
        ],
    }


def collect_updated_details(state: UserDetailsState):
    return {"agent_message": ["Please let me know what do u want to update."]}


def human_update_feedback(state: UserDetailsState):
    pass


def send_ack(state: OfferState):
    credit_base_url = os.environ["CREDIT_BASE_URL"]
    select_consent_url = f"{credit_base_url}/v1/credit/selectConsent"
    txn_id = state.get("txn_id")
    select_consent_resp, select_consent_resp_code = APIInterface().post_with_params(
        route=select_consent_url, params={"txn_id": state.get("txn_id")}
    )
    # current_action = select_consent_resp.get("current_action")
    return {
        "agent_message": ["Please wait while your transaction is in progress."],
        "status": "FETCHING_OFFERS",
    }


def is_aa_approved(state: OfferState):
    credit_base_url = os.environ["CREDIT_BASE_URL"]
    get_txn_url = f"{credit_base_url}/v1/txn_details"
    txn_id = state.get("txn_id")
    get_txn_resp, get_txn_resp_code = APIInterface().get(
        route=get_txn_url, params={"txn_id": txn_id}
    )
    current_action = get_txn_resp.get("current_action")
    if current_action == "AA_CST_APPD":
        return "send_ack"
    return "approval_pending"


def approval_pending(state: OfferState):
    return {
        "agent_message": [
            "To proceed further, please provide an approval for account aggregator flow."
        ]
    }


def resume_after_aa_redirect(state: OfferState):
    pass


def refresh_offer(state: OfferState):
    credit_base_url = os.environ["CREDIT_BASE_URL"]
    get_txn_url = f"{credit_base_url}/v1/txn_details"
    txn_id = state.get("txn_id")
    get_txn_resp, get_txn_resp_code = APIInterface().get(
        route=get_txn_url, params={"txn_id": txn_id}
    )
    current_action = get_txn_resp.get("current_action")
    return {"status": current_action}


def is_offer_received(state: OfferState):
    credit_base_url = os.environ["CREDIT_BASE_URL"]
    get_txn_url = f"{credit_base_url}/v1/txn_details"
    txn_id = state.get("txn_id")
    get_txn_resp, get_txn_resp_code = APIInterface().get(
        route=get_txn_url, params={"txn_id": txn_id}
    )
    current_action = get_txn_resp.get("current_action")
    if current_action == "ON_SELECT_LOAN_AMT":
        return "get_offers"
    return "human_refreh_offer"


def get_offers(state: OfferState):
    credit_base_url = os.environ["CREDIT_BASE_URL"]
    get_offer_details_url = f"{credit_base_url}/v1/credit/getOfferDetails"
    txn_id = state.get("txn_id")
    get_offer_details_resp, get_offer_details_resp_code = APIInterface().get(
        route=get_offer_details_url, params={"txn_id": txn_id}
    )
    offer_list = get_offer_details_resp.get("offer_list")
    return {"offer_list": offer_list}


def human_selection(state: OfferState):
    pass


def summarise_offers(state: OfferState):
    offer_list = state.get("offer_list")
    # Generate summary
    summary_prompt = f"""Offer details: {offer_list}.
    Act as a financial adviser. From the credit offer list provided above, help customer understand each credit offer in simple paragraph focusing on important information. 
    Keep the tone conversational and maximum 3 lines per offer."""
    offer_summary = llm_flash.invoke(summary_prompt)
    offer_summary = offer_summary.content
    # Write the list of analysis to state
    return {"offer_summary": offer_summary}


def user_intent(state: OfferState):
    structured_llm = llm_flash.with_structured_output(UserIntent)
    summary_prompt = f"""User message: {state.get("user_message")[-1]}.
    Classify the user_message provided above between two categories: ["question", "acknowledgment"]. Respond in one word."""
    llm_response = structured_llm.invoke(summary_prompt)
    user_intent = llm_response.user_intent
    if user_intent.lower().strip() == "question":
        return "answer_user_query"
    return "select_offer"


def answer_user_query(state: OfferState):
    offer_list = state.get("offer_list")
    qna_prompt = f"""Offer details : {offer_list}.
    Try to answer the user_query in brief based on the offer details. If applicable, provide the details from the offer details above. Keep the tone conversational.
    user_query: {state.get("user_message")[-1]}"""
    llm_response = llm_flash.invoke(qna_prompt)
    answer = llm_response.content
    return {"agent_message": [answer]}


def select_offer(state: OfferState):
    offer_item_id = state.get("offer_item_id")
    offer_list = state.get("offer_list")
    for offer in offer_list:
        if offer.get("offer_details").get("offer_item_id") == offer_item_id:
            selected_offer = offer
            break
    min_loan_amt = selected_offer.get("offer_details").get("MIN_LOAN_AMOUNT")
    max_loan_amt = selected_offer.get("offer_details").get("MAX_LOAN_AMOUNT")
    return {
        "agent_message": [
            f"Please select the loan amount you want to avail. You can select any amount between {min_loan_amt} rupees and {max_loan_amt} rupees."
        ]
    }


def human_loan_amount_selection(state: OfferState):
    pass
