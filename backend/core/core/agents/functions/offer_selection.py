from core.agents.schemas.state_schemas import (
    UserDetailsState,
    OfferState,
    LoanDocumentState,
)
from core.agents.schemas.output_schemas import (
    GeneratedQuestion,
    UserAccountDetailsResponse,
    UserIntent,
    UserIntentClassification,
)
from core.utils.external_call import APIInterface
import os, json, time
from core.utils.vertex_ai_helper.gemini_helper import llm_flash, llm_pro
from core.utils.openai_helper import llm_4omini, llm_4o
from langchain_community.document_loaders import PyPDFLoader
from core import logger
from core.agents.functions.prompt_config import OpenAIPrompts, GeminiPrompts

logging = logger(__name__)


def submit_loan_amount(state: OfferState):
    credit_base_url = os.environ["CREDIT_BASE_URL"]
    submit_loan_amount_url = f"{credit_base_url}/v1/credit/submitForm"
    select_load_amount_url = f"{credit_base_url}/v1/credit/select"
    get_txn_url = f"{credit_base_url}/v1/txn_details"
    get_form_url = f"{credit_base_url}/v1/credit/getFormUrl"
    txn_id = state.get("txn_id")
    offer_item_id = state.get("offer_item_id")
    submit_loan_payload = {
        "loanAmountForm": {
            "requestAmount": state.get("selected_loan_amount"),
            "form_id": offer_item_id,
        }
    }
    json_payload = json.dumps(submit_loan_payload)
    (
        submit_loan_amount_resp,
        submit_loan_amount_resp_code,
    ) = APIInterface().post_with_params(
        route=submit_loan_amount_url,
        params={"txn_id": state.get("txn_id")},
        data=json_payload,
    )
    (
        select_loan_amount_resp,
        select_loan_amount_resp_code,
    ) = APIInterface().post_with_params(
        route=select_load_amount_url,
        params={"txn_id": state.get("txn_id"), "offer_item_id": offer_item_id},
    )
    current_action = None
    counter = 0
    while current_action != "ON_SELECT_KYC":
        if counter == 10:
            logging.info("Did not receive KYC response.")
            break
        get_txn_resp, get_txn_resp_code = APIInterface().get(
            route=get_txn_url, params={"txn_id": txn_id}
        )
        current_action = get_txn_resp.get("current_action")
        print(f"{current_action=}")
        counter += 1
        print("Sleeping for 5 seconds")
        time.sleep(5)
    get_kyc_url_resp, get_kyc_url_resp_code = APIInterface().get(
        route=get_form_url, params={"offer_item_id": offer_item_id, "txn_id": txn_id}
    )
    kyc_url = get_kyc_url_resp.get("form_url")
    return {
        "kyc_url": kyc_url,
        "agent_message": [
            "Your details are successfully submitted. Please click proceed to complete your KYC."
        ],
    }


def human_refreh_offer(state: OfferState):
    return {"agent_message": ["Getting more offers for you."]}


def is_amount_valid(state: OfferState):
    selected_loan_amount = state.get("selected_loan_amount")
    offer_item_id = state.get("offer_item_id")
    offer_list = state.get("offer_list")
    for offer in offer_list:
        if offer.get("offer_details").get("offer_item_id") == offer_item_id:
            selected_offer = offer
            break
    min_loan_amt = selected_offer.get("offer_details").get("MIN_LOAN_AMOUNT")
    max_loan_amt = selected_offer.get("offer_details").get("MAX_LOAN_AMOUNT")
    if (
        int(float(min_loan_amt))
        <= int(float(selected_loan_amount))
        <= int(float(max_loan_amt))
    ):
        return "submit_loan_amount"
    return "human_invalid_loan_amount_selection"


def human_recheck_approval(state: OfferState):
    pass


def human_invalid_loan_amount_selection(state: OfferState):
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
            f"Minimum loan amount is {min_loan_amt} and maximum loan amount is {max_loan_amt}. Please select the loan amount within the range provided"
        ]
    }


def resume_after_kyc_redirect(state: OfferState):
    pass


def is_kyc_approved(state: OfferState):
    credit_base_url = os.environ["CREDIT_BASE_URL"]
    get_txn_url = f"{credit_base_url}/v1/txn_details"
    txn_id = state.get("txn_id")
    get_txn_resp, get_txn_resp_code = APIInterface().get(
        route=get_txn_url, params={"txn_id": txn_id}
    )
    current_action = get_txn_resp.get("current_action")
    if current_action == "ON_STATUS_KYC":
        return "send_kyc_ack"
    return "kyc_approval_pending"


