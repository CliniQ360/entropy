import streamlit as st
import os, uuid
import time
import streamlit as st
from streamlit_extras.switch_page_button import switch_page
from external_call import APIInterface

BASE_URL = os.environ["BASE_URL"]
CORE_URL = os.environ["CORE_URL"]
DEFAULT_PAGE = "main"
SECOND_PAGE_NAME = "SAHAYAK"
THIRD_PAGE_NAME = "SAHAYAK1"


def main():
    tab1, tab2 = st.tabs(["Continue WITH document", "Continue WITHOUT document"])
    with tab1:
        with st.expander("Upload Documents", expanded=True):
            with st.form("Upload Documents", clear_on_submit=True):
                uploaded_files = st.file_uploader(
                    "Upload Documents", accept_multiple_files=True
                )
                submitted = st.form_submit_button("Upload")
                if submitted and uploaded_files is not None:
                    chat_id = str(uuid.uuid4())
                    with st.spinner("Extracting user details....."):
                        files = []
                        for uploaded_file in uploaded_files:
                            bytes_data = uploaded_file.read()
                            st.write("filename:", uploaded_file.name)
                            data = uploaded_file.getvalue()
                            files.append(
                                ("files", (uploaded_file.name, data, "image/jpeg"))
                            )
                            # files.append({"file": data})
                        response, status_code = APIInterface.post_with_params(
                            route=f"{CORE_URL}/user_details/extract/{chat_id}",
                            # params={"chat_id": chat_id},
                            files=files,
                        )
                        st.markdown(response)
                        st.session_state.user_details = response
        if "user_details" in st.session_state:
            start_interaction = st.button(
                "Fill Form", type="primary", use_container_width=True
            )
            if start_interaction:
                switch_page(SECOND_PAGE_NAME)
    with tab2:
        start_without_document = st.button(
            "Start without documents", type="primary", use_container_width=True
        )
        if start_without_document:
            switch_page(THIRD_PAGE_NAME)


if __name__ == "__main__":
    main()
