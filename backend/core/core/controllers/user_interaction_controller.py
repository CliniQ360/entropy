from core.utils.openai_helper import openAI_vision_inference

from core.crud.user_interaction_crud import CRUDUserInteractions


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

    def create_interaction_details(self, interaction_id, user_details):
        return CRUDUserInteractions().create(
            **{"interaction_id": interaction_id, "interaction_metadata": user_details}
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