def kyc_approval_pending(state: OfferState):
    pass


def send_kyc_ack(state: OfferState):
    credit_base_url = os.environ["CREDIT_BASE_URL"]
    credit_init_url = f"{credit_base_url}/v1/credit/init"
    get_txn_url = f"{credit_base_url}/v1/txn_details"
    txn_id = state.get("txn_id")
    offer_item_id = state.get("offer_item_id")
    credit_init_resp, credit_init_resp_code = APIInterface().post_with_params(
        route=credit_init_url, params={"txn_id": txn_id, "offer_item_id": offer_item_id}
    )
    get_txn_resp, get_txn_resp_code = APIInterface().get(
        route=get_txn_url, params={"txn_id": txn_id}
    )
    current_action = None
    counter = 0
    while current_action != "ON_INIT_ACC_DTL":
        if counter == 10:
            logging.info("Did not receive KYC ack response.")
            break
        get_txn_resp, get_txn_resp_code = APIInterface().get(
            route=get_txn_url, params={"txn_id": txn_id}
        )
        current_action = get_txn_resp.get("current_action")
        print(f"{current_action=}")
        print("Sleeping for 5 seconds")
        time.sleep(5)
    return {"status": current_action}


def generate_account_details_questions(state: UserDetailsState):
    #     collector_instructions = """
    #         You are a helpful assistant tasked with collecting customer information in order to complete a loan application form.
    #         The information you need to collect includes: {required_fields}
    #         Here’s how you should proceed:
    #         1. Initial Check: Analyze the already collected information provided in {customer_info} and identify missing values.
    #         2. Sequential Processing: For each required detail (in the list above), check if it has been provided.
    #             - If the detail is missing, ask the customer a follow-up question to gather the information for that specific field.
    #             - If the detail is present, move to the next field without prompting for it again.
    #         3. Handle End-of-Sequence Issues: Pay special attention to the last element in the list (ifscCode) and ensure that it is properly processed, even if it is at the end.
    #             - If ifscCode is already provided, do not ask for it again. If it's missing, generate a question specifically for it.
    #             - Use explicit end-sequence handling to ensure that no details are missed due to an indexing or sequence error.
    #         4. Chain of Thought: Think step-by-step and carefully verify each piece of information before moving to the next.
    #             - Ask only for the missing information and avoid repeating questions for details that have already been collected.
    #             - Ask question in group of 4 required_fields.
    #         5. Final Validation: After going through the list, confirm that all details have been collected.
    #             - If all required information is available, return: "ALL DATA COLLECTED"
    #             - If there are still missing pieces of information, generate a question targeting those fields only.
    #         Now, proceed step-by-step and analyze {customer_info}.
    #    """
    master_dict = {}
    customer_account_details_list = state.get("customer_account_details", None)
    if customer_account_details_list:
        for items in customer_account_details_list:
            print(items.dict())
            for key, value in items.dict().items():
                if (
                    value != None
                    and value != " "
                    and value != "None"
                    and value != "NA"
                    and value != 0
                ):
                    master_dict[key] = value
        print(master_dict)
    required_fields = ["accHolderName", "acctype", "accNo", "ifscCode"]
    if os.environ.get("LLM_CONFIG") == "GOOGLE":
        collector_instructions = GeminiPrompts().account_collector_instructions

        collector_prompt = collector_instructions.format(
            customer_info=master_dict, required_fields=required_fields
        )
        structured_llm = llm_pro.with_structured_output(GeneratedQuestion)
    else:
        collector_instructions = OpenAIPrompts().account_collector_instructions
        collector_prompt = collector_instructions.format(
            customer_info=master_dict, required_fields=required_fields
        )
        structured_llm = llm_4o.with_structured_output(GeneratedQuestion)
    # Generate question
    generated_data = structured_llm.invoke(collector_prompt)

    # Write the list of analysis to state
    return {"agent_message": [generated_data.text]}


def human_account_details_feedback(state: OfferState):
    pass


