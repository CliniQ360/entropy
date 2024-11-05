from core.agents.schemas.state_schemas import SalahakarState
from core.agents.schemas.insurance_output_schemas import *
from core.utils.openai_helper import llm_4o, llm_4omini
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from core.agents.functions.prompt_config import OpenAIPrompts, GeminiPrompts
import os, json, time, base64, re
from datetime import datetime
from core.utils.external_call import APIInterface
from langchain_community.document_loaders import PyPDFLoader
from core import logger

logging = logger(__name__)


def welcome_message(state: SalahakarState):
    return {
        "agent_message": [
            """Welcome to the CliniQ 360. I am your insurance sahalakar and will assist you get the best medical insurance plan.To start with, can you tell me if you are looking for an insurance plan for yourself or your family?"""
        ]
    }


def human_intent_feedback(state: SalahakarState):
    pass


def extract_user_intent(state: SalahakarState):
    language = state.get("language")
    if language == "hi":
        if os.environ.get("LLM_CONFIG") == "GOOGLE":
            pass
        else:
            intent_identification_instructions = (
                OpenAIPrompts().collector_instructions_hi
            )
    else:
        if os.environ.get("LLM_CONFIG") == "GOOGLE":
            pass
        else:
            intent_identification_instructions = (
                OpenAIPrompts().intent_identification_instructions
            )
    intent_identification_prompt = intent_identification_instructions.format(
        user_message=state.get("user_message")[-1]
    )
    structured_llm = llm_4omini.with_structured_output(InsurancePlanEnum)
    user_intent = structured_llm.invoke([intent_identification_prompt])
    return {"insurance_plan_for": user_intent.insurance_plan_for}


def human_document_upload_feedback(state: SalahakarState):
    pass


def document_upload(state: SalahakarState):
    return {
        "agent_message": [
            "For ease of application would you like to upload aadhar card of person insured?"
        ]
    }


def is_document_present(state: SalahakarState):
    document_upload_flag = state.get("document_upload_flag")
    if document_upload_flag:
        return "process_user_document"
    return "generate_questions"


def process_user_document(state: SalahakarState):
    print(f"Inside process_user_document")
    document_upload_flag = state.get("document_upload_flag")
    if document_upload_flag:
        document_list = state.get("document_list")
        image_message_list = []
        for image_file_path in document_list:
            with open(image_file_path, "rb") as image_file:
                image_bytes = image_file.read()
            image_message = {
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/jpeg;base64,{base64.b64encode(image_bytes).decode('utf-8')}"
                },
            }
            image_message_list.append(image_message)
        available_documents = ["Aadhhar card"]
        text_message = {
            "type": "text",
            "text": f"""User has attached {available_documents}. From the given images, extract all the information available. 
            Only extract the information that is visible in the images. If information is not available, return 'None' for the field in output.""",
        }
        image_message_list.extend(text_message)
        structured_llm = llm_4omini.with_structured_output(UserDocumentDetails)
        message = HumanMessage(content=image_message_list)
        print(f"{message=}")
        response = structured_llm.invoke([message])

        collected_details = response.__dict__
    else:
        collected_details = {}
    return {"customer_details": [collected_details]}


