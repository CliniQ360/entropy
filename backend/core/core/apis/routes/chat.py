from fastapi import FastAPI, WebSocket, APIRouter
from core.controllers.chat_controller import AutogenChat
import asyncio
import openai
import os

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


@chat_router.websocket("/ws/{chat_id}")
async def websocket_endpoint(websocket: WebSocket, chat_id: str):
    try:
        autogen_chat = AutogenChat(chat_id=chat_id, websocket=websocket)
        await manager.connect(autogen_chat)
        # data = await autogen_chat.websocket.receive_text()
        data = "Hi Good morning!"
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