def extract_user_account_details(state: OfferState):
    """Extract user account details"""
    # extractor_instructions = f"""You are tasked with extracting the user details from the customer's response.
    # If values are not present, return None.
    # customer response: {state.get("user_message")[-1]}"""
    if os.environ.get("LLM_CONFIG") == "GOOGLE":
        extractor_instructions = GeminiPrompts().account_extractor_instructions
        extractor_prompt = extractor_instructions.format(
            user_message=state.get("user_message")[-1]
        )
        # human_analyst_feedback=state.get('human_analyst_feedback', '')

        # Enforce structured output
        structured_llm = llm_flash.with_structured_output(UserAccountDetailsResponse)
    else:
        extractor_instructions = OpenAIPrompts().account_extractor_instructions
        extractor_prompt = extractor_instructions.format(
            user_message=state.get("user_message")[-1]
        )
        # human_analyst_feedback=state.get('human_analyst_feedback', '')

        # Enforce structured output
        structured_llm = llm_4omini.with_structured_output(UserAccountDetailsResponse)
    # Generate question
    extracted_data = structured_llm.invoke([extractor_prompt])

    # Write the list of analysis to state
    return {"customer_account_details": extracted_data.userAccountDetails}


def verify_user_account_details(state: OfferState):
    return {
        "agent_message": [
            "Thank you for providing the details. The collected information is visible on screen. Do you want me to submit your details?"
        ]
    }


def human_account_details_verification_feedback(state: OfferState):
    pass


def submit_account_details_form(state: OfferState):
    credit_base_url = os.environ["CREDIT_BASE_URL"]
    submit_loan_amount_url = f"{credit_base_url}/v1/credit/submitForm"
    offer_init_url = f"{credit_base_url}/v1/credit/init"
    get_txn_url = f"{credit_base_url}/v1/txn_details"
    get_emandate_url = f"{credit_base_url}/v1/credit/getFormUrl"
    txn_id = state.get("txn_id")
    offer_item_id = state.get("offer_item_id")
    collected_details_list = state.get("customer_account_details", None)
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
    customer_details.update({"aaMonitoringConsent": True})
    submit_loan_payload = {"accountDetails": customer_details}
    json_payload = json.dumps(submit_loan_payload)
    current_action = None
    counter = 0
    while current_action != "ON_INIT_ACC_DTL":
        if counter == 10:
            logging.info("Did not receive submit account details response.")
            break
        get_txn_resp, get_txn_resp_code = APIInterface().get(
            route=get_txn_url, params={"txn_id": txn_id}
        )
        current_action = get_txn_resp.get("current_action")
        print(f"{current_action=}")
        print("Sleeping for 5 seconds")
        time.sleep(5)
    (
        submit_loan_amount_resp,
        submit_loan_amount_resp_code,
    ) = APIInterface().post_with_params(
        route=submit_loan_amount_url,
        params={"txn_id": state.get("txn_id")},
        data=json_payload,
    )
    offer_init_resp, offer_init_resp_code = APIInterface().post_with_params(
        route=offer_init_url, params={"txn_id": txn_id, "offer_item_id": offer_item_id}
    )
    counter = 0
    while current_action != "ON_INIT_EMNDT":
        if counter == 10:
            logging.info("Did not receive submit account details response.")
            break
        get_txn_resp, get_txn_resp_code = APIInterface().get(
            route=get_txn_url, params={"txn_id": txn_id}
        )
        current_action = get_txn_resp.get("current_action")
        print(f"{current_action=}")
        print("Sleeping for 5 seconds")
        time.sleep(5)
    get_emandate_resp, get_emandate_resp_code = APIInterface().get(
        route=get_emandate_url,
        params={"offer_item_id": offer_item_id, "txn_id": txn_id},
    )
    emandate_url = get_emandate_resp.get("form_url")
    return {
        "emndt_url": emandate_url,
        "agent_message": [
            "Your details are successfully submitted. Please click proceed to setup your e-mandate."
        ],
    }


def should_verify_account_details(state: UserDetailsState):
    # Check if human feedback
    if state.get("agent_message")[-1] == "ALL DATA COLLECTED":
        return "verify_user_account_details"
    return "human_account_details_feedback"


def should_submit_account_details(state: UserDetailsState):
    # Check if human feedback
    # intent_classification_prompt = f"""You are tasked to identify the intent from the user message.
    #     The user could either agree to the information or ask for updates. Classify the intent accordingly.
    #     User message: {state.get("user_message")[-1]}."""
    if os.environ.get("LLM_CONFIG") == "GOOGLE":
        intent_classification_instructions = (
            GeminiPrompts().intent_classification_instructions
        )
        intent_classification_prompt = intent_classification_instructions.format(
            user_answer=state.get("user_message")[-1]
        )
        structured_llm = llm_flash.with_structured_output(UserIntentClassification)
    else:
        intent_classification_instructions = (
            OpenAIPrompts().intent_classification_instructions
        )
        intent_classification_prompt = intent_classification_instructions.format(
            user_answer=state.get("user_message")[-1]
        )
        structured_llm = llm_4omini.with_structured_output(UserIntentClassification)
    # Identify intent
    extracted_data = structured_llm.invoke([intent_classification_prompt])
    if extracted_data.user_intent.lower() == "ok":
        return "submit_account_details_form"
    return "extract_user_account_details"


