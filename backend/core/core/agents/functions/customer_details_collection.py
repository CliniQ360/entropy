from core.agents.schemas.state_schemas import UserDetailsState
from core.agents.schemas.output_schemas import (
    UserDetailsResponse,
    UserDocumentDetails,
    UserIntentClassification,
    GeneratedQuestion,
)
import os, json, time, base64
from core.utils.vertex_ai_helper.gemini_helper import llm_flash, llm_pro
from core.utils.openai_helper import llm_4o, llm_4omini
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from core.agents.functions.prompt_config import OpenAIPrompts, GeminiPrompts


def welcome_message(state: UserDetailsState):
    return {
        "agent_message": [
            "Welcome to the CliniQ 360. I am your credit sahayak and will assist you with your credit journey. Let's get started. For ease of application, would you like to upload your Aadhaar and PAN card?"
        ]
    }


def human_document_upload_feedback(state: UserDetailsState):
    """No-op node that should be interrupted on"""
    pass


def is_document_present(state: UserDetailsState):
    document_upload_flag = state.get("document_upload_flag")
    if document_upload_flag:
        return "process_user_document"
    return "generate_questions"


def process_user_document(state: UserDetailsState):
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
        Only extract the information that is visible in the images. If information is not available, return 'None' for the field in output.""",
    }
    image_message_list.extend(text_message)
    structured_llm = llm_pro.with_structured_output(UserDocumentDetails)
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
    return {"customer_details": [filtered_details]}


def generate_questions(state: UserDetailsState):
    """Generate questions to collect user details"""
    # human_analyst_feedback=state.get('human_analyst_feedback', '')
    # collector_instructions = """
    #     You are a helpful assistant tasked with collecting customer information in order to complete a loan application form.
    #     The information you need to collect includes: {required_fields}
    #     Here’s how you should proceed:
    #     1. Initial Check: Analyze the already collected information provided in {customer_info} and identify missing values.
    #     2. Sequential Processing: For each required detail (in the list above), check if it has been provided.
    #         - If the detail is missing, ask the customer a follow-up question to gather the information for that specific field.
    #         - If the detail is present, move to the next field without prompting for it again.
    #     3. Handle End-of-Sequence Issues: Pay special attention to the last element in the list (Income, Address Line 2) and ensure that it is properly processed, even if it is at the end.
    #         - If Income or Address Line 2 is already provided, do not ask for it again. If it's missing, generate a question specifically for it.
    #         - Use explicit end-sequence handling to ensure that no details are missed due to an indexing or sequence error.
    #     4. Chain of Thought: Think step-by-step and carefully verify each piece of information before moving to the next.
    #         - Ask only for the missing information and avoid repeating questions for details that have already been collected.
    #     5. Final Validation: After going through the list, confirm that all details have been collected.
    #         - If all required information is available, return: "ALL DATA COLLECTED"
    #         - If there are still missing pieces of information, generate a question targeting those fields only.
    #     Now, proceed step-by-step and analyze {customer_info}.
    #     """
    master_dict = {}
    collected_details_list = state.get("customer_details", None)
    if collected_details_list:
        for item in collected_details_list:
            if isinstance(item, dict):
                collected_details = item
            else:
                collected_details = item.dict()
            for key, value in collected_details.items():
                if value != None and value != " " and value != "None" and value != "NA":
                    master_dict[key] = value
        print(master_dict)
    required_fields = [
        "firstName",
        "lastName",
        "dob",
        "gender",
        "email",
        "pan",
        "contactNumber",
        "addressL1",
        "addressL2",
        "city",
        "state",
        "pincode",
        "employmentType",
        "companyName",
        "income",
        "officialEmail",
        "endUse",
    ]
    if os.environ.get("LLM_CONFIG") == "GOOGLE":
        collector_instructions = GeminiPrompts().collector_instructions

        collector_prompt = collector_instructions.format(
            customer_info=master_dict, required_fields=required_fields
        )
        # Enforce structured output
        structured_llm = llm_pro.with_structured_output(GeneratedQuestion)
    else:
        collector_instructions = OpenAIPrompts().collector_instructions
        collector_prompt = collector_instructions.format(
            customer_info=master_dict, required_fields=required_fields
        )
        structured_llm = llm_4o.with_structured_output(GeneratedQuestion)
    # Generate question
    generated_data = structured_llm.invoke(collector_prompt)

    # Write the list of analysis to state
    return {"agent_message": [generated_data.text]}


def extract_user_details(state: UserDetailsState):
    """Extract user details"""

    # human_analyst_feedback=state.get('human_analyst_feedback', '')
    # extractor_instructions = f"""You are tasked with extracting the user details from the customer's response.
    #     Question asked to the user: {state.get("agent_message")[-1]}.
    #     User response: {state.get("user_message")[-1]}.
    #     If values are not present, return None."""
    # Enforce structured output
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

    # Write the list of analysis to state
    return {"customer_details": extracted_data.userDetails}


def human_feedback(state: UserDetailsState):
    """No-op node that should be interrupted on"""
    pass


def should_submit(state: UserDetailsState):
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
    if extracted_data.user_intent.lower() == "ok":
        return "submit_form"
    return "collect_updated_details"


def should_verify(state: UserDetailsState):
    # Check if human feedback
    if state.get("agent_message")[-1] == "ALL DATA COLLECTED":
        return "verify_user_details"
    return "human_feedback"


def verify_user_details(state: UserDetailsState):
    return {
        "agent_message": [
            "Thank you for providing the details. The collected information is visible on screen. Do you want me to submit your details?"
        ]
    }


def human_verification_feedback(state: UserDetailsState):
    """No-op node that should be interrupted on"""
    pass
