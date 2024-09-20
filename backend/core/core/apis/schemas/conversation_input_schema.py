from pydantic import BaseModel, Field
from typing import Optional


class ConversationResume(BaseModel):
    thread_id: str
    user_message: str
    state: str
    document_upload_flag: Optional[bool] = False
    file_path_list: Optional[list] = []