def generate_questions(state: SalahakarState):
    """Generate questions to collect user details"""
    master_dict, collected_info = {}, {}
    collected_details_list = state.get("customer_details", None)
    language = state.get("language")
    required_fields = {
        "personal_information": {
            "firstName": "First Name",
            "lastName": "Last Name",
            "dob": "Date of Birth",
            "gender": "Gender",
        },
        "contact_information": {
            "email": "Personal Email Id",
            "phone": "Phone Number",
            "address": "Address",
            "pincode": "Pin Code",
        },
        "health_markers": {
            "heightfoot": "Height in foot",
            "heightinch": "Height in inches",
            "weight": "Weight in kg",
        },
        "pre_existing_diseases": {
            "diabetes": "Is customer suffering with diabetes",
            "heartAilments": "Is customer suffering with heartAilments",
            "bloodPressure": "Is customer suffering with bloodPressure",
            "other": "Is customer suffering with any other pre-existing diseases",
        },
        "insurance_details": {
            "amount": "expected sum insured amount",
            "panIndia": "Requirement for Pan India plan",
        },
        "other_information": {"political_exposure": "Political exposure"},
    }
    section_mapping = {
        "firstName": "personal_information",
        "lastName": "personal_information",
        "dob": "personal_information",
        "gender": "personal_information",
        "email": "contact_information",
        "phone": "contact_information",
        "address": "contact_information",
        "pincode": "contact_information",
        "diabetes": "pre_existing_diseases",
        "heartAilments": "pre_existing_diseases",
        "bloodPressure": "pre_existing_diseases",
        "other": "pre_existing_diseases",
        "heightfoot": "health_markers",
        "heightinch": "health_markers",
        "weight": "health_markers",
        "amount": "insurance_details",
        "panIndia": "insurance_details",
        "political_exposure": "other_information",
    }
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
                    key_section = section_mapping.get(key)
                    collected_section_info = collected_info.get(key_section, None)
                    if collected_section_info:
                        collected_section_info[key] = value
                        collected_info[key_section] = collected_section_info
                    else:
                        collected_info[key_section] = {key: value}
                    master_dict[key] = value
    language = state.get("language")
    if language == "hi":
        if os.environ.get("LLM_CONFIG") == "GOOGLE":
            pass
        else:
            collector_instructions = OpenAIPrompts().insurance_collector_instructions_hi
    else:
        if os.environ.get("LLM_CONFIG") == "GOOGLE":
            pass
        else:
            collector_instructions = OpenAIPrompts().insurance_collector_instructions
    collector_prompt = collector_instructions.format(
        customer_info=collected_info, required_fields=required_fields
    )
    structured_llm = llm_4o.with_structured_output(GeneratedQuestion)
    # Generate question
    print(f"{collector_prompt=}")
    generated_data = structured_llm.invoke(collector_prompt)
    print(f"{generated_data.text=}")
    # Write the list of analysis to state
    return {"agent_message": [generated_data.text], "modified": False}


def extract_user_details(state: SalahakarState):
    print("test")
    """Extract user details"""
    if os.environ.get("LLM_CONFIG") == "GOOGLE":
        pass
    else:
        extractor_instructions = OpenAIPrompts().insurance_extractor_instructions
    extractor_prompt = extractor_instructions.format(
        agent_question=state.get("agent_message")[-1],
        user_answer=state.get("user_message")[-1],
    )
    structured_llm = llm_4o.with_structured_output(UserDetailsResponse)
    extracted_data = structured_llm.invoke([extractor_prompt])
    print(f"Inside Extract User Details {extracted_data.userDetails=}")
    dob = extracted_data.userDetails[0].dob
    if dob and dob != "NA" and dob != "None":
        dob = dob.replace("/", "-")
        extracted_data.userDetails[0].dob = dob
    # Write the list of analysis to state
    return {"customer_details": extracted_data.userDetails, "modified": False}


def human_feedback(state: SalahakarState):
    """No-op node that should be interrupted on"""
    # human_input = input("Please respond: ")
    # state.update({"human_input": human_input})


def should_verify(state: SalahakarState):
    # Check if human feedback
    if state.get("agent_message")[-1] == "ALL DATA COLLECTED":
        return "verify_user_details"
    return "human_feedback"


def verify_user_details(state: SalahakarState):
    return {
        "agent_message": [
            "Thank you for providing the details. The collected information is visible on screen. Do you want me to submit your details?"
        ],
        "modified": False,
    }


def human_verification_feedback(state: SalahakarState):
    pass


def should_submit(state: SalahakarState):
    # Check if human feedback
    # intent_classification_prompt = f"""You are tasked to identify the intent from the user message.
    #     The user could either agree to the information or ask for updates. Classify the intent accordingly.
    #     User message: {state.get("user_message")[-1]}."""

    if os.environ.get("LLM_CONFIG") == "GOOGLE":
        pass
    else:
        intent_classification_instructions = (
            OpenAIPrompts().intent_classification_instructions
        )
    intent_classification_prompt = intent_classification_instructions.format(
        user_answer=state.get("user_message")[-1]
    )
    structured_llm = llm_4omini.with_structured_output(UserIntentClassification)
    # Generate question
    extracted_data = structured_llm.invoke([intent_classification_prompt])
    if extracted_data.user_intent.lower() == "submit":
        return "submit_form_ack"
    return "extract_user_details"


def submit_form_ack(state: SalahakarState):
    return {
        "agent_message": [
            "Please wait while we submit your details. This may take a few seconds."
        ],
        "modified": False,
    }


