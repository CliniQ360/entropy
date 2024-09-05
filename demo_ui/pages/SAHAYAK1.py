import streamlit as st
import websocket
import os
import uuid
from external_call import APIInterface

BASE_URL = os.environ["BASE_URL"]
CORE_URL = os.environ["CORE_URL"]


def connect_websocket(chat_id: str):
    print("Creating WebSocket session")
    api_url = f"{BASE_URL}/fill_form/{chat_id}"
    print(f"{api_url=}")
    ws = websocket.create_connection(api_url)
    start_message = ws.recv()
    with st.chat_message("assistant"):
        st.markdown(start_message)
    st.session_state.messages.append({"role": "assistant", "content": start_message})
    st.session_state.ws = ws
    print("WebSocket connection established.")
    return ws


if "messages" not in st.session_state:
    st.session_state.messages = []


for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

if prompt := st.chat_input("Hi! How can i help you?"):
    st.chat_message("user").markdown(prompt)
    st.session_state.messages.append({"role": "user", "content": prompt})
    if "ws" in st.session_state:
        websocket = st.session_state.ws
        websocket.send(prompt)
        response = websocket.recv()
        print(response)
        with st.chat_message("assistant"):
            st.markdown(response)
        st.session_state.messages.append({"role": "assistant", "content": response})


def main():
    if "ws" not in st.session_state:
        chat_id = str(uuid.uuid4())
        st.write(f"Interaction Id: {chat_id}")
        connect_websocket(chat_id=chat_id)


if __name__ == "__main__":
    main()
