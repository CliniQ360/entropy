import autogen
from autogen import (
    Agent,
    AssistantAgent,
    ConversableAgent,
    UserProxyAgent,
    GroupChat,
    GroupChatManager,
)
import instructor
from core.utils.user_proxy_webagent import UserProxyWebAgent
import asyncio
import json
from typing import Optional, List, Union
from core.crud.user_interaction_crud import CRUDUserInteractions
from core.utils.openai_helper import openAI_vision_inference
import time, os
from openai import OpenAI
from pydantic import BaseModel, Field
from enum import Enum

config_list = [
    {
        "model": "gpt-4o-2024-08-06",
    }
]
config_list_v1 = [
    {"model": "gpt-4o-2024-08-06", "model_client_cls": "InstructorModelClient"}
]


# class Gender(str, Enum):
#     Male = "Male"
#     Female = "Female"
#     Others = "Others"


# class EmploymentType(str, Enum):
#     Salaried = "Salaried"
#     SelfEmployment = "Self Employment"


# class EndUse(str, Enum):
#     ConsumerDurablePurchase = "ConsumerDurablePurchase"
#     Education = "Education"
#     Travel = "Travel"
#     Health = "Health"
#     Other = "Other"


class UserDetails(BaseModel):
    first_name: str = Field(None, description="First name of the user")
    last_name: str = Field(None, description="Last name of the user")
    date_of_birth: str = Field(
        None, description="date of birth of the user in DD/MM/YYYY format"
    )
    # gender: Gender = Field(None, description="Gender of the user")
    gender: str = Field(None, description="Gender of the user")
    mobile_number: str = Field(None, description="Mobile number of the user")
    email: str = Field(None, description="Email id of the user")
    pan_number: str = Field(None, description="PAN card number for the user")
    address_line_1: str = Field(
        None, description="User address line 1 from the conversation"
    )
    address_line_2: str = Field(
        None, description="User address line 2 from the conversation"
    )
    city: str = Field(None, description="User city name from the conversation")
    state: str = Field(None, description="User state name from the conversation")
    # employment_type: EmploymentType = Field(None, description="Type of employment")
    employment_type: str = Field(None, description="Type of employment")
    employer_name: str = Field(None, description="Name of the employer for the user")
    official_email: str = Field(None, description="Official email id with the employer")
    income: str = Field(None, description="Annual income of the user")
    # end_use: EndUse = Field(
    #     None, description="The reason user wanted to avail for loan"
    # )
    end_use: str = Field(None, description="The reason user wanted to avail for loan")
    message: str = Field(None, description="Raw message to the user from agent")


class InstructorModelClient:
    """
    An Instructor client to use with AutoGen.
    """

    def __init__(self, config, **kwargs):
        print(f"InstructorClient config: {config}")

    def create(self, params):
        # Create a data response class
        # adhering to AutoGen's ModelClientResponseProtocol

        request_time = int(time.time())

        client = instructor.from_openai(
            OpenAI(
                # base_url=my_url,
                api_key=os.environ["OPENAI_API_KEY"],  # required, but unused
            ),
            mode=instructor.Mode.JSON,
        )

        # we are setting this here, for testing... some way to pass this would be better.
        # response_model = None
        response_model = UserDetails

        # complete_response contains the full response Autogen needs
        answer, complete_response = client.chat.completions.create_with_completion(
            model="gpt-4o-2024-08-06",
            messages=params["messages"],
            response_model=response_model,
            max_retries=4,
        )

        return complete_response

    # these are to fill out the Class, and required by Autogen
    def message_retrieval(self, response):
        choices = response.choices
        return [choice.message.content for choice in choices]

    def cost(self, response) -> float:
        return 0

    @staticmethod
    def get_usage(response):
        return {}


