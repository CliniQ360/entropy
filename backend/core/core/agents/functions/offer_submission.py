from core.agents.schemas.state_schemas import SahayakState, SahayakState
from core.agents.schemas.output_schemas import (
    UserDetailsResponse,
    UserDocumentDetails,
    GeneratedQuestion,
    UserIntent,
)
from num2words import num2words
import re
from core.utils.external_call import APIInterface
import os, json, time, base64
from core.utils.vertex_ai_helper.gemini_helper import llm_flash
from core.utils.openai_helper import llm_4omini
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from core import logger
from core.agents.functions.prompt_config import OpenAIPrompts, GeminiPrompts

logging = logger(__name__)


def submit_form_ack(state: SahayakState):
    return {
        "agent_message": [
            "Please wait while we submit your details. This may take a few seconds."
        ],
        "modified": False,
    }


def submit_form(state: SahayakState):
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
                if (
                    value != None
                    and value != " "
                    and value != "None"
                    and value != "NA"
                    and value != 0
                ):
                    customer_details[key] = value
        logging.info(customer_details)
    txn_id = search_resp.get("txn_id")
    logging.info("Sleeping for 5 seconds")
    time.sleep(5)
    user_contact_number = customer_details.get("contactNumber")
    user_contact_number = re.sub("[^A-Za-z0-9]+", "", user_contact_number)
    finvu_user_id = f"{user_contact_number}@finvu"
    user_income = customer_details.get("income")
    customer_details.update(
        {
            "bureauConsent": True,
            "aa_id": finvu_user_id,
            "income": str(user_income),
            "contactNumber": user_contact_number,
        }
    )
    submit_payload = {"loanForm": customer_details}
    logging.info(f"{submit_payload=}")
    json_payload = json.dumps(submit_payload)
    submit_resp, submit_resp_code = APIInterface().post_with_params(
        route=submit_url, params={"txn_id": txn_id}, data=json_payload
    )
    if submit_resp_code == 200:
        select_resp, select_resp_code = APIInterface().post_with_params(
            route=select_url, params={"txn_id": txn_id}
        )
        current_action = None
        counter = 0
        while current_action != "ON_SELECT_CST":
            if counter == 10:
                logging.info("Did not receive submit form response.")
                break
            get_txn_resp, get_txn_resp_code = APIInterface().get(
                route=get_txn_url, params={"txn_id": txn_id}
            )
            current_action = get_txn_resp.get("current_action")
            logging.info(f"{current_action=}")
            time.sleep(5)
            counter += 1
        get_aa_resp, get_aa_resp_code = APIInterface().get(
            route=get_aa_url, params={"user_id": finvu_user_id, "txn_id": txn_id}
        )
        aa_url = get_aa_resp.get("aa_url")
        logging.info(f"{aa_url=}")
        return {
            "aa_url": aa_url,
            "txn_id": txn_id,
            "agent_message": [
                f"Your details are successfully submitted. Please click proceed to complete account aggregator flow."
            ],
            "modified": False,
        }
    else:
        return {
            "aa_url": None,
            "txn_id": txn_id,
            "agent_message": [f"Error in submitting the form. Please try again later."],
            "modified": False,
        }


def collect_updated_details(state: SahayakState):
    return {
        "agent_message": ["Please let me know what do u want to update."],
        "modified": False,
    }


def human_update_feedback(state: SahayakState):
    pass


def send_ack(state: SahayakState):
    credit_base_url = os.environ["CREDIT_BASE_URL"]
    select_consent_url = f"{credit_base_url}/v1/credit/selectConsent"
    txn_id = state.get("txn_id")
    select_consent_resp, select_consent_resp_code = APIInterface().post_with_params(
        route=select_consent_url, params={"txn_id": state.get("txn_id")}
    )
    # current_action = select_consent_resp.get("current_action")
    return {
        "agent_message": [
            "Please wait while negotiate with the banks to get the best offer for you."
        ],
        "status": "FETCHING_OFFERS",
        "modified": False,
    }


def is_aa_approved(state: SahayakState):
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


def approval_pending(state: SahayakState):
    return {
        "agent_message": [
            "To proceed further, please provide an approval for account aggregator flow."
        ]
    }


def resume_after_aa_redirect(state: SahayakState):
    pass


def refresh_offer(state: SahayakState):
    credit_base_url = os.environ["CREDIT_BASE_URL"]
    get_txn_url = f"{credit_base_url}/v1/txn_details"
    txn_id = state.get("txn_id")
    get_txn_resp, get_txn_resp_code = APIInterface().get(
        route=get_txn_url, params={"txn_id": txn_id}
    )
    current_action = get_txn_resp.get("current_action")
    return {"status": current_action, "modified": False}


def is_offer_received(state: SahayakState):
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


def get_offers(state: SahayakState):
    credit_base_url = os.environ["CREDIT_BASE_URL"]
    get_offer_details_url = f"{credit_base_url}/v1/credit/getOfferDetails"
    txn_id = state.get("txn_id")
    get_offer_details_resp, get_offer_details_resp_code = APIInterface().get(
        route=get_offer_details_url, params={"txn_id": txn_id}
    )
    offer_list = get_offer_details_resp.get("offer_list")
    return {
        "offer_list": offer_list,
        "modified": False,
    }


def human_selection(state: SahayakState):
    logging.info("Inside human_selection")

    pass


