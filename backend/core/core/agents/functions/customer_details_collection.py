from core.agents.schemas.state_schemas import SahayakState
from core.agents.schemas.output_schemas import (
    UserDetailsResponse,
    UserDocumentDetails,
    UserIntentClassification,
    GeneratedQuestion,
)
import os, json, time, base64
from core.utils.vertex_ai_helper.gemini_helper import (
    llm_flash,
    llm_pro,
    llm_002_flash,
    llm_002_pro,
)
from core.utils.openai_helper import llm_4o, llm_4omini
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from core.agents.functions.prompt_config import OpenAIPrompts, GeminiPrompts
from core import logger

logging = logger(__name__)


def welcome_message(state: SahayakState):
    if state.get("language") == "en":
        return {
            "agent_message": [
                "Welcome to the CliniQ 360. I am your credit sahayak and will assist you with your credit journey. Let's get started. For ease of application, would you like to upload your Aadhaar and PAN card?"
            ],
            "modified": False,
        }
    else:
        return {
            "agent_message": [
                "CliniQ 360 में आपका स्वागत है। मैं आपका क्रेडिट सहायक हूं और आपकी क्रेडिट यात्रा में आपकी सहायता करूंगा। आइए शुरू करें। आवेदन में आसानी के लिए, क्या आप अपना आधार और पैन कार्ड अपलोड करना चाहेंगे?"
            ],
            "modified": False,
        }


def human_document_upload_feedback(state: SahayakState):
    """No-op node that should be interrupted on"""
    pass


def is_document_present(state: SahayakState):
    document_upload_flag = state.get("document_upload_flag")
    if document_upload_flag:
        return "process_user_document"
    return "generate_questions"


def process_user_document(state: SahayakState):
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
    available_documents = ["PAN card"]
    text_message = {
        "type": "text",
        "text": f"""User has attached {available_documents}. From the given images, extract all the information available. 
        Only extract the information that is visible in the images.
        If information is not available, return 'None' for the field in output.""",
    }
    image_message_list.extend(text_message)
    structured_llm = llm_002_pro.with_structured_output(UserDocumentDetails)
    message = HumanMessage(content=image_message_list)

    response = structured_llm.invoke([message])
    collected_details = response.__dict__
    filtered_details = {}
    for key, value in collected_details.items():
        if key == "firstNamePan":
            if value != "NA":
                filtered_details["firstName"] = value
        if key == "lastNamePan":
            if value != "NA":
                filtered_details["lastName"] = value
        if key == "firstNameAadhaar":
            if value != "NA" and filtered_details.get("firstName", None) is not None:
                filtered_details["firstName"] = value
        if key == "lastNameAadhaar":
            if value != "NA" and filtered_details.get("lastName", None) is not None:
                filtered_details["lastName"] = value
        filtered_details[key] = value
    # TODO delete unnessary keys
    del filtered_details["firstNameAadhaar"]
    del filtered_details["lastNameAadhaar"]
    del filtered_details["middleNameAadhaar"]
    del filtered_details["middleNamePan"]
    del filtered_details["firstNamePan"]
    del filtered_details["lastNamePan"]
    dob = filtered_details.get("dob")
    if dob:
        dob = dob.replace("/", "-")
        # converted_date = llm_flash.invoke(
        #     [
        #         f"Input Date: {filtered_details.get('dob')}. Convert the date into DD-MM-YYYY format."
        #     ]
        # )
        filtered_details["dob"] = dob
    return {"customer_details": [filtered_details], "modified": False}


