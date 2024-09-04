from openai import OpenAI
from pydantic import BaseModel
from enum import Enum
import base64

client = OpenAI()


class Gender(str, Enum):
    Male = "Male"
    Female = "Female"
    Others = "Others"


class UserDetails(BaseModel):
    first_name: str
    middle_name: str
    last_name: str
    gender: Gender
    date_of_birth: str
    address: str
    city: str
    state: str


def openAI_vision_inference(image_bytes, prompt: str, model: str = "gpt-4o-mini"):
    content = [
        {
            "type": "text",
            "text": "You are a helpful OCR agent. Extract all the user information from the images attached.",
        }
    ]
    for image_byte in image_bytes:
        base64_image = base64.b64encode(image_byte).decode("utf-8")
        image_obj = {
            "type": "image_url",
            "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"},
        }
        content.append(image_obj)
    completion = client.beta.chat.completions.parse(
        model=model,
        messages=[{"role": "user", "content": content}],
        max_tokens=300,
        response_format=UserDetails,
    )
    return completion.choices[0].message.parsed