#############################################################################################
# this is where you put your Autogen logic, here I have a simple 2 agents with a function call
class AutogenChat:
    def __init__(self, chat_id=None, websocket=None):
        self.websocket = websocket
        self.chat_id = chat_id
        self.client_sent_queue = asyncio.Queue()
        self.client_receive_queue = asyncio.Queue()
        self.llm_config_assistant = {
            "temperature": 0,
            "config_list": config_list,
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
                    "name": "store_user_information",
                    "description": "Once all the user personal information is collected, store into a json file",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "first_name": {
                                "type": "string",
                                "description": "User first name from the conversation",
                            },
                            "last_name": {
                                "type": "string",
                                "description": "User lat name from the conversation",
                            },
                            "gender": {
                                "type": "string",
                                "description": "User gender from the conversation",
                            },
                            "mobile_number": {
                                "type": "string",
                                "description": "User mobile number from the conversation",
                            },
                            "email": {
                                "type": "string",
                                "description": "User email address from the conversation",
                            },
                            "date_of_birth": {
                                "type": "string",
                                "description": "User date of birth in DD/MM/YYYY format from the conversation",
                            },
                        },
                        "required": [
                            "first_name",
                            "last_name",
                            "gender",
                            "mobile_number",
                            "email",
                            "date_of_birth",
                        ],
                    },
                },
                {
                    "name": "store_address_information",
                    "description": "Once all the address details are collected, store into a json file",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "address_line_1": {
                                "type": "string",
                                "description": "User address line 1 from the conversation",
                            },
                            "address_line_1": {
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
                        },
                        "required": ["address_line_1", "city", "state"],
                    },
                },
            ],
        }
        self.llm_config_proxy = {
            "temperature": 0,
            "config_list": config_list,
        }
        self.instructor_llm_config = {
            "temperature": 0,
            "config_list": config_list_v1,
        }
        self.assistant = autogen.AssistantAgent(
            name="assistant",
            llm_config=self.llm_config_assistant,
            system_message="""You are a helpful assistant, help the user find the status of his order. 
            Only use the tools provided to do the search. Only execute the search after you have all the information needed. 
            When you ask a question, always add the word "BRKT"" at the end.
            When you responde with the status add the word TERMINATE""",
        )
        self.user_details_extractor = autogen.AssistantAgent(
            name="user_details_extractor",
            llm_config=self.llm_config_assistant,
            system_message="""You are a helpful assistant, who extracts user deatails from the database.
            At the start of conversation, you will receive the interaction_id.
            Call the function get_user_details with the interaction_id to get the user details and pass it to the other agent""",
        )
        self.sahayak_agent = ConversableAgent(
            name="sahayak_agent",
            system_message="""You are a helpful assistant. Your goal is to help the user fill the load application form. To fill the form, you have to collect following details from user:
            Personal Details: First Name, Last Name, Date of Birth, Gender, email address, mobile number, PAN number.
            Address Details: Address Line 1, Address Line 2, City, State.
            Professional Details: Type of employment, Employer name, Annual Salary,official email id.
            Loan Details: Reason to avail for loan.
            Ask the user to provide all these details.
            Once all the personal details are collected, store the information.
            Once all the address details are collected, store address information.
            Once all the required information is collected, show it to the user to verify once.
            Respond to the user in JSON format specified.""",
            llm_config=self.instructor_llm_config,
            human_input_mode="NEVER",
        )
        self.sahayak_agent.register_model_client(model_client_cls=InstructorModelClient)
        # self.function_executor_agent = UserProxyAgent(
        #     name="function_executor_agent",
        #     system_message=self.function_executor_agent_prompt,
        #     human_input_mode="NEVER",
        #     max_consecutive_auto_reply=10,
        #     is_termination_msg=lambda x: x.get("content", "")
        #     and x.get("content", "").rstrip().endswith("TERMINATE"),
        #     code_execution_config=False,
        #     function_map={
        #         "store_user_information": self.store_user_information,
        #         "store_address_information": self.store_address_information,
        #     },
        # )
        self.function_executor_agent = AssistantAgent(
            name="function_executor_agent",
            system_message="""This agent executes all functions for the group. 
            Once required user details are collected from the user conversation, this agent executes the 
            function to store the information to the JSON file.""",
            llm_config=self.llm_config_assistant,
        )
        self.function_executor_agent.register_function(
            function_map={
                "store_user_information": self.store_user_information,
                "store_address_information": self.store_address_information,
                # "get_user_details": self.get_user_details,
            }
        )
        self.user_proxy = UserProxyWebAgent(
            name="user_proxy", human_input_mode="ALWAYS"
        )
        self.agent_list = [
            self.user_proxy,
            self.sahayak_agent,
            self.function_executor_agent,
            # self.restructure_assistant,
        ]
        self.groupchat = GroupChat(
            agents=self.agent_list,
            messages=[],
            admin_name="sahayak_agent",
            max_round=50,
            speaker_selection_method="auto",
            select_speaker_message_template=f"""You are in a role play game. The following roles are available:
                user_input, user_input_respond and function_executor.
                Read the following conversation.
                Then select the next role from {self.agent_list} to play. Only return the role.""",
        )
        self.manager = GroupChatManager(
            groupchat=self.groupchat,
            llm_config=self.llm_config_proxy,
        )
        self.user_proxy.set_queues(self.client_sent_queue, self.client_receive_queue)

    async def start(self, message):
        await self.user_proxy.a_initiate_chat(
            self.manager, clear_history=True, message=message
        )

    def get_user_details(self, interaction_id):
        user_details = CRUDUserInteractions().read(interaction_id=interaction_id)
        return user_details

    def store_user_information(
        self, first_name, last_name, gender, mobile_number, email, date_of_birth
    ):
        user_json = {
            "first_name": first_name,
            "last_name": last_name,
            "gender": gender,
            "mobile_number": mobile_number,
            "email": email,
            "date_of_birth": date_of_birth,
        }
        interaction_obj = CRUDUserInteractions().read(interaction_id=self.chat_id)
        if interaction_obj:
            interaction_metadata = interaction_obj.get("interaction_metadata")
            interaction_metadata.update(user_json)
            CRUDUserInteractions().update(
                **{
                    "interaction_id": self.chat_id,
                    "interaction_metadata": interaction_metadata,
                }
            )
        else:
            interaction_metadata = user_json
            CRUDUserInteractions().create(
                **{
                    "interaction_id": self.chat_id,
                    "interaction_metadata": interaction_metadata,
                }
            )

    def store_address_information(
        self, address_line_1, city, state, address_line_2=None
    ):
        # Convert user details to JSON format
        user_json = {
            "address_line_1": address_line_1,
            "address_line_2": address_line_2,
            "city": city,
            "state": state,
        }
        interaction_obj = CRUDUserInteractions().read(interaction_id=self.chat_id)
        if interaction_obj:
            interaction_metadata = interaction_obj.get("interaction_metadata")
            interaction_metadata.update(user_json)
            CRUDUserInteractions().update(
                **{
                    "interaction_id": self.chat_id,
                    "interaction_metadata": interaction_metadata,
                }
            )
        else:
            interaction_metadata = user_json
            CRUDUserInteractions().create(
                **{
                    "interaction_id": self.chat_id,
                    "interaction_metadata": interaction_metadata,
                }
            )


class UserInteractions:
    def __init__(self) -> None:
        self.CRUDUserInteractions = CRUDUserInteractions()

    def get_interaction_details(self, interaction_id: str):
        try:
            return self.CRUDUserInteractions.read(interaction_id=interaction_id)
        except Exception as error:
            print(
                f"Error in UserInteraction.get_interaction_details function: {error=}"
            )

    async def extract_user_details(self, interaction_id, files):
        document_list = []
        for document in files:
            document_data = await document.read()
            document_list.append(document_data)
        return openAI_vision_inference(
            image_bytes=document_list,
            prompt="Extract all the user information from the image attached.",
        )