def summarise_offers(state: SahayakState):
    offer_list = state.get("offer_list")
    # Generate summary
    # summary_prompt = f"""Offer details: {offer_list}.
    # Act as a financial adviser. From the credit offer list provided above, help customer understand each credit offer in simple paragraph focusing on important information.
    # Keep the tone conversational and maximum 3 lines per offer."""
    if os.environ.get("LLM_CONFIG") == "GOOGLE":
        offer_summary_instructions = GeminiPrompts().offer_summary_instructions
        offer_summary_prompt = offer_summary_instructions.format(offer_list=offer_list)
        offer_summary = llm_flash.invoke(offer_summary_prompt)
        prompt = f"Consider all the numeric values in the text and convert them into words. Currency is in Indian Rupees. Keep the tone conversational. input_text: {offer_summary.content}"
        summary_in_words = llm_flash.invoke(prompt)
        print(summary_in_words.content)
    else:
        offer_summary_instructions = OpenAIPrompts().offer_summary_instructions
        offer_summary_prompt = offer_summary_instructions.format(offer_list=offer_list)
        offer_summary = llm_4omini.invoke(offer_summary_prompt)
        prompt = f"Consider all the numeric values in the text and convert them into words. Currency is in Indian Rupees. Keep the tone conversational. input_text: {offer_summary.content}"
        summary_in_words = llm_4omini.invoke(prompt)
        print(summary_in_words.content)
    offer_summary = offer_summary.content
    # Write the list of analysis to state
    return {
        "offer_summary": offer_summary,
        "agent_message": [offer_summary],
        "agent_message_modified": summary_in_words.content,
        "modified": True,
    }


def user_intent(state: SahayakState):
    logging.info("Inside user_intent")

    if os.environ.get("LLM_CONFIG") == "GOOGLE":
        structured_llm = llm_flash.with_structured_output(UserIntent)
        user_intent_instructions = GeminiPrompts().user_intent_1_instructions
        user_intent_prompt = user_intent_instructions.format(
            user_message=state.get("user_message")[-1]
        )
    else:
        structured_llm = llm_4omini.with_structured_output(UserIntent)
        user_intent_instructions = OpenAIPrompts().user_intent_1_instructions
        user_intent_prompt = user_intent_instructions.format(
            user_message=state.get("user_message")[-1]
        )

    llm_response = structured_llm.invoke(user_intent_prompt)
    user_intent = llm_response.user_intent
    if user_intent.lower().strip() == "question":
        return "answer_user_query"
    return "select_offer"


def answer_user_query(state: SahayakState):
    offer_list = state.get("offer_list")
    logging.info("Inside answer_user_query")
    # qna_prompt = f"""Offer details : {offer_list}.
    # Try to answer the user_query in brief based on the offer details. If applicable, provide the details from the offer details above. Keep the tone conversational.
    # user_query: {state.get("user_message")[-1]}"""
    if os.environ.get("LLM_CONFIG") == "GOOGLE":
        offer_qna_instructions = GeminiPrompts().offer_qna_instructions
        offer_qna_prompt = offer_qna_instructions.format(
            offer_list=offer_list, user_query=state.get("user_message")[-1]
        )
        llm_response = llm_flash.invoke(offer_qna_prompt)
        prompt = f"Consider all the numeric values in the text and convert them into words. Currency is in Indian Rupees. Keep the tone conversational. input_text: {llm_response.content}"
        llm_response_in_words = llm_flash.invoke(prompt)
        print(llm_response_in_words.content)
    else:
        offer_qna_instructions = OpenAIPrompts().offer_qna_instructions
        offer_qna_prompt = offer_qna_instructions.format(
            offer_list=offer_list, user_query=state.get("user_message")[-1]
        )
        llm_response = llm_4omini.invoke(offer_qna_prompt)
        prompt = f"Consider all the numeric values in the text and convert them into words. Currency is in Indian Rupees. Keep the tone conversational. input_text: {llm_response.content}"
        llm_response_in_words = llm_4omini.invoke(prompt)
        print(llm_response_in_words.content)
    answer = llm_response.content
    logging.info(f"{answer=}")
    return {
        "agent_message": [answer],
        "agent_message_modified": llm_response_in_words.content,
        "modified": True,
    }


def select_offer(state: SahayakState):
    logging.info("Inside select_offer")
    offer_item_id = state.get("offer_item_id")
    offer_list = state.get("offer_list")
    for offer in offer_list:
        if offer.get("offer_details").get("offer_item_id") == offer_item_id:
            selected_offer = offer
            break
    min_loan_amt = selected_offer.get("offer_details").get("MIN_LOAN_AMOUNT")
    min_loan_amt = re.sub("[^A-Za-z0-9]+", "", min_loan_amt)
    min_loan_amt_words = num2words(min_loan_amt)
    max_loan_amt = selected_offer.get("offer_details").get("MAX_LOAN_AMOUNT")
    max_loan_amt = re.sub("[^A-Za-z0-9]+", "", max_loan_amt)
    max_loan_amt_words = num2words(max_loan_amt)
    return {
        "agent_message": [
            f"Please select the loan amount you want to avail. You can select any amount between {min_loan_amt_words} rupees and {max_loan_amt_words} rupees."
        ],
        "modified": False,
    }


def human_loan_amount_selection(state: SahayakState):
    pass