def submit_form(state: SalahakarState):
    insurance_base_url = os.environ["INSURANCE_BASE_URL"]
    search_url = f"{insurance_base_url}/v1/insurance/search"
    submit_url = f"{insurance_base_url}/v1/insurance/submitForm"
    get_offer_url = f"{insurance_base_url}/v1/insurance/getOfferDetails"
    # making initial search call
    search_resp, search_resp_code = APIInterface().post_with_params(
        route=search_url, params={"user_id": "3", "environment": "PREPROD"}
    )
    search_resp = search_resp[0]
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
        print(customer_details)
    txn_id = search_resp.get("txn_id")
    print("Sleeping for 5 seconds")
    time.sleep(5)
    user_phone_number = customer_details.get("phone")
    user_phone_number = re.sub("[^A-Za-z0-9]+", "", user_phone_number)
    insurance_amount = customer_details.get("amount")
    dob = customer_details.get("dob")
    dob_datetime = datetime.strptime(dob, "%d-%m-%Y")
    dob_converted = dob_datetime.strftime("%Y-%m-%d")
    customer_details.update(
        {
            "dob": dob_converted,
            "amount": str(insurance_amount),
            "phone": user_phone_number,
            "other": (
                True if customer_details.get("other").lower() == "yes" else False
            ),
            "diabetes": (
                True if customer_details.get("diabetes").lower() == "yes" else False
            ),
            "bloodPressure": (
                True
                if customer_details.get("bloodPressure").lower() == "yes"
                else False
            ),
            "heartAilments": (
                True
                if customer_details.get("heartAilments").lower() == "yes"
                else False
            ),
            "panIndia": (
                True if customer_details.get("panIndia").lower() == "yes" else False
            ),
            "politicallyExposedPerson": (
                True
                if customer_details.get("politicallyExposedPerson").lower() == "yes"
                else False
            ),
            "gender": "M" if customer_details.get("gender") == "Male" else "F",
            "PED": customer_details.get("any_pre_existing_disease"),
            "relation": "self",
            "gstin": "ABC",
        }
    )
    del customer_details["any_pre_existing_disease"]
    submit_payload = {"individualInfo": customer_details}
    print(f"{submit_payload=}")
    json_payload = json.dumps(submit_payload)
    submit_resp, submit_resp_code = APIInterface().post_with_params(
        route=submit_url, params={"txn_id": txn_id}, data=json_payload
    )
    if submit_resp_code == 200:
        search_2_resp, search_2_resp_code = APIInterface().post_with_params(
            route=search_url,
            params={"txn_id": txn_id, "user_id": "3", "environment": "PREPROD"},
        )
        if search_2_resp_code == 200:
            current_action = None
            counter = 0
            while current_action != "ON_SEARCH_CATALOG":
                if counter == 10:
                    print("Did not receive submit form response.")
                    break
                get_offer_resp, get_offer_resp_code = APIInterface().get(
                    route=get_offer_url, params={"txn_id": txn_id}
                )
                current_action = get_offer_resp.get("transaction_details").get(
                    "current_action"
                )
                print(f"{current_action=}")
                time.sleep(5)
                counter += 1
            offer_list = get_offer_resp.get("offer_list")
            offer_document_text = {}
            for offer_item in offer_list:
                offer_item_id = offer_item.get("offer_details").get("offer_item_id")
                policy_name = offer_item.get("offer_details").get("policy_name")
                if policy_name:
                    policy_doc_base_path = os.environ.get("POLICY_DOC_BASE_PATH")
                    policy_file_path = f"{policy_doc_base_path}/{policy_name}.pdf"
                    if os.path.exists(policy_file_path):
                        print(f"File {policy_file_path} exists.")
                        pdf_loader = PyPDFLoader(policy_file_path)
                        pdf_text = pdf_loader.load()
                        document_text = " ".join(
                            [page.page_content for page in pdf_text]
                        )
                        offer_document_text.update({offer_item_id: document_text})
                    else:
                        print(f"File {policy_file_path} does not exist.")
            return {
                "offer_list": offer_list,
                "offer_document_text": offer_document_text,
                "txn_id": txn_id,
                "agent_message": [f"Summarising the collected offers for you."],
                "modified": False,
            }
    else:
        return {
            "aa_url": None,
            "txn_id": txn_id,
            "agent_message": [f"Error in submitting the form. Please try again later."],
            "modified": False,
        }


