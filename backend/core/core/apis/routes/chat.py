from fastapi import FastAPI, WebSocket, APIRouter, WebSocketDisconnect, UploadFile, File
from typing import List
from core.controllers.chat_controller import AutogenChat, UserInteractions
from core.crud.user_interaction_crud import CRUDUserInteractions
import asyncio
import openai
import os
import uuid

openai.api_key = os.environ["OPENAI_API_KEY"]
# openai.log='debug'
chat_router = APIRouter()


class ConnectionManager:
    def __init__(self):
        self.active_connections: list[AutogenChat] = []

    async def connect(self, autogen_chat: AutogenChat):
        await autogen_chat.websocket.accept()
        self.active_connections.append(autogen_chat)

    async def disconnect(self, autogen_chat: AutogenChat):
        autogen_chat.client_receive_queue.put_nowait("DO_FINISH")
        print(f"autogen_chat {autogen_chat.chat_id} disconnected")
        self.active_connections.remove(autogen_chat)


manager = ConnectionManager()


async def send_to_client(autogen_chat: AutogenChat):
    while True:
        reply = await autogen_chat.client_receive_queue.get()
        if reply and reply == "DO_FINISH":
            autogen_chat.client_receive_queue.task_done()
            break
        await autogen_chat.websocket.send_text(reply)
        autogen_chat.client_receive_queue.task_done()
        await asyncio.sleep(0.05)


async def receive_from_client(autogen_chat: AutogenChat):
    while True:
        data = await autogen_chat.websocket.receive_text()
        if data and data == "DO_FINISH":
            await autogen_chat.client_receive_queue.put("DO_FINISH")
            await autogen_chat.client_sent_queue.put("DO_FINISH")
            break
        await autogen_chat.client_sent_queue.put(data)
        await asyncio.sleep(0.05)


# @chat_router.websocket("/ws/{chat_id}")
# async def websocket_endpoint(websocket: WebSocket, chat_id: str):
#     try:
#         autogen_chat = AutogenChat(chat_id=chat_id, websocket=websocket)
#         await manager.connect(autogen_chat)
#         # data = await autogen_chat.websocket.receive_text()
#         data = "Hi Good morning!"
#         future_calls = asyncio.gather(
#             send_to_client(autogen_chat), receive_from_client(autogen_chat)
#         )
#         await autogen_chat.start(data)
#         print("DO_FINISHED")
#     except Exception as e:
#         print("ERROR", str(e))
#     finally:
#         try:
#             await manager.disconnect(autogen_chat)
#         except:
#             pass


# @chat_router.websocket("/ws/{chat_id}")
# async def websocket_endpoint(websocket: WebSocket, chat_id: str):
#     # await websocket.accept()
#     try:
#         user_details = CRUDUserInteractions().read(interaction_id=chat_id)
#         autogen_chat = AutogenChat(chat_id=chat_id, websocket=websocket)
#         await manager.connect(autogen_chat)
#         # data = await autogen_chat.websocket.receive_text()
#         user_metadata = user_details.get("interaction_metadata")
#         if user_details:
#             data = f"Hi! Here are the user details: {user_metadata}. Start the conversation."
#         else:
#             data = "Hi!"
#         future_calls = asyncio.gather(
#             send_to_client(autogen_chat), receive_from_client(autogen_chat)
#         )
#         await autogen_chat.start(data)
#         print("DO_FINISHED")
#     except Exception as e:
#         print("ERROR", str(e))
#     finally:
#         try:
#             await manager.disconnect(autogen_chat)
#         except:
#             pass
@chat_router.websocket("/fill_form/{chat_id}")
async def websocket_endpoint(websocket: WebSocket, chat_id: str):
    # await websocket.accept()
    try:
        print(f"{chat_id=}")
        # user_details = CRUDUserInteractions().read(interaction_id=chat_id)
        # print(f"{user_details=}")
        autogen_chat = AutogenChat(chat_id=chat_id, websocket=websocket)
        await manager.connect(autogen_chat)
        # data = await autogen_chat.websocket.receive_text()
        # user_metadata = user_details.get("interaction_metadata")
        # if user_details:
        #     data = f"Hi! Here are the user details: {user_metadata}. Start the conversation."
        # else:
        #     data = "Hi!"
        data = "Hello there! Thank you for visiting CliniQ360. I am user e-Sahayak and will help you fill the loan application form. Do you want to start?"
        future_calls = asyncio.gather(
            send_to_client(autogen_chat), receive_from_client(autogen_chat)
        )
        await autogen_chat.start(data)
        print("DO_FINISHED")
    except Exception as e:
        print("ERROR", str(e))
    finally:
        try:
            await manager.disconnect(autogen_chat)
        except:
            pass


@chat_router.websocket("/fill_form_assisted/{chat_id}")
async def websocket_endpoint(websocket: WebSocket, chat_id: str):
    # await websocket.accept()
    try:
        user_details = CRUDUserInteractions().read(interaction_id=chat_id)
        print(f"{user_details=}")
        autogen_chat = AutogenChat(chat_id=chat_id, websocket=websocket)
        await manager.connect(autogen_chat)
        # data = await autogen_chat.websocket.receive_text()
        user_metadata = user_details.get("interaction_metadata")
        data = (
            f"Hi! Here are the user details: {user_metadata}. Start the conversation."
        )
        # data = "Hi!"
        future_calls = asyncio.gather(
            send_to_client(autogen_chat), receive_from_client(autogen_chat)
        )
        await autogen_chat.start(data)
        print("DO_FINISHED")
    except Exception as e:
        print("ERROR", str(e))
    finally:
        try:
            await manager.disconnect(autogen_chat)
        except:
            pass


# @chat_router.websocket("/ws1/{chat_id}")
# async def websocket_with_endpoint(websocket: WebSocket, chat_id: str, user_details):
#     # await websocket.accept()
#     try:
#         autogen_chat = AutogenChat(chat_id=chat_id, websocket=websocket)
#         await manager.connect(autogen_chat)
#         # data = await autogen_chat.websocket.receive_text()
#         data = f"Hi! Here are the user details: {user_details}. Start the conversation."
#         future_calls = asyncio.gather(
#             send_to_client(autogen_chat), receive_from_client(autogen_chat)
#         )
#         await autogen_chat.start(data)
#         print("DO_FINISHED")
#     except Exception as e:
#         print("ERROR", str(e))
#     finally:
#         try:
#             await manager.disconnect(autogen_chat)
#         except:
#             pass


@chat_router.get("/user_details/{chat_id}")
def get_user_details(chat_id: str):
    try:
        return UserInteractions().get_interaction_details(interaction_id=chat_id)
    except Exception as e:
        print("ERROR", str(e))


@chat_router.post("/user_details/extract/{chat_id}")
async def extract_user_details(chat_id: str, files: List[UploadFile]):
    try:
        return await UserInteractions().extract_user_details(
            interaction_id=chat_id, files=files
        )
    except Exception as e:
        print("ERROR", str(e))


@chat_router.post("/user_details/store/{chat_id}")
async def store_user_details(chat_id: str, user_details: dict):
    try:
        return CRUDUserInteractions().create(
            **{"interaction_id": chat_id, "interaction_metadata": user_details}
        )
    except Exception as e:
        print("ERROR", str(e))
