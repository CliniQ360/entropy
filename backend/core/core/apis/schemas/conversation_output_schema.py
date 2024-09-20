from pydantic import BaseModel, Field


class ConversationOutput(BaseModel):
    thread_id: str
    user_message: str = None
    agent_message: str
    next_state: str
