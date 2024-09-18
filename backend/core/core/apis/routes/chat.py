from fastapi import (
    FastAPI,
    WebSocket,
    APIRouter,
    WebSocketDisconnect,
    UploadFile,
    File,
    HTTPException,
)
from typing import List
from core.controllers.chat_controller import AutogenChat
from core.controllers.user_interaction_controller import UserInteractions
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
        # print(f"{user_details=}")
        autogen_chat = AutogenChat(chat_id=chat_id, websocket=websocket)
        await manager.connect(autogen_chat)
        # data = await autogen_chat.websocket.receive_text()
        # user_metadata = user_details.get("interaction_metadata")
        # if user_details:
        #     data = f"Hi! Here are the user details: {user_metadata}. Start the conversation."
        # else:
        #     data = "Hi!"
        data = f"Interaction_id: {chat_id}, message: Hello there! Thank you for visiting CliniQ360. I am user e-Sahayak and will help you fill the loan application form. Do you want to start?"
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
        user_details = UserInteractions().get_interaction_details(
            interaction_id=chat_id
        )
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
        return UserInteractions().create_interaction_details(
            interaction_id=chat_id, user_details=user_details
        )
    except Exception as e:
        print("ERROR", str(e))


from pydantic import BaseModel


class ChatMessage(BaseModel):
    chat_id: str
    message: str


class ChatInitResponse(BaseModel):
    chat_id: str
    message: str


@chat_router.post("/initialize_chat", response_model=ChatInitResponse)
async def initialize_chat():
    try:
        chat_id = str(uuid.uuid4())
        autogen_chat = AutogenChat(chat_id=chat_id)
        await manager.connect(autogen_chat)
        data = "Hi Good morning!"
        asyncio.create_task(autogen_chat.start(data))
        response_message = await asyncio.wait_for(
            autogen_chat.client_receive_queue.get(), timeout=60
        )
        return {"chat_id": chat_id, "message": response_message}
    except asyncio.TimeoutError:
        raise HTTPException(
            status_code=408, detail={"message": "Request timed out", "status_code": 408}
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, detail={"message": str(e), "status_code": 500}
        )


@chat_router.post("/send_and_receive_message")
async def send_and_receive_message(chat_message: ChatMessage):
    chat_id = chat_message.chat_id
    message = chat_message.message
    autogen_chat = manager.active_connections.get(chat_id)
    if not autogen_chat:
        raise HTTPException(
            status_code=404, detail={"message": "Chat ID not found", "status_code": 404}
        )

    # Send the message
    await autogen_chat.client_sent_queue.put(message)

    # Wait for the response
    try:
        response_message = await asyncio.wait_for(
            autogen_chat.client_receive_queue.get(), timeout=60
        )
        autogen_chat.client_receive_queue.task_done()
        return {"message": response_message}
    except asyncio.TimeoutError:
        raise HTTPException(
            status_code=408,
            detail={"message": "Timeout waiting for message", "status_code": 408},
        )


@chat_router.post("/disconnect/{chat_id}")
async def disconnect(chat_id: str):
    try:
        await manager.disconnect(chat_id)
        return {"message": f"Disconnected from chat {chat_id}"}
    except KeyError:
        raise HTTPException(
            status_code=404, detail={"message": "Chat ID not found", "status_code": 404}
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, detail={"message": str(e), "status_code": 500}
        )