# def generate_questions(state: SahayakState):
#     """Generate questions to collect user details"""
#     # human_analyst_feedback=state.get('human_analyst_feedback', '')
#     # collector_instructions = """
#     #     You are a helpful assistant tasked with collecting customer information in order to complete a loan application form.
#     #     The information you need to collect includes: {required_fields}
#     #     Here’s how you should proceed:
#     #     1. Initial Check: Analyze the already collected information provided in {customer_info} and identify missing values.
#     #     2. Sequential Processing: For each required detail (in the list above), check if it has been provided.
#     #         - If the detail is missing, ask the customer a follow-up question to gather the information for that specific field.
#     #         - If the detail is present, move to the next field without prompting for it again.
#     #     3. Handle End-of-Sequence Issues: Pay special attention to the last element in the list (Income, Address Line 2) and ensure that it is properly processed, even if it is at the end.
#     #         - If Income or Address Line 2 is already provided, do not ask for it again. If it's missing, generate a question specifically for it.
#     #         - Use explicit end-sequence handling to ensure that no details are missed due to an indexing or sequence error.
#     #     4. Chain of Thought: Think step-by-step and carefully verify each piece of information before moving to the next.
#     #         - Ask only for the missing information and avoid repeating questions for details that have already been collected.
#     #     5. Final Validation: After going through the list, confirm that all details have been collected.
#     #         - If all required information is available, return: "ALL DATA COLLECTED"
#     #         - If there are still missing pieces of information, generate a question targeting those fields only.
#     #     Now, proceed step-by-step and analyze {customer_info}.
#     #     """
#     master_dict = {}
#     collected_details_list = state.get("customer_details", None)
#     if collected_details_list:
#         for item in collected_details_list:
#             if isinstance(item, dict):
#                 collected_details = item
#             else:
#                 collected_details = item.dict()
#             for key, value in collected_details.items():
#                 if (
#                     value != None
#                     and value != " "
#                     and value != "None"
#                     and value != "NA"
#                     and value != 0
#                 ):
#                     master_dict[key] = value
#         print(master_dict)
#     required_fields = [
#         "firstName",
#         "lastName",
#         "dob",
#         "gender",
#         "email",
#         "pan",
#         "contactNumber",
#         "addressL1",
#         "addressL2",
#         "city",
#         "state",
#         "pincode",
#         "employmentType",
#         "companyName",
#         "income",
#         "officialEmail",
#         "endUse",
#     ]
#     if os.environ.get("LLM_CONFIG") == "GOOGLE":
#         collector_instructions = GeminiPrompts().collector_instructions

#         collector_prompt = collector_instructions.format(
#             customer_info=master_dict, required_fields=required_fields
#         )
#         # Enforce structured output
#         structured_llm = llm_pro.with_structured_output(GeneratedQuestion)
#     else:
#         collector_instructions = OpenAIPrompts().collector_instructions
#         collector_prompt = collector_instructions.format(
#             customer_info=master_dict, required_fields=required_fields
#         )
#         structured_llm = llm_4o.with_structured_output(GeneratedQuestion)
#     # Generate question
#     generated_data = structured_llm.invoke(collector_prompt)

#     # Write the list of analysis to state
#     return {"agent_message": [generated_data.text]}