def summarise_offers(state: SalahakarState):
    offer_list = state.get("offer_list")
    language = state.get("language")
    if language == "hi":
        if os.environ.get("LLM_CONFIG") == "GOOGLE":
            pass
        else:
            offer_summary_instructions = (
                OpenAIPrompts().insurance_summariser_instructions_hi
            )
    else:
        if os.environ.get("LLM_CONFIG") == "GOOGLE":
            pass
        else:
            offer_summary_instructions = (
                OpenAIPrompts().insurance_summariser_instructions
            )
    offer_summary_prompt = offer_summary_instructions.format(offer_list=offer_list)
    offer_summary = llm_4omini.invoke(offer_summary_prompt)
    offer_summary = offer_summary.content
    offer_summary = offer_summary.replace("*", "")
    # Write the list of analysis to state
    return {
        "offer_summary": offer_summary,
        "agent_message": [offer_summary],
        "modified": False,
    }


def user_intent(state: SalahakarState):
    print("Inside user_intent")
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


def human_selection(state: SalahakarState):
    print("Inside human_selection")


def answer_user_query(state: SalahakarState):
    offer_list = state.get("offer_list")
    language = state.get("language")
    selected_offer_item_id = state.get("selected_offer_item_id")
    offer_document_text = state.get("offer_document_text")
    print("Inside answer_user_query")
    selected_offer_list = []
    for offer_item in offer_list:
        offer_item_id = offer_item.get("offer_details").get("offer_item_id")
        if offer_item_id == selected_offer_item_id:
            selected_offer_list.append(offer_item)
    offer_document_text = offer_document_text.get(selected_offer_item_id)
    if language == "hi":
        if os.environ.get("LLM_CONFIG") == "GOOGLE":
            pass
        else:
            offer_qna_instructions = OpenAIPrompts().insurance_qna_instructions_hi
    else:
        if os.environ.get("LLM_CONFIG") == "GOOGLE":
            pass
        else:
            offer_qna_instructions = OpenAIPrompts().insurance_qna_instructions
    offer_qna_prompt = offer_qna_instructions.format(
        offer_list=selected_offer_list,
        offer_document_text=offer_document_text,
        user_query=state.get("user_message")[-1],
    )
    llm_response = llm_4omini.invoke(offer_qna_prompt)
    answer = llm_response.content
    answer = answer.replace("*", "")
    print(f"{answer=}")
    return {
        "agent_message": [answer],
        "modified": False,
    }


def select_offer(state: SalahakarState):
    print("Inside select_offer")
    return {
        "agent_message": ["Do you want to add any add-ons to your insurance plan?"],
        "modified": False,
    }


def human_add_on_selection(state: SalahakarState):
    print("Inside human_add_on_selection")
    pass


def select_add_on(state: SalahakarState):
    print("Inside select_add_on")
    selected_offer_item_id = state.get("selected_offer_item_id")
    offer_list = state.get("offer_list")
    available_add_ons = []
    selected_add_on_list = []
    for offer_item in offer_list:
        offer_item_id = offer_item.get("offer_details").get("offer_item_id")
        if offer_item_id == selected_offer_item_id:
            available_add_on_list = offer_item.get("offer_details").get(
                "available_add_ons"
            )
            available_add_ons.extend(available_add_on_list)
    if os.environ.get("LLM_CONFIG") == "GOOGLE":
        pass
    else:
        add_on_identification_instructions = (
            OpenAIPrompts().add_on_identification_instructions
        )
    user_intent_prompt = add_on_identification_instructions.format(
        user_message=state.get("user_message")[-1], available_add_ons=available_add_ons
    )
    structured_llm = llm_4o.with_structured_output(AddOnOfferList)
    selected_add_ons = structured_llm.invoke(user_intent_prompt)
    resp_list = selected_add_ons.add_on_list
    for item in resp_list:
        selected_add_on_list.append(item.dict())
    return {
        "agent_message": [
            "Selected add-ons are visible on screen. Please confirm to proceed further."
        ],
        "selected_add_ons": selected_add_on_list,
    }


def human_add_on_confirmation(state: SalahakarState):
    pass


def select_insurance(state: SalahakarState):
    insurance_base_url = os.environ["INSURANCE_BASE_URL"]
    select_url = f"{insurance_base_url}/v1/insurance/select"
    # making select call
    txn_id = state.get("txn_id")
    selected_offer_item_id = state.get("selected_offer_item_id")
    selected_add_ons = state.get("selected_add_ons")
    add_on_list = []
    for add_on in selected_add_ons:
        add_on_id = add_on.get("id")
        add_on_list.append({"add_on_id": add_on_id, "add_on_count": 1})
    add_on_payload = {"add_on_obj": add_on_list}
    select_resp, select_resp_code = APIInterface().post_with_params(
        route=select_url,
        params={"txn_id": txn_id, "offer_item_id": selected_offer_item_id},
        data=add_on_payload,
    )


