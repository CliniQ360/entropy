from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# from core.apis.routes.chat import chat_router
from core.apis.routes.conversation_router import conversation_router
from core.apis.routes.sahayak_router import sahayak_router
from core.apis.routes.salahakar_router import salahakar_router


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

# app.include_router(chat_router, tags=["Chat"])
app.include_router(conversation_router, tags=["Conversation"])
app.include_router(sahayak_router, tags=["Sahayak APIs"])
app.include_router(salahakar_router, tags=["Salahakar APIs"])