def resume_after_emdt_redirect(state: OfferState):
    pass


def is_emdt_approved(state: OfferState):
    credit_base_url = os.environ["CREDIT_BASE_URL"]
    get_txn_url = f"{credit_base_url}/v1/txn_details"
    txn_id = state.get("txn_id")
    get_txn_resp, get_txn_resp_code = APIInterface().get(
        route=get_txn_url, params={"txn_id": txn_id}
    )
    current_action = get_txn_resp.get("current_action")
    if current_action == "ON_STATUS_EMNDT":
        return "send_emdt_ack"
    return "emdt_approval_pending"


def emdt_approval_pending(state: OfferState):
    return {
        "agent_message": [
            "To proceed further, please provide an approval for eMandate flow."
        ]
    }


def send_emdt_ack(state: OfferState):
    credit_base_url = os.environ["CREDIT_BASE_URL"]
    offer_init_url = f"{credit_base_url}/v1/credit/init"
    get_txn_url = f"{credit_base_url}/v1/txn_details"
    get_loan_agrmt_url = f"{credit_base_url}/v1/credit/getFormUrl"
    txn_id = state.get("txn_id")
    offer_item_id = state.get("offer_item_id")
    offer_init_resp, offer_init_resp_code = APIInterface().post_with_params(
        route=offer_init_url, params={"txn_id": txn_id, "offer_item_id": offer_item_id}
    )
    current_action = None
    counter = 0
    while current_action != "ON_INIT_LOAN_AGRMT":
        if counter == 10:
            logging.info("Did not receive e-mandate response.")
            break
        get_txn_resp, get_txn_resp_code = APIInterface().get(
            route=get_txn_url, params={"txn_id": txn_id}
        )
        current_action = get_txn_resp.get("current_action")
        print(f"{current_action=}")
        print("Sleeping for 5 seconds")
        time.sleep(5)
    get_loan_agrmt_resp, get_loan_agrmt_resp_code = APIInterface().get(
        route=get_loan_agrmt_url,
        params={"offer_item_id": offer_item_id, "txn_id": txn_id},
    )
    loan_signing_redirect_url = get_loan_agrmt_resp.get("form_url")
    return {"loan_signing_redirect_url": loan_signing_redirect_url}


def summarise_loan_tnc(state: LoanDocumentState):
    credit_base_url = os.environ["CREDIT_BASE_URL"]
    loan_document_url = f"{credit_base_url}/v1/credit/getLoanDocUrl"
    get_txn_url = f"{credit_base_url}/v1/txn_details"
    txn_id = state.get("txn_id")
    offer_item_id = state.get("offer_item_id")
    current_action = None
    counter = 0
    while current_action != "ON_CONFIRM":
        if counter == 10:
            logging.info("Did not receive ON_CONFIRM.")
            break
        get_txn_resp, get_txn_resp_code = APIInterface().get(
            route=get_txn_url, params={"txn_id": txn_id}
        )
        current_action = get_txn_resp.get("current_action")
        print(f"{current_action=}")
        print("Sleeping for 5 seconds")
        time.sleep(5)
    loan_document_resp, loan_document_resp_code = APIInterface().get(
        route=loan_document_url,
        params={"txn_id": txn_id, "offer_item_id": offer_item_id},
    )
    loan_agreement_url = loan_document_resp.get("loan_agreement_url")
    if loan_agreement_url:
        file_content, _ = APIInterface().download_file(route=loan_agreement_url)
        txn_id = state.get("txn_id")
        file_name = f"{txn_id}.pdf"
        open(file_name, "wb").write(file_content)
        loader = PyPDFLoader(file_name)
        pages = loader.load_and_split()
        text = " ".join([page.page_content.replace("\t", " ") for page in pages])
        if os.environ.get("LLM_CONFIG") == "GOOGLE":
            summarise_loan_agreement_instruction = (
                GeminiPrompts().summarise_loan_agreement_instructions
            )
            summarise_loan_agreement_prompt = (
                summarise_loan_agreement_instruction.format(text=text)
            )
            llm_respose = llm_flash.invoke(summarise_loan_agreement_prompt)
        else:
            summarise_loan_agreement_instruction = (
                OpenAIPrompts().summarise_loan_agreement_instructions
            )
            summarise_loan_agreement_prompt = (
                summarise_loan_agreement_instruction.format(text=text)
            )
            llm_respose = llm_4omini.invoke(summarise_loan_agreement_prompt)
        loan_agreement_summary = llm_respose.content
    else:
        loan_agreement_summary = ""
        text = ""
    return {
        "loan_agreement_summary": loan_agreement_summary,
        "loan_agreement_text": text,
        "agent_message": [loan_agreement_summary],
    }