def get_kyc_url(state: SalahakarState):
    insurance_base_url = os.environ["INSURANCE_BASE_URL"]
    get_form_url = f"{insurance_base_url}/v1/insurance/getFormUrl"
    get_txn_details_url = f"{insurance_base_url}/v1/txn_details"
    txn_id = state.get("txn_id")
    current_action = None
    counter = 0
    while current_action != "ON_SELECT_KYC":
        if counter == 10:
            print("Did not receive KYC url")
            break
        get_txn_details_resp, get_txn_details_resp_code = APIInterface().get(
            route=get_txn_details_url, params={"txn_id": txn_id}
        )
        current_action = get_txn_details_resp.get("current_action")
        print(f"{current_action=}")
        time.sleep(5)
        counter += 1
    selected_offer_item_id = state.get("selected_offer_item_id")
    get_url_resp, get_url_resp_code = APIInterface().get(
        route=get_form_url,
        params={
            "txn_id": txn_id,
            "offer_item_id": selected_offer_item_id,
            "form_type": "KYC",
        },
    )
    kyc_url = get_url_resp.get("form_url")
    return {
        "kyc_url": kyc_url,
        "agent_message": ["Please click on proceed to complete your KYC."],
    }


def resume_after_kyc(state: SalahakarState):
    pass


def is_kyc_approved(state: SalahakarState):
    insurance_base_url = os.environ["INSURANCE_BASE_URL"]
    get_txn_details_url = f"{insurance_base_url}/v1/txn_details"
    # making get form url call
    txn_id = state.get("txn_id")
    get_txn_details_resp, get_txn_details_resp_code = APIInterface().get(
        route=get_txn_details_url, params={"txn_id": txn_id}
    )
    current_action = get_txn_details_resp.get("current_action")
    print(f"{current_action=}")
    if current_action != "ON_STATUS_KYC":
        return "send_kyc_ack"
    return "kyc_approval_pending"


def kyc_approval_pending(state: SalahakarState):
    pass


def send_kyc_ack(state: SalahakarState):
    insurance_base_url = os.environ["INSURANCE_BASE_URL"]
    insurance_init_url = f"{insurance_base_url}/v1/insurance/init"
    get_txn_details_url = f"{insurance_base_url}/v1/txn_details"
    # making select call
    txn_id = state.get("txn_id")
    selected_offer_item_id = state.get("selected_offer_item_id")
    init_resp, init_resp_code = APIInterface().post_with_params(
        route=insurance_init_url,
        params={"txn_id": txn_id, "offer_item_id": selected_offer_item_id},
    )
    current_action = None
    counter = 0
    while current_action != "ON_INIT_BUYER_FORM":
        if counter == 10:
            print("Did not receive Buyer form")
            break
        get_txn_details_resp, get_txn_details_resp_code = APIInterface().get(
            route=get_txn_details_url, params={"txn_id": txn_id}
        )
        current_action = get_txn_details_resp.get("current_action")
        print(f"{current_action=}")
        time.sleep(5)
        counter += 1


def is_buyer_info_present(state: SalahakarState):
    insurance_plan_for = state.get("insurance_plan_for")
    if insurance_plan_for == "self":
        return "collate_buyer_info"
    return "generate_buyer_questions"


def collate_buyer_info(state: SalahakarState):
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
        print(customer_details)
    user_phone_number = customer_details.get("phone")
    user_phone_number = re.sub("[^A-Za-z0-9]+", "", user_phone_number)
    dob = customer_details.get("dob")
    dob_datetime = datetime.strptime(dob, "%d-%m-%Y")
    dob_converted = dob_datetime.strftime("%Y-%m-%d")
    buyer_details = {
        "firstName": customer_details["firstName"],
        "lastName": customer_details["lastName"],
        "email": customer_details["email"],
        "phone": user_phone_number,
        "address": customer_details["address"],
        "gender": "M" if customer_details.get("gender") == "Male" else "F",
        "dob": dob_converted,
        "politicallyExposedPerson": (
            True
            if customer_details.get("politicallyExposedPerson").lower() == "yes"
            else False
        ),
        "gstin": "ABC",
    }
    return {"buyer_details": [buyer_details]}


