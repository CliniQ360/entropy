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
        If values are not present, return None."""

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
            - If all required information is available, return: "ALL DATA COLLECTED"
            - If there are still missing pieces of information, generate a question targeting those fields only.
        Now, proceed step-by-step and analyze {customer_info}.
        """

        self.account_extractor_instructions = """You are tasked with extracting the user details from the customer's response. 
            If values are not present, return None.
            customer response: {user_message}"""

        self.account_extractor_instructions = """You are tasked with extracting the user details from the customer's response. 
            If values are not present, return None.
            customer response: {user_message}"""

        self.summarise_loan_agreement_instructions = """
        You will be given different passages from a loan agreement document one by one. 
        Act as a financial advisor and provide a summary of the following text. 
        Your result must be detailed and atleast 2 paragraphs. 
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

        self.user_intent_1_instructions = """User message: {user_message}.
        Classify the user_message provided above between two categories: ["question", "acknowledgment"]. Respond in one word."""

        self.offer_summary_instructions = """Offer details: {offer_list}.
        Act as a financial adviser. From the credit offer list provided above, help customer understand each credit offer in simple paragraph focusing on important information. 
        Keep the tone conversational and maximum 3 lines per offer."""

        self.offer_qna_instructions = """Offer details : {offer_list}.
        Try to answer the user_query in brief based on the offer details. If applicable, provide the details from the offer details above. Keep the tone conversational.
        user_query: {state.get("user_message")[-1]}"""


class GeminiPrompts:
    def __init__(self):
        self.collector_instructions = """
        You are a helpful assistant tasked with collecting customer information in order to complete a loan application form.
        The information you need to collect includes: {required_fields}
        Here’s how you should proceed:
        1. Initial Check: Analyze the already collected information provided in {customer_info} and identify missing values.
        2. Sequential Processing: For each required detail (in the list above), check if it has been provided.
            - If the detail is missing, ask the customer a follow-up question to gather the information for that specific field.
            - If the detail is present, move to the next field without prompting for it again.
        3. Handle End-of-Sequence Issues: Pay special attention to the last element in the list (Income, Address Line 2) and ensure that it is properly processed, even if it is at the end.
            - If Income or Address Line 2 is already provided, do not ask for it again. If it's missing, generate a question specifically for it.
            - Use explicit end-sequence handling to ensure that no details are missed due to an indexing or sequence error.
        4. Chain of Thought: Think step-by-step and carefully verify each piece of information before moving to the next.
            - Ask only for the missing information and avoid repeating questions for details that have already been collected.
        5. Final Validation: After going through the list, confirm that all details have been collected.
            - If all required information is available, return: "ALL DATA COLLECTED"
            - If there are still missing pieces of information, generate a question targeting those fields only.
        Now, proceed step-by-step and analyze {customer_info}.
        """

        self.extractor_instructions = """You are tasked with extracting the user details from the customer's response.
        Question asked to the user: {agent_question}.
        User response: {user_answer}.
        If values are not present, return None."""

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
        """

        self.account_extractor_instructions = """You are tasked with extracting the user details from the customer's response. 
            If values are not present, return None.
            customer response: {user_message}"""

        self.summarise_loan_agreement_instructions = """
        You will be given different passages from a loan agreement document one by one. 
        Act as a financial advisor and provide a summary of the following text. 
        Your result must be detailed and atleast 2 paragraphs. 
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

        self.user_intent_1_instructions = """User message: {user_message}.
        Classify the user_message provided above between two categories: ["question", "acknowledgment"]. Respond in one word."""

        self.offer_summary_instructions = """Offer details: {offer_list}.
        Act as a financial adviser. From the credit offer list provided above, help customer understand each credit offer in simple paragraph focusing on important information. 
        Keep the tone conversational and maximum 3 lines per offer."""

        self.offer_qna_instructions = """Offer details : {offer_list}.
        Try to answer the user_query in brief based on the offer details. If applicable, provide the details from the offer details above. Keep the tone conversational.
        user_query: {state.get("user_message")[-1]}"""