def generate_questions(state: SahayakState):
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
            "pan": "PAN Number",
            "contactNumber": "Contact Number",
        },
        "address_information": {
            "addressL1": "Address Line 1",
            "addressL2": "Address Line 2",
            "city": "City",
            "state": "State",
            "pincode": "Pin Code",
        },
        "employment_information": {
            "employmentType": "Employment Type",
            "companyName": "Company Name",
            "income": "Income",
            "officialEmail": "Official Email Id",
        },
        "other_information": {"endUse": "Use of Loan"},
    }
    section_mapping = {
        "firstName": "personal_information",
        "lastName": "personal_information",
        "dob": "personal_information",
        "gender": "personal_information",
        "email": "contact_information",
        "pan": "contact_information",
        "contactNumber": "contact_information",
        "addressL1": "address_information",
        "addressL2": "address_information",
        "city": "address_information",
        "state": "address_information",
        "pincode": "address_information",
        "employmentType": "employment_information",
        "companyName": "employment_information",
        "income": "employment_information",
        "officialEmail": "employment_information",
        "endUse": "other_information",
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
    if os.environ.get("LLM_CONFIG") == "GOOGLE":
        if language == "hi":
            collector_instructions = GeminiPrompts().collector_instructions_hi
        else:
            collector_instructions = GeminiPrompts().collector_instructions

        collector_prompt = collector_instructions.format(
            customer_info=collected_info, required_fields=required_fields
        )
        # Enforce structured output
        structured_llm = llm_pro.with_structured_output(GeneratedQuestion)
    else:
        collector_instructions = OpenAIPrompts().collector_instructions
        collector_prompt = collector_instructions.format(
            customer_info=collected_info, required_fields=required_fields
        )
        structured_llm = llm_4o.with_structured_output(GeneratedQuestion)
    # Generate question
    generated_data = structured_llm.invoke(collector_prompt)
    print(f"{generated_data.text=}")
    # Write the list of analysis to state
    return {"agent_message": [generated_data.text], "modified": False}


def extract_user_details(state: SahayakState):
    """Extract user details"""

    # human_analyst_feedback=state.get('human_analyst_feedback', '')
    # extractor_instructions = f"""You are tasked with extracting the user details from the customer's response.
    #     Question asked to the user: {state.get("agent_message")[-1]}.
    #     User response: {state.get("user_message")[-1]}.
    #     If values are not present, return None."""
    # Enforce structured output
    logging.info("Inside extract_user_details")
    if os.environ.get("LLM_CONFIG") == "GOOGLE":
        extractor_instructions = GeminiPrompts().extractor_instructions
        extractor_prompt = extractor_instructions.format(
            agent_question=state.get("agent_message")[-1],
            user_answer=state.get("user_message")[-1],
        )
        structured_llm = llm_flash.with_structured_output(UserDetailsResponse)
    else:
        extractor_instructions = OpenAIPrompts().extractor_instructions
        extractor_prompt = extractor_instructions.format(
            agent_question=state.get("agent_message")[-1],
            user_answer=state.get("user_message")[-1],
        )
        structured_llm = llm_4omini.with_structured_output(UserDetailsResponse)
    # Generate question
    extracted_data = structured_llm.invoke([extractor_prompt])
    print(f"Inside Extract User Details {extracted_data.userDetails=}")
    dob = extracted_data.userDetails[0].dob
    if dob and dob != "NA" and dob != "None":
        dob = dob.replace("/", "-")
        # converted_date = llm_flash.invoke(
        #     [
        #         f"Input Date: {filtered_details.get('dob')}. Convert the date into DD-MM-YYYY format."
        #     ]
        # )
        extracted_data.userDetails[0].dob = dob
    # Write the list of analysis to state
    return {"customer_details": extracted_data.userDetails, "modified": False}


def human_feedback(state: SahayakState):
    """No-op node that should be interrupted on"""
    pass


def should_submit(state: SahayakState):
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
    # Generate question
    extracted_data = structured_llm.invoke([intent_classification_prompt])
    if extracted_data.user_intent.lower() == "submit":
        return "submit_form_ack"
    return "extract_user_details"


def should_verify(state: SahayakState):
    # Check if human feedback
    if state.get("agent_message")[-1] == "ALL DATA COLLECTED":
        return "verify_user_details"
    return "human_feedback"


def verify_user_details(state: SahayakState):
    if state.get("language") == "en":
        return {
            "agent_message": [
                "Thank you for providing the details. The collected information is visible on screen. Do you want me to submit your details?"
            ],
            "modified": False,
        }
    else:
        return {
            "agent_message": [
                "विवरण उपलब्ध कराने के लिए धन्यवाद. एकत्रित जानकारी स्क्रीन पर दिखाई देती है। क्या आप चाहते हैं कि मैं आपका विवरण प्रस्तुत करूँ?"
            ],
            "modified": False,
        }


def human_verification_feedback(state: SahayakState):
    """No-op node that should be interrupted on"""
    pass
