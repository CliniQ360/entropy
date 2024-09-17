from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.apis.routes.chat import chat_router
from core.apis.routes.conversation import conversation_router


app = FastAPI(
    title="CliniQ360 - Entropy",
    version="0.1 - Beta",
    description="Agents using AutoGen",
    redoc_url="/documentation",
)
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router, tags=["Chat"])
app.include_router(conversation_router, tags=["Conversation"])
