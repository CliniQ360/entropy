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