def generate_buyer_questions(state: SalahakarState):
    """Generate questions to collect user details"""
    master_dict, collected_info = {}, {}
    collected_details_list = state.get("customer_details", None)
    language = state.get("language")
    required_fields = {
        "personal_information": {
            "firstName": "First Name",
            "lastName": "Last Name",
            "dob": "Date of Birth",
            "gender": "Gender",
        },
        "contact_information": {
            "email": "Personal Email Id",
            "phone": "Phone Number",
            "address": "Address",
        },
        "other_information": {"political_exposure": "Political exposure"},
    }
    section_mapping = {
        "firstName": "personal_information",
        "lastName": "personal_information",
        "dob": "personal_information",
        "gender": "personal_information",
        "email": "contact_information",
        "phone": "contact_information",
        "address": "contact_information",
        "political_exposure": "other_information",
    }
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
                    key_section = section_mapping.get(key)
                    collected_section_info = collected_info.get(key_section, None)
                    if collected_section_info:
                        collected_section_info[key] = value
                        collected_info[key_section] = collected_section_info
                    else:
                        collected_info[key_section] = {key: value}
                    master_dict[key] = value
    language = state.get("language")
    if language == "hi":
        if os.environ.get("LLM_CONFIG") == "GOOGLE":
            pass
        else:
            collector_instructions = OpenAIPrompts().insurance_collector_instructions_hi
    else:
        if os.environ.get("LLM_CONFIG") == "GOOGLE":
            pass
        else:
            collector_instructions = OpenAIPrompts().insurance_collector_instructions
    collector_prompt = collector_instructions.format(
        customer_info=collected_info, required_fields=required_fields
    )
    structured_llm = llm_4o.with_structured_output(GeneratedQuestion)
    # Generate question
    print(f"{collector_prompt=}")
    generated_data = structured_llm.invoke(collector_prompt)
    print(f"{generated_data.text=}")
    # Write the list of analysis to state
    return {"agent_message": [generated_data.text], "modified": False}


def human_buyer_feedback(state: SalahakarState):
    """No-op node that should be interrupted on"""
    # human_input = input("Please respond: ")
    # state.update({"human_input": human_input})


def extract_buyer_details(state: SalahakarState):
    print("test")
    """Extract buyer details"""
    if os.environ.get("LLM_CONFIG") == "GOOGLE":
        pass
    else:
        extractor_instructions = OpenAIPrompts().insurance_extractor_instructions
    extractor_prompt = extractor_instructions.format(
        agent_question=state.get("agent_message")[-1],
        user_answer=state.get("user_message")[-1],
    )
    structured_llm = llm_4o.with_structured_output(BuyerDetailsResponse)
    extracted_data = structured_llm.invoke([extractor_prompt])
    print(f"Inside Extract User Details {extracted_data.buyerDetails=}")
    dob = extracted_data.buyerDetails[0].dob
    if dob and dob != "NA" and dob != "None":
        dob = dob.replace("/", "-")
        extracted_data.buyerDetails[0].dob = dob
    # Write the list of analysis to state
    return {"buyer_details": extracted_data.buyerDetails, "modified": False}


def should_verify_buyer_details(state: SalahakarState):
    # Check if human feedback
    if state.get("agent_message")[-1] == "ALL DATA COLLECTED":
        return "verify_buyer_details"
    return "human_buyer_feedback"


def verify_buyer_details(state: SalahakarState):
    return {
        "agent_message": [
            "Thank you for providing the details. The collected information is visible on screen. Do you want me to submit your details?"
        ],
        "modified": False,
    }


def human_buyer_verification_feedback(state: SalahakarState):
    pass


def should_submit_buyer_details(state: SalahakarState):
    if os.environ.get("LLM_CONFIG") == "GOOGLE":
        pass
    else:
        intent_classification_instructions = (
            OpenAIPrompts().intent_classification_instructions
        )
    intent_classification_prompt = intent_classification_instructions.format(
        user_answer=state.get("user_message")[-1]
    )
    structured_llm = llm_4omini.with_structured_output(UserIntentClassification)
    # Generate question
    extracted_data = structured_llm.invoke([intent_classification_prompt])
    if extracted_data.user_intent.lower() == "submit":
        return "submit_buyer_form"
    return "extract_buyer_details"


