from pydantic import BaseModel, Field


class ConversationOutput(BaseModel):
    thread_id: str
    message: str
