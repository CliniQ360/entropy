from pydantic import BaseModel, Field


class SahayakOutput(BaseModel):
    thread_id: str
    user_message: str = None
    agent_message: str
    agent_audio_data: bytes
    next_state: str