def submit_buyer_form(state: SalahakarState):
    insurance_base_url = os.environ["INSURANCE_BASE_URL"]
    submit_url = f"{insurance_base_url}/v1/insurance/submitForm"
    init_url = f"{insurance_base_url}/v1/insurance/init"
    txn_details_url = f"{insurance_base_url}/v1/txn_details"
    # making initial search call
    buyer_details_list = state.get("buyer_details", None)
    buyer_details = {}
    if buyer_details_list:
        for item in buyer_details_list:
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
                    buyer_details[key] = value
        print(buyer_details)
    txn_id = state.get("txn_id")
    selected_offer_item_id = state.get("selected_offer_item_id")
    user_phone_number = buyer_details.get("phone")
    user_phone_number = re.sub("[^A-Za-z0-9]+", "", user_phone_number)
    dob = buyer_details.get("dob")
    dob_datetime = datetime.strptime(dob, "%d-%m-%Y")
    dob_converted = dob_datetime.strftime("%Y-%m-%d")
    buyer_payload = {
        "firstName": buyer_details["firstName"],
        "lastName": buyer_details["lastName"],
        "email": buyer_details["email"],
        "phone": user_phone_number,
        "address": buyer_details["address"],
        "gender": "M" if buyer_details.get("gender") == "Male" else "F",
        "dob": dob_converted,
        "politicallyExposedPerson": (
            True
            if buyer_details.get("politicallyExposedPerson").lower() == "yes"
            else False
        ),
        "gstin": "ABC",
    }
    submit_payload = {"buyerInfo": buyer_payload}
    print(f"{submit_payload=}")
    json_payload = json.dumps(submit_payload)
    submit_resp, submit_resp_code = APIInterface().post_with_params(
        route=submit_url,
        params={"txn_id": txn_id, "offer_item_id": selected_offer_item_id},
        data=json_payload,
    )
    if submit_resp_code == 200:
        init_2_resp, init_2_resp_code = APIInterface().post_with_params(
            route=init_url,
            params={"txn_id": txn_id, "offer_item_id": selected_offer_item_id},
        )
        if init_2_resp_code == 200:
            current_action = None
            counter = 0
            while current_action != "ON_INIT_NOMINEE":
                if counter == 10:
                    print("Did not receive nominee details.")
                    break
                get_txn_resp, get_txn_resp_code = APIInterface().get(
                    route=txn_details_url, params={"txn_id": txn_id}
                )
                current_action = get_txn_resp.get("current_action")
                print(f"{current_action=}")
                time.sleep(5)
                counter += 1
            return {
                "agent_message": [
                    f"Buyer form submitted successfully. Please provide nominee details."
                ],
                "modified": False,
            }


def generate_nominee_questions(state: SalahakarState):
    """Generate questions to collect user details"""
    master_dict, collected_info = {}, {}
    collected_details_list = state.get("customer_details", None)
    language = state.get("language")
    required_fields = {
        "personal_information": {
            "firstName": "First Name",
            "lastName": "Last Name",
            "phone": "Phone Number",
            "relation": "Relation with the person insured",
        }
    }
    section_mapping = {
        "firstName": "personal_information",
        "lastName": "personal_information",
        "phone": "personal_information",
        "relation": "personal_information",
    }
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
                    key_section = section_mapping.get(key)
                    collected_section_info = collected_info.get(key_section, None)
                    if collected_section_info:
                        collected_section_info[key] = value
                        collected_info[key_section] = collected_section_info
                    else:
                        collected_info[key_section] = {key: value}
                    master_dict[key] = value
    language = state.get("language")
    if language == "hi":
        if os.environ.get("LLM_CONFIG") == "GOOGLE":
            pass
        else:
            collector_instructions = OpenAIPrompts().insurance_collector_instructions_hi
    else:
        if os.environ.get("LLM_CONFIG") == "GOOGLE":
            pass
        else:
            collector_instructions = OpenAIPrompts().insurance_collector_instructions
    collector_prompt = collector_instructions.format(
        customer_info=collected_info, required_fields=required_fields
    )
    structured_llm = llm_4o.with_structured_output(GeneratedQuestion)
    # Generate question
    print(f"{collector_prompt=}")
    generated_data = structured_llm.invoke(collector_prompt)
    print(f"{generated_data.text=}")
    # Write the list of analysis to state
    return {"agent_message": [generated_data.text], "modified": False}