def human_loan_tnc_feedback(state: LoanDocumentState):
    pass


def answer_tnc_query(state: LoanDocumentState):
    user_query = state.get("user_message")[-1]
    loan_agreement_text = state.get("loan_agreement_text")
    # qna_prompt = f"""
    #     Given is the text from loan agreement document.
    #     Act as a financial advisor and try to answer the user query about the loan agreement strictly based on the text provided.
    #     Your result should be precise, to the point and detailed.
    #     Keep a conversational tone while answering the query.
    #     If the user query cannot be answered from the text provided, "Sorry, I cannot comment on that. I can only answer your queries regarding the loan agreement document.".
    #     Text:
    #     ```{loan_agreement_text}```
    #     User Query: {user_query}.
    #     Answer:
    # """
    if os.environ.get("LLM_CONFIG") == "GOOGLE":
        qna_instructions = GeminiPrompts().qna_instructions
        qna_prompt = qna_instructions.format(
            loan_agreement_text=loan_agreement_text, user_query=user_query
        )
        llm_response = llm_flash.invoke(qna_prompt)
    else:
        qna_instructions = OpenAIPrompts().qna_instructions
        qna_prompt = qna_instructions.format(
            loan_agreement_text=loan_agreement_text, user_query=user_query
        )
        llm_response = llm_4omini.invoke(qna_prompt)
    answer = llm_response.content
    return {"agent_message": [answer]}


def user_intent_1(state: LoanDocumentState):
    if os.environ.get("LLM_CONFIG") == "GOOGLE":
        structured_llm = llm_flash.with_structured_output(UserIntent)
        user_intent_instructions = GeminiPrompts().user_intent_1_instructions
        user_intent_prompt = user_intent_instructions.format(
            user_message=state.get("user_message")
        )
        llm_response = structured_llm.invoke(user_intent_prompt)
    else:
        structured_llm = llm_4omini.with_structured_output(UserIntent)
        user_intent_instructions = OpenAIPrompts().user_intent_1_instructions
        user_intent_prompt = user_intent_instructions.format(
            user_message=state.get("user_message")
        )
        llm_response = structured_llm.invoke(user_intent_prompt)
    user_intent = llm_response.user_intent
    if user_intent.lower().strip() == "question":
        return "answer_tnc_query"
    return "END"


def resume_loan_agreement_signing(state: OfferState):
    pass


def loan_agreement_signing_pending(state: OfferState):
    return {
        "user_message": ["Please sign your loan agreeement form to proceed further."]
    }


def is_loan_agreement_signed(state: OfferState):
    credit_base_url = os.environ["CREDIT_BASE_URL"]
    get_txn_url = f"{credit_base_url}/v1/txn_details"
    txn_id = state.get("txn_id")
    get_txn_resp, get_txn_resp_code = APIInterface().get(
        route=get_txn_url, params={"txn_id": txn_id}
    )
    current_action = get_txn_resp.get("current_action")
    if current_action == "ON_STATUS_LOAN_AGRMT":
        return "confirm_loan"
    return "loan_agreement_signing_pending"


def confirm_loan(state: OfferState):
    credit_base_url = os.environ["CREDIT_BASE_URL"]
    offer_confirm_url = f"{credit_base_url}/v1/credit/confirm"
    txn_id = state.get("txn_id")
    offer_item_id = state.get("offer_item_id")
    offer_confirm_resp, offer_confirm_resp_code = APIInterface().post_with_params(
        route=offer_confirm_url,
        params={"txn_id": txn_id, "offer_item_id": offer_item_id},
    )
    return {
        "agent_message": [
            "Your loan has been confirmed. Thank you for choosing CliniQ 360. Have a great day ahead!"
        ]
    }
