class OpenAIPrompts:
    def __init__(self):
        self.collector_instructions = """
        You are a helpful assistant tasked with collecting customer information in order to complete a loan application form.
        The information you need to collect includes: {required_fields}
        Generate questions to be asked to the customer to collect the required information.
        Initial Check: Analyze the already collected information provided in {customer_info} and identify missing values.
        If no information is available, start by asking the first question.
        Think step-by-step and carefully verify each piece of information before moving to the next.Ask only for the missing information 
        and avoid repeating questions for details that have already been collected.
        Final Validation: After going through the list, confirm that all details have been collected.
            - If all required information is available, reply only: "ALL DATA COLLECTED"
            - If there are still missing pieces of information, generate a question targeting those fields only.
        Now, proceed step-by-step and analyze {customer_info}.
        """

        self.extractor_instructions = """You are tasked with extracting the user details from the customer's response.
        Question asked to the user: {agent_question}.
        User response: {user_answer}.
        If information is not present in user_answer, return 'NA' for the respective field."""

        self.intent_classification_instructions = """You are tasked to identify the intent from the user message.
        The user could either agree to the information or ask for updates. Classify the intent accordingly.
        User message: {user_answer}."""

        self.account_collector_instructions = """
       You are a helpful assistant tasked with collecting customer information in order to complete a loan application form.
        The information you need to collect includes: {required_fields}
        Here’s how you should proceed:
        1. Initial Check: Analyze the already collected information provided in {customer_info} and identify missing values.
        2. Chain of Thought: Think step-by-step and carefully verify each piece of information before moving to the next.
            - Ask only for the missing information and avoid repeating questions for details that have already been collected.
        3. Final Validation: After going through the list, confirm that all details have been collected.
            - If all required information is available, reply only: "ALL DATA COLLECTED"
            - If there are still missing pieces of information, generate a question targeting those fields only.
        Now, proceed step-by-step and analyze {customer_info}.
        """

        self.account_extractor_instructions = """You are tasked with extracting the user details from the customer's response. 
            customer_response: {user_message}
            If information is not present in customer_response, return 'NA' for the respective field."""

        self.account_extractor_instructions = """You are tasked with extracting the user details from the customer's response. 
            customer_response: {user_message}
            If information is not present in customer_response, return 'NA' for the respective field."""

        self.summarise_loan_agreement_instructions = """
        You will be given different passages from a loan agreement document one by one. 
        Act as a financial advisor and provide a summary of the following text. 
        Your result must be detailed and atleast 2 paragraphs. 
        When summarizing, directly dive into the descriptions from the text without using introductory phrases.
        Directly address the loan details, important terms and conditions, and repayment stategies, encapsulating the essence and 
        significant details from the text. Keep a conversational tone. Generate the summary in 25 words only.
        Passage:
        ```{text}```
        SUMMARY:
        """

        self.qna_instructions = """
        Given is the text from loan agreement document.
        Act as a financial advisor and try to answer the user query about the loan agreement strictly based on the text provided. 
        Your result should be precise, to the point and detailed.
        Keep a conversational tone while answering the query. 
        If the user query cannot be answered from the text provided, "Sorry, I cannot comment on that. I can only answer your queries regarding the loan agreement document.".
        Text:
        ```{loan_agreement_text}```
        User Query: {user_query}.
        Answer:
        """

        self.user_intent_1_instructions = """User message: {user_message}.
        Classify the user_message provided above between two categories: ["question", "acknowledgment"]. Respond in one word."""

        self.offer_summary_instructions = """Offer details: {offer_list}.
        Act as a financial adviser. From the credit offer list provided above, help customer understand each credit offer in simple paragraph focusing on important information. 
        Keep the tone conversational and maximum 3 lines per offer."""

        self.offer_qna_instructions = """Offer details : {offer_list}.
        Try to answer the user_query in brief based on the offer details. If applicable, provide the details from the offer details above. Keep the tone conversational.
        user_query: {user_query}"""

        self.intent_identification_instructions = """You are tasked with identifying the user intent from the customer's response.
        The user was asked about the insurance plan for self or family.
        User response: {user_message}.
        If values are not present, return None."""

        self.intent_identification_instructions_hi = """You are tasked with identifying the user intent from the customer's response.
        The user was asked about the insurance plan for self or family.
        User response: {user_message}.
        If values are not present, return None."""

        # self.insurance_collector_instructions = """You are a helpful customer assistant tasked to generate relevant questions to the customer for collecting required customer information.
        # The information you need to collect includes: {required_fields}.
        # The information already collected: {customer_info}.
        # Aim is to generate questions to be asked to the customer to collect the required information in least possible questions.
        # Requireed_fields are divided into the following sections: personal_information, contact_information, address_information, employment_information, and other_information.
        # Process this section by section by generating questions to collect all the missing information for a section. If needed generate question to collect more than one field.
        # Once all required fields of a section is collected move to another section.
        # Keep the generated question simple and easy to understand. Keep the tone conversational without any salutations or introductory or closing remarks.
        # If all required information is collected, only generate : "ALL DATA COLLECTED"
        # Now, proceed step-by-step and analyze {customer_info}.
        # """

        self.insurance_collector_instructions = """You are an intelligent question generator system designed to collect missing information from users. Your role is to:
        - Compare the required fields against collected information
        - Generate natural, conversational questions only for missing information without any salutations or introductory or closing remarks.
        - Present questions in a logical order grouped by category
        - Skip any fields that are already collected

        You will receive two inputs:
        required_fields: A dictionary of all possible fields organized by categories
        collected_info: A dictionary of information already collected from the user

        Rules:
        - Generate one question at a time.
        - Only generate questions for fields that are missing from collected_info
        - Group questions by their categories and ask multiple questions in a single category if needed
        - Present questions in a natural, conversational way
        - For health and medical questions, use polite and sensitive language
        - For boolean fields (like pre-existing conditions), phrase as yes/no questions
        - Format numbers and measurements according to their specific requirements
        - Maintain context from the collected information when generating new questions

        Remember:
        - Never ask for information that's already present in collected_info
        - Maintain a professional yet friendly tone
        - Ensure questions are clear and unambiguous
        - Include format guidance where necessary (e.g., for dates, measurements)
        - Consider dependencies between fields when ordering questions
        - Handle sensitive information (like medical conditions) with appropriate care

        Based on the provided required_fields: {required_fields} and collected_info: {collected_info}, 
        first check if all required data is collected. If it is, return "ALL DATA COLLECTED". Otherwise, generate the most efficient next question following these guidelines. 
        Return exactly one consolidated question addressing the category with the most missing fields.
        """

        self.insurance_collector_instructions_hi = """You are a helpful customer assistant tasked to generate relevant questions to the customer for collecting required customer information.
        The information you need to collect includes: {required_fields}.
        The information already collected: {customer_info}.
        Think step-by-step and carefully verify each piece of information before moving to the next. Generate question only for the missing information 
        and avoid repeating questions for details that have already been collected.
        Aim is to generate questions to be asked to the customer to collect the required information.
        Process this section by section. Generate question to collect all the missing information for a section. Once all required information is collected
        for a section, move to another section. Aim to get the infomation collected in least possible questions.
        Generate a question in Hindi. Keep the generated question simple and easy to understand. Keep the tone conversational without any salutations.
        If all required information is collected, only generate : "ALL DATA COLLECTED"
        Do not include any introductory or closing remarks.
        Now, proceed step-by-step and analyze {customer_info}.
        """

        self.insurance_extractor_instructions = """You are tasked with extracting the user details from the customer's response.
        Question asked to the user: {agent_question}.
        User response: {user_answer}.
        If information is not present in user_answer, return 'NA' for the respective field."""

        self.insurance_summariser_instructions = """Offer details: {offer_list}.
        Act as a insurance adviser. From the insurance plans provided above, help customer understand each plan in simple paragraph focusing on important information. 
        Keep the tone conversational and maximum 25 words.
        Do not include any introductory or closing remarks.
        While summarising, keep in mind all currency is in Indian Rupees. Convert all the currency values into words."""

        self.insurance_summariser_instructions_hi = """Offer details: {offer_list}.
        Act as a insurance adviser. From the insurance plans provided above, help customer understand each plan in simple paragraph focusing on important information. 
        Ouput should be in Hindi. Keep the tone conversational and maximum 25 words.
        Do not include any introductory or closing remarks.
        While summarising, keep in mind all currency is in Indian Rupees. Convert all the currency values into words."""

        self.insurance_qna_instructions = """Offer details : {offer_list}. Offer document text : {offer_document_text}.
        Try to answer the user_query in brief based on the offer details and offer document text. If applicable, provide the details from the offer details above. Keep the tone conversational.
        While generating answer, keep in mind all currency is in Indian Rupees. Convert all the currency values into words.
        Output should be in maximum 200 characters.
        Do not include any introductory or closing remarks.
        user_query: {user_query}. output: """

        self.insurance_qna_instructions_hi = """Offer details : {offer_list}. Offer document text : {offer_document_text}.
        Try to answer the user_query in brief based on the offer details and offer document text. If applicable, provide the details from the offer details above. Keep the tone conversational.
        While generating answer, keep in mind all currency is in Indian Rupees. Convert all the currency values into words.
        Answer should be generated in Hindi. Output should be in maximum 200 characters.
        Do not include any introductory or closing remarks.
        user_query: {user_query}. output: """

        self.add_on_identification_instructions = """You are an intelligent agent. User has been presented with the list of available_add_ons.
        User has shown interest in adding from the list. The user intent is available in user_message. user_message: {user_message}. 
        Analyse the user_message and from the list of available_add_ons, identify the add-ons user wishes to add to the plan. 
        Only return the filtered list of available_add_ons which user is interested in.
        Do not include any introductory or closing remarks.
        available_add_ons : {available_add_ons}"""


