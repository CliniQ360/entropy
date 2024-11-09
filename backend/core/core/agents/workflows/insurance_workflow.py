from langgraph.graph import START, END, StateGraph

from psycopg_pool import ConnectionPool
from langgraph.checkpoint.memory import MemorySaver
from core.agents.functions.insurance import *
import os

DB_URI = os.getenv("DB_URI")


def build_workflow():
    builder = StateGraph(SalahakarState)
    builder.add_node("welcome_message", welcome_message)
    builder.add_node("human_intent_feedback", human_intent_feedback)
    builder.add_node("extract_user_intent", extract_user_intent)
    builder.add_node("document_upload", document_upload)
    builder.add_node("human_document_upload_feedback", human_document_upload_feedback)
    builder.add_node("process_user_document", process_user_document)
    builder.add_node("generate_questions", generate_questions)
    builder.add_node("human_feedback", human_feedback)
    builder.add_node("extract_user_details", extract_user_details)
    builder.add_node("verify_user_details", verify_user_details)
    builder.add_node("human_verification_feedback", human_verification_feedback)
    builder.add_node("submit_form_ack", submit_form_ack)
    builder.add_node("submit_form", submit_form)
    builder.add_node("summarise_offers", summarise_offers)
    builder.add_node("human_selection", human_selection)
    builder.add_node("answer_user_query", answer_user_query)
    builder.add_node("select_offer", select_offer)
    builder.add_node(
        "human_plan_selection_confirmation", human_plan_selection_confirmation
    )
    builder.add_node("select_insurance", select_insurance)
    builder.add_node("get_kyc_url", get_kyc_url)
    builder.add_node("resume_after_kyc", resume_after_kyc)
    builder.add_node("kyc_approval_pending", kyc_approval_pending)
    builder.add_node("kyc_rejected", kyc_rejected)
    builder.add_node("send_kyc_ack", send_kyc_ack)
    builder.add_node("collate_buyer_info", collate_buyer_info)
    builder.add_node("generate_buyer_questions", generate_buyer_questions)
    builder.add_node("human_buyer_feedback", human_buyer_feedback)
    builder.add_node("extract_buyer_details", extract_buyer_details)
    builder.add_node("verify_buyer_details", verify_buyer_details)
    builder.add_node(
        "human_buyer_verification_feedback", human_buyer_verification_feedback
    )
    builder.add_node("submit_buyer_form", submit_buyer_form)
    builder.add_node("generate_nominee_questions", generate_nominee_questions)
    builder.add_node("human_nominee_feedback", human_nominee_feedback)
    builder.add_node("extract_nominee_details", extract_nominee_details)
    builder.add_node("verify_nominee_details", verify_nominee_details)
    builder.add_node(
        "human_nominee_verification_feedback", human_nominee_verification_feedback
    )
    builder.add_node("submit_nominee_form", submit_nominee_form)
    builder.add_node("confirm_offer", confirm_offer)

    # Add edges
    builder.add_edge(START, "welcome_message")
    builder.add_edge("welcome_message", "human_intent_feedback")
    builder.add_edge("human_intent_feedback", "extract_user_intent")
    builder.add_edge("extract_user_intent", "document_upload")
    builder.add_edge("document_upload", "human_document_upload_feedback")
    builder.add_edge("human_document_upload_feedback", "process_user_document")
    builder.add_edge("process_user_document", "generate_questions")
    builder.add_conditional_edges(
        "generate_questions", should_verify, ["verify_user_details", "human_feedback"]
    )
    builder.add_edge("human_feedback", "extract_user_details")
    builder.add_edge("extract_user_details", "generate_questions")
    builder.add_edge("verify_user_details", "human_verification_feedback")
    builder.add_conditional_edges(
        "human_verification_feedback",
        should_submit,
        ["submit_form_ack", "extract_user_details"],
    )
    builder.add_edge("submit_form_ack", "submit_form")
    builder.add_edge("submit_form", "summarise_offers")
    builder.add_edge("summarise_offers", "human_selection")
    builder.add_conditional_edges(
        "human_selection", user_intent, ["answer_user_query", "select_offer"]
    )
    builder.add_edge("answer_user_query", "human_selection")
    builder.add_edge("select_offer", "human_plan_selection_confirmation")
    builder.add_edge("human_plan_selection_confirmation", "select_insurance")
    builder.add_edge("select_insurance", "get_kyc_url")
    builder.add_edge("get_kyc_url", "resume_after_kyc")
    builder.add_conditional_edges(
        "resume_after_kyc",
        is_kyc_approved,
        ["send_kyc_ack", "kyc_approval_pending", "kyc_rejected"],
    )
    builder.add_edge("kyc_rejected", END)
    builder.add_conditional_edges(
        "send_kyc_ack",
        is_buyer_info_present,
        ["collate_buyer_info", "generate_buyer_questions"],
    )
    builder.add_edge("collate_buyer_info", "submit_buyer_form")
    builder.add_conditional_edges(
        "generate_buyer_questions",
        should_verify_buyer_details,
        ["verify_buyer_details", "human_buyer_feedback"],
    )
    builder.add_edge("human_buyer_feedback", "extract_buyer_details")
    builder.add_edge("extract_buyer_details", "generate_buyer_questions")
    builder.add_edge("verify_buyer_details", "human_buyer_verification_feedback")
    builder.add_conditional_edges(
        "human_buyer_verification_feedback",
        should_submit_buyer_details,
        ["submit_buyer_form", "extract_buyer_details"],
    )
    builder.add_edge("submit_buyer_form", "generate_nominee_questions")
    builder.add_conditional_edges(
        "generate_nominee_questions",
        should_verify_nominee_details,
        ["verify_nominee_details", "human_nominee_feedback"],
    )
    builder.add_edge("human_nominee_feedback", "extract_nominee_details")
    builder.add_edge("extract_nominee_details", "generate_nominee_questions")
    builder.add_edge("verify_nominee_details", "human_nominee_verification_feedback")
    builder.add_conditional_edges(
        "human_nominee_verification_feedback",
        should_submit_nominee_details,
        ["submit_nominee_form", "extract_nominee_details"],
    )
    builder.add_edge("submit_nominee_form", "confirm_offer")
    return builder
