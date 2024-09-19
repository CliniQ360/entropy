from pydantic import BaseModel, Field


class ConversationResume(BaseModel):
    thread_id: str
    message: str