def human_nominee_feedback(state: SalahakarState):
    """No-op node that should be interrupted on"""
    # human_input = input("Please respond: ")
    # state.update({"human_input": human_input})


def extract_nominee_details(state: SalahakarState):
    print("test")
    """Extract buyer details"""
    if os.environ.get("LLM_CONFIG") == "GOOGLE":
        pass
    else:
        extractor_instructions = OpenAIPrompts().insurance_extractor_instructions
    extractor_prompt = extractor_instructions.format(
        agent_question=state.get("agent_message")[-1],
        user_answer=state.get("user_message")[-1],
    )
    structured_llm = llm_4o.with_structured_output(NomineeDetailsResponse)
    extracted_data = structured_llm.invoke([extractor_prompt])
    print(f"Inside Extract User Details {extracted_data.nomineeDetails=}")
    # Write the list of analysis to state
    return {"nominee_details": extracted_data.nomineeDetails, "modified": False}


def should_verify_nominee_details(state: SalahakarState):
    # Check if human feedback
    if state.get("agent_message")[-1] == "ALL DATA COLLECTED":
        return "verify_nominee_details"
    return "human_nominee_feedback"


def verify_nominee_details(state: SalahakarState):
    return {
        "agent_message": [
            "Thank you for providing the details. The collected information is visible on screen. Do you want me to submit your details?"
        ],
        "modified": False,
    }


def human_nominee_verification_feedback(state: SalahakarState):
    pass


def should_submit_nominee_details(state: SalahakarState):
    if os.environ.get("LLM_CONFIG") == "GOOGLE":
        pass
    else:
        intent_classification_instructions = (
            OpenAIPrompts().intent_classification_instructions
        )
    intent_classification_prompt = intent_classification_instructions.format(
        user_answer=state.get("user_message")[-1]
    )
    structured_llm = llm_4omini.with_structured_output(UserIntentClassification)
    # Generate question
    extracted_data = structured_llm.invoke([intent_classification_prompt])
    if extracted_data.user_intent.lower() == "submit":
        return "submit_nominee_form"
    return "extract_nominee_details"


def submit_nominee_form(state: SalahakarState):
    insurance_base_url = os.environ["INSURANCE_BASE_URL"]
    submit_url = f"{insurance_base_url}/v1/insurance/submitForm"
    get_form_url = f"{insurance_base_url}/v1/insurance/getFormUrl"
    # making initial search call
    nominee_details_list = state.get("nominee_details", None)
    nominee_details = {}
    if nominee_details_list:
        for item in nominee_details_list:
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
                    nominee_details[key] = value
        print(nominee_details)
    txn_id = state.get("txn_id")
    selected_offer_item_id = state.get("selected_offer_item_id")
    user_phone_number = nominee_details.get("phone")
    user_phone_number = re.sub("[^A-Za-z0-9]+", "", user_phone_number)
    nominee_payload = {
        "firstName": nominee_details["firstName"],
        "lastName": nominee_details["lastName"],
        "phone": user_phone_number,
        "relation": nominee_details["relation"],
    }
    submit_payload = {"nomineeDetails": nominee_payload}
    print(f"{submit_payload=}")
    json_payload = json.dumps(submit_payload)
    submit_resp, submit_resp_code = APIInterface().post_with_params(
        route=submit_url,
        params={"txn_id": txn_id, "offer_item_id": selected_offer_item_id},
        data=json_payload,
    )
    if submit_resp_code == 200:
        get_form_resp, get_form_resp_code = APIInterface().get(
            route=get_form_url,
            params={
                "txn_id": txn_id,
                "offer_item_id": selected_offer_item_id,
                "form_type": "PAYMENT",
            },
        )
        if get_form_resp_code == 200:
            payment_url = get_form_resp.get("form_url")
            return {
                "agent_message": [f"Please click on proceed to complete your payment."],
                "payment_url": payment_url,
                "modified": False,
            }


def confirm_offer(state: SalahakarState):
    insurance_base_url = os.environ["INSURANCE_BASE_URL"]
    confirm_url = f"{insurance_base_url}/v1/insurance/confirm"
    txn_id = state.get("txn_id")
    selected_offer_item_id = state.get("selected_offer_item_id")
    confirm_resp, confirm_resp_code = APIInterface().post_with_params(
        route=confirm_url,
        params={"txn_id": txn_id, "offer_item_id": selected_offer_item_id},
    )
