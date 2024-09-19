import instructor
from openai import OpenAI
import os
from core.utils.autogen_schemas import UserDetails


class UserDetailsInstructorModelClient:
    """
    An Instructor client to use with AutoGen.
    """

    def __init__(self, config, **kwargs):
        self.model = os.environ["LANGUAGE_MODEL"]

    def create(self, params):
        client = instructor.from_openai(
            OpenAI(api_key=os.environ["OPENAI_API_KEY"]), mode=instructor.Mode.JSON
        )
        response_model = UserDetails
        answer, complete_response = client.chat.completions.create_with_completion(
            model=self.model,
            messages=params["messages"],
            response_model=response_model,
            max_retries=4,
        )
        return complete_response

    def message_retrieval(self, response):
        choices = response.choices
        return [choice.message.content for choice in choices]

    def cost(self, response) -> float:
        return 0

    @staticmethod
    def get_usage(response):
        return {}
