import autogen
from autogen import (
    Agent,
    AssistantAgent,
    ConversableAgent,
    UserProxyAgent,
    GroupChat,
    GroupChatManager,
)

from core.utils.user_proxy_webagent import UserProxyWebAgent
import asyncio
from core.crud.user_interaction_crud import CRUDUserInteractions
import os
from core.utils.autogen_instructor import UserDetailsInstructorModelClient
from core.utils.autogen_functions import submit_form


class AutogenChat:
    def __init__(self, chat_id=None, websocket=None):
        self.model = os.environ["LANGUAGE_MODEL"]
        self.websocket = websocket
        self.chat_id = chat_id
        self.client_sent_queue = asyncio.Queue()
        self.client_receive_queue = asyncio.Queue()
        self.llm_config_assistant = {
            "temperature": 0,
            "config_list": [
                {
                    "model": self.model,
                    "model_client_cls": "UserDetailsInstructorModelClient",
                }
            ],
            "seed": 42,
            "functions": [
                {
                    "name": "get_user_details",
                    "description": "Check the user deatails from the database",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "interaction_id": {
                                "type": "string",
                                "description": "user interaction id",
                            },
                        },
                        "required": ["interaction_id"],
                    },
                },
                {
                    "name": "submit_form",
                    "description": "Submit the user form after collecting all the details",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "interaction_id": {
                                "type": "string",
                                "description": "Unique id generated for each chat",
                            },
                            "firstName": {
                                "type": "string",
                                "description": "User first name from the conversation",
                            },
                            "lastName": {
                                "type": "string",
                                "description": "User lat name from the conversation",
                            },
                            "gender": {
                                "type": "string",
                                "description": "User gender from the conversation",
                            },
                            "contactNumber": {
                                "type": "string",
                                "description": "User mobile number from the conversation",
                            },
                            "email": {
                                "type": "string",
                                "description": "User email address from the conversation",
                            },
                            "pan": {
                                "type": "string",
                                "description": "User PAN card number from the conversation",
                            },
                            "dob": {
                                "type": "string",
                                "description": "User date of birth in YYYY-MM-DD format from the conversation",
                            },
                            "addressL1": {
                                "type": "string",
                                "description": "User address line 1 from the conversation",
                            },
                            "addressL2": {
                                "type": "string",
                                "description": "User address line 2 from the conversation",
                            },
                            "city": {
                                "type": "string",
                                "description": "User city name from the conversation",
                            },
                            "state": {
                                "type": "string",
                                "description": "User state name from the conversation",
                            },
                            "pincode": {
                                "type": "string",
                                "description": "User pincode from the conversation",
                            },
                            "employmentType": {
                                "type": "string",
                                "description": "User's Type of employment from the conversation",
                            },
                            "companyName": {
                                "type": "string",
                                "description": "User's employer name from the conversation",
                            },
                            "officialEmail": {
                                "type": "string",
                                "description": "User's official email id from the conversation",
                            },
                            "income": {
                                "type": "string",
                                "description": "User's annual income from the conversation",
                            },
                            "endUse": {
                                "type": "string",
                                "description": "The reason user wanted to avail for loan",
                            },
                        },
                        "required": [
                            "firstName",
                            "lastName",
                            "gender",
                            "contactNumber",
                            "email",
                            "dob",
                            "pan",
                            "addressL1",
                            "addressL2",
                            "city",
                            "state",
                            "pincode",
                            "employmentType",
                            "companyName",
                            "officialEmail",
                            "income",
                            "endUse",
                        ],
                    },
                },
            ],
        }
        self.llm_config = {
            "temperature": 0,
            "config_list": [{"model": self.model}],
        }
        self.instructor_llm_config = {
            "temperature": 0,
            "config_list": [
                {
                    "model": self.model,
                    "model_client_cls": "UserDetailsInstructorModelClient",
                }
            ],
        }
        # self.assistant = autogen.AssistantAgent(
        #     name="assistant",
        #     llm_config=self.llm_config_assistant,
        #     system_message="""You are a helpful assistant, help the user find the status of his order.
        #     Only use the tools provided to do the search. Only execute the search after you have all the information needed.
        #     When you ask a question, always add the word "BRKT"" at the end.
        #     When you responde with the status add the word TERMINATE""",
        # )
        # self.user_details_extractor = autogen.AssistantAgent(
        #     name="user_details_extractor",
        #     llm_config=self.llm_config_assistant,
        #     system_message="""You are a helpful assistant, who extracts user deatails from the database.
        #     At the start of conversation, you will receive the interaction_id.
        #     Call the function get_user_details with the interaction_id to get the user details and pass it to the other agent""",
        # )
        self.sahayak_agent = ConversableAgent(
            name="sahayak_agent",
            system_message="""You are a helpful assistant. Your goal is to help the user fill the load application form. To fill the form, you have to collect following details from user:
            Personal Details: First Name, Last Name, Date of Birth, Gender, email address, mobile number, PAN number.
            Address Details: Address Line 1, Address Line 2, City, State.
            Professional Details: Type of employment, Employer name, Annual Salary,official email id.
            Loan Details: end_use to avail loan.
            Ask the user for all the details.
            Respond to the user in JSON format specified
            Once all the required information is collected, prompt the user to verify the collected information
            Submit the form once all details are confirmed.""",
            llm_config=self.llm_config_assistant,
            human_input_mode="NEVER",
            function_map={"submit_form": submit_form},
        )
        # self.sahayak_agent.register_function(function_map={"submit_form": submit_form})
        self.sahayak_agent.register_model_client(
            model_client_cls=UserDetailsInstructorModelClient
        )
        # self.sahayak_agent.register_function(function_map={"submit_form": submit_form})
        # self.function_executor_agent = AssistantAgent(
        #     name="function_executor_agent",
        #     system_message="""This agent executes all functions for the group.
        #     Once required user details are collected from the user conversation and user confirms the information, this agent executes the
        #     function to store the information to the database.""",
        #     llm_config=self.llm_config_assistant,
        # )
        # self.function_executor_agent.register_function(
        #     function_map={"submit_form": submit_form}
        # )
        self.user_proxy = UserProxyWebAgent(
            name="user_proxy", human_input_mode="ALWAYS"
        )
        # self.agent_list = [
        #     self.user_proxy,
        #     self.sahayak_agent,
        #     self.function_executor_agent,
        # ]
        # self.groupchat = GroupChat(
        #     agents=self.agent_list,
        #     messages=[],
        #     admin_name="sahayak_agent",
        #     max_round=50,
        #     speaker_selection_method="auto",
        #     # select_speaker_message_template=f"""You are in a role play game. The following roles are available:
        #     #     user_input, user_input_respond and function_executor.
        #     #     Read the following conversation.
        #     #     Then select the next role from {self.agent_list} to play. Only return the role.""",
        # )
        # self.manager = GroupChatManager(
        #     groupchat=self.groupchat,
        #     llm_config=self.llm_config,
        #     system_message="You are the manager of the group. You have to manage the conversation between the agents and the user.",
        # )
        self.user_proxy.set_queues(self.client_sent_queue, self.client_receive_queue)

    async def start(self, message):
        await self.user_proxy.a_initiate_chat(
            self.sahayak_agent, clear_history=True, message=message
        )

    def get_user_details(self, interaction_id):
        user_details = CRUDUserInteractions().read(interaction_id=interaction_id)
        return user_details