class GeminiPrompts:
    def __init__(self):

        # self.collector_instructions = """
        # You are a helpful assistant tasked with collecting customer information in order to complete a loan application form.
        # The information you need to collect includes: {required_fields}
        # Here’s how you should proceed:
        # 1. Initial Check: Analyze the already collected information provided in {customer_info} and identify missing values.
        # 2. Sequential Processing: For each required detail (in the list above), check if it has been provided.
        #     - If the detail is missing, ask the customer a follow-up question to gather the information for that specific field.
        #     - If the detail is present, move to the next field without prompting for it again.
        # 3. Handle End-of-Sequence Issues: Pay special attention to the last element in the list (Income, Address Line 2) and ensure that it is properly processed, even if it is at the end.
        #     - If Income or Address Line 2 is already provided, do not ask for it again. If it's missing, generate a question specifically for it.
        #     - Use explicit end-sequence handling to ensure that no details are missed due to an indexing or sequence error.
        # 4. Chain of Thought: Think step-by-step and carefully verify each piece of information before moving to the next.
        #     - Ask only for the missing information and avoid repeating questions for details that have already been collected.
        # 5. Final Validation: After going through the list, confirm that all details have been collected.
        #     - If all required information is available, return: "ALL DATA COLLECTED"
        #     - If there are still missing pieces of information, generate a question targeting those fields only.
        # Now, proceed step-by-step and analyze {customer_info}.
        # """
        self.collector_instructions = """
        You are a helpful assistant tasked with collecting customer information in order to complete a loan application form.
        The required_fields: {required_fields}. This is divided into the following sections: personal_information,contact_information, address_information, employment_information, and other_information.
        Here’s how you should proceed:
        1. Initial Check: Analyze the already collected information customer_info in {customer_info} and identify missing values.
        2. Sequential Processing: For each required field in required_fields , check if value is already collected for all the keys in the sections.
            - If the value is missing, ask the customer a follow-up question to gather the information for all the missing fields in a section together.
            - If the detail is present, move to the next key without prompting for it again.
            - If all the values for a section are already collected, move to the next section.
        3. Chain of Thought: Think step-by-step and carefully verify each piece of information before moving to the next.
            - Ask only for the missing information and avoid repeating questions for details that have already been collected.
        4. Final Validation: After going through the list, confirm that all details have been collected.
            - If all required information is available, return: "ALL DATA COLLECTED"
            - If there are still missing pieces of information, generate a question targeting those fields only.
        Now, proceed step-by-step and analyze {customer_info}.
        """

        self.collector_instructions_hi = """
        You are a helpful assistant tasked with collecting customer information in order to complete a loan application form.
        The required_fields: {required_fields}. This is divided into the following sections: personal_information,contact_information, address_information, employment_information, and other_information.
        Here’s how you should proceed:
        1. Initial Check: Analyze the already collected information customer_info in {customer_info} and identify missing values.
        2. Sequential Processing: For each required field in required_fields , check if value is already collected for all the keys in the sections.
            - If the value is missing, ask the customer a follow-up question to gather the information for all the missing fields in a section together.
            - If the detail is present, move to the next key without prompting for it again.
            - If all the values for a section are already collected, move to the next section.
        3. Chain of Thought: Think step-by-step and carefully verify each piece of information before moving to the next.
            - Ask only for the missing information and avoid repeating questions for details that have already been collected.
        4. Final Validation: After going through the list, confirm that all details have been collected.
            - If all required information is available, return: "ALL DATA COLLECTED"
            - If there are still missing pieces of information, generate a question in Hindi targeting those fields only.
        Now, proceed step-by-step and analyze {customer_info}.
        """

        self.extractor_instructions = """You are tasked with extracting the user details from the customer's response.
        Question asked to the user: {agent_question}.
        User response: {user_answer}.
        If the information is not present in the user response, return 'None'."""

        self.intent_classification_instructions = """You are tasked to identify the intent from the user message.
        The user could either agree to the information or ask for updates. Classify the intent accordingly.
        User message: {user_answer}."""

        self.account_collector_instructions = """
        You are a helpful assistant tasked with collecting customer information in order to complete a loan application form.
        The information you need to collect includes: {required_fields}
        Here’s how you should proceed:
        1. Initial Check: Analyze the already collected information provided in {customer_info} and identify missing values.
        2. Sequential Processing: For each required detail (in the list above), check if it has been provided.
            - If the detail is missing, ask the customer a follow-up question to gather the information for that specific field.
            - If the detail is present, move to the next field without prompting for it again.
        3. Handle End-of-Sequence Issues: Pay special attention to the last element in the list (ifscCode) and ensure that it is properly processed, even if it is at the end.
            - If ifscCode is already provided, do not ask for it again. If it's missing, generate a question specifically for it.
            - Use explicit end-sequence handling to ensure that no details are missed due to an indexing or sequence error.
        4. Chain of Thought: Think step-by-step and carefully verify each piece of information before moving to the next.
            - Ask only for the missing information and avoid repeating questions for details that have already been collected.
            - Ask question in group of 4 required_fields.
        5. Final Validation: After going through the list, confirm that all details have been collected.
            - If all required information is available, return: "ALL DATA COLLECTED"
            - If there are still missing pieces of information, generate a question targeting those fields only.
        Now, proceed step-by-step and analyze {customer_info}.
        Keep a conversational tone.
        """

        self.account_extractor_instructions = """You are tasked with extracting the user details from the customer's response. 
            If values are not present, return None.
            customer response: {user_message}"""

        self.summarise_loan_agreement_instructions = """
        You will be given different passages from a loan agreement document one by one. 
        Act as a financial advisor and provide a summary of the following text. 
        Your result must be detailed but brief. Only focus on the key points and important details.
        When summarizing, directly dive into the descriptions from the text without using introductory phrases.
        Directly address the loan details, important terms and conditions, and repayment stategies, encapsulating the essence and 
        significant details from the text. Keep a conversational tone.
        Passage:
        ```{text}```
        SUMMARY:
        """

        self.summarise_loan_agreement_instructions_hi = """
        You will be given different passages from a loan agreement document one by one. 
        Act as a financial advisor and provide a summary of the following text in Hindi. 
        Your result must be detailed but brief. Only focus on the key points and important details.
        When summarizing, directly dive into the descriptions from the text without using introductory phrases.
        Directly address the loan details, important terms and conditions, and repayment stategies, encapsulating the essence and 
        significant details from the text. Keep a conversational tone.
        Passage:
        ```{text}```
        SUMMARY:
        """

        self.qna_instructions = """
        Given is the text from loan agreement document.
        Act as a financial advisor and try to answer the user query about the loan agreement strictly based on the text provided. 
        Your result should be precise, to the point and detailed.
        Keep a conversational tone while answering the query. 
        If the user query cannot be answered from the text provided, "Sorry, I cannot comment on that. I can only answer your queries regarding the loan agreement document.".
        Text:
        ```{loan_agreement_text}```
        User Query: {user_query}.
        Answer:
        """

        self.qna_instructions_hi = """
        Given is the text from loan agreement document.
        Act as a financial advisor and try to answer the user query about the loan agreement strictly based on the text provided. 
        Answer should be generated in Hindi.
        Your result should be precise, to the point and detailed.
        Output should be in maximum 200 characters including spaces and special characters. Keep a conversational tone while answering the query. 
        If the user query cannot be answered from the text provided, "Sorry, I cannot comment on that. I can only answer your queries regarding the loan agreement document.".
        Text:
        ```{loan_agreement_text}```
        User Query: {user_query}.
        Answer:
        """

        self.user_intent_1_instructions = """User message: {user_message}.
        Classify the user_message provided above between two categories: ["question", "acknowledgment"]. Respond in one word."""

        self.user_intent_2_instructions = """You are a helpful assistant that understands user intent.
        A user has provided a message related to an offer they were shown. Output should strictly be one of the following:
        1. "proceed_with_current_offer" - If the user likes the offer and wants to proceed with it.
        2. "get_more_offers" - If the user wants to explore other offers.
        3. "get_more_details" - If the user has doubts or questions about the offer and needs clarification.
        Analyze the following sentence and provide your response with one of the options above.
        user_message: {user_message}.
        Respond in one word."""

        self.offer_summary_instructions = """Offer details: {offer_list}.
        Act as a financial adviser. From the credit offer list provided above, help customer understand each credit offer in simple paragraph focusing on important information. 
        Output should be in maximum 200 english characters including spaces and special characters. Keep the tone conversational."""

        self.offer_summary_instructions_hi = """Offer details: {offer_list}.
        Act as a financial adviser. From the credit offer list provided above, help customer understand each credit offer in simple paragraph focusing on important information. 
        Keep the tone conversational and generate output in Hindi. Avoid any salutations or greetings.
        Output should be in maximum 200 characters including spaces and special characters."""

        self.offer_qna_instructions = """Offer details : {offer_list}.
        Try to answer the user_query in brief based on the offer details. If applicable, provide the details from the offer details above. Keep the tone conversational.
        user_query: {user_query}"""

        self.offer_qna_instructions_hi = """Offer details : {offer_list}.
        Try to answer the user_query in brief based on the offer details. Keep the tone conversational and generate output in Hindi. Avoid any salutations or greetings. If applicable, provide the details from the offer details above.
        Output should be in maximum 200 characters including spaces and special characters.
        user_query: {user_query}"""
