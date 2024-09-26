from pydantic import BaseModel, Field
from typing import List, Optional


class ConversationOutput(BaseModel):
    thread_id: str
    user_message: str = None
    agent_message: str
    next_state: str
    customer_account_details: Optional[dict]
    txn_id: Optional[str]
