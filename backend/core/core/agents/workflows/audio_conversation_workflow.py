from langgraph.graph import START, END, StateGraph

from psycopg_pool import ConnectionPool
from langgraph.checkpoint.memory import MemorySaver
from core.agents.functions.customer_details_collection import *
from core.agents.functions.offer_submission import *
from core.agents.functions.offer_selection import *
import os

DB_URI = os.getenv("DB_URI")


def build_workflow():
    builder = StateGraph(SahayakState)
    builder.add_node("welcome_message", welcome_message)
    builder.add_node("human_document_upload_feedback", human_document_upload_feedback)
    builder.add_node("process_user_document", process_user_document)
    builder.add_node("generate_questions", generate_questions)
    builder.add_node("human_feedback", human_feedback)
    builder.add_node("extract_user_details", extract_user_details)
    builder.add_node("verify_user_details", verify_user_details)
    builder.add_node("human_verification_feedback", human_verification_feedback)
    builder.add_node("submit_form_ack", submit_form_ack)
    builder.add_node("submit_form", submit_form)
    builder.add_node("collect_updated_details", collect_updated_details)
    builder.add_node("human_update_feedback", human_update_feedback)
    builder.add_node("resume_after_aa_redirect", resume_after_aa_redirect)
    builder.add_node("send_ack", send_ack)
    builder.add_node("approval_pending", approval_pending)
    builder.add_node("human_recheck_approval", human_recheck_approval)
    builder.add_node("refresh_offer", refresh_offer)
    builder.add_node("human_refreh_offer", human_refreh_offer)
    builder.add_node("get_offers", get_offers)
    builder.add_node("summarise_offers", summarise_offers)
    builder.add_node("human_selection", human_selection)
    builder.add_node("answer_user_query", answer_user_query)
    builder.add_node("select_offer", select_offer)
    builder.add_node("human_loan_amount_selection", human_loan_amount_selection)
    builder.add_node(
        "human_invalid_loan_amount_selection", human_invalid_loan_amount_selection
    )
    builder.add_node("submit_loan_amount", submit_loan_amount)
    builder.add_node("resume_after_kyc_redirect", resume_after_kyc_redirect)
    builder.add_node("send_kyc_ack", send_kyc_ack)
    builder.add_node("kyc_approval_pending", kyc_approval_pending)
    builder.add_node(
        "generate_account_details_questions", generate_account_details_questions
    )
    builder.add_node("human_account_details_feedback", human_account_details_feedback)
    builder.add_node("extract_user_account_details", extract_user_account_details)
    # builder.add_node("verify_user_account_details", verify_user_account_details)
    # builder.add_node(
    #     "human_account_details_verification_feedback",
    #     human_account_details_verification_feedback,
    # )
    builder.add_node("submit_account_details_form", submit_account_details_form)
    builder.add_node("resume_after_emdt_redirect", resume_after_emdt_redirect)
    builder.add_node("emdt_approval_pending", emdt_approval_pending)
    builder.add_node("send_emdt_ack", send_emdt_ack)
    builder.add_node("summarise_loan_tnc", summarise_loan_tnc)
    builder.add_node("human_loan_tnc_feedback", human_loan_tnc_feedback)
    builder.add_node("answer_tnc_query", answer_tnc_query)
    builder.add_node("resume_loan_agreement_signing", resume_loan_agreement_signing)
    builder.add_node("loan_agreement_signing_pending", loan_agreement_signing_pending)
    builder.add_node("confirm_loan", confirm_loan)
    builder.add_node("finalize_offer", finalize_offer)

    # Add edges
    builder.add_edge(START, "welcome_message")
    builder.add_edge("welcome_message", "human_document_upload_feedback")
    builder.add_conditional_edges(
        "human_document_upload_feedback",
        is_document_present,
        ["process_user_document", "generate_questions"],
    )
    builder.add_edge("process_user_document", "generate_questions")
    builder.add_conditional_edges(
        "generate_questions", should_verify, ["verify_user_details", "human_feedback"]
    )
    builder.add_edge("human_feedback", "extract_user_details")
    builder.add_edge("verify_user_details", "human_verification_feedback")
    builder.add_edge("extract_user_details", "generate_questions")
    builder.add_conditional_edges(
        "human_verification_feedback",
        should_submit,
        ["submit_form_ack", "collect_updated_details"],
    )
    builder.add_edge("collect_updated_details", "human_update_feedback")
    builder.add_edge("human_update_feedback", "extract_user_details")
    builder.add_edge("submit_form_ack", "submit_form")
    builder.add_edge("submit_form", "resume_after_aa_redirect")
    builder.add_conditional_edges(
        "resume_after_aa_redirect", is_aa_approved, ["send_ack", "approval_pending"]
    )
    builder.add_edge("approval_pending", "human_recheck_approval")
    builder.add_edge("human_recheck_approval", "resume_after_aa_redirect")
    builder.add_edge("send_ack", "refresh_offer")
    builder.add_conditional_edges(
        "refresh_offer", is_offer_received, ["get_offers", "human_refreh_offer"]
    )
    builder.add_edge("human_refreh_offer", "refresh_offer")
    builder.add_edge("get_offers", "summarise_offers")
    builder.add_edge("summarise_offers", "human_selection")
    builder.add_conditional_edges(
        "human_selection", user_intent, ["answer_user_query", "select_offer"]
    )
    builder.add_edge("answer_user_query", "human_selection")
    builder.add_edge("select_offer", "human_loan_amount_selection")
    builder.add_conditional_edges(
        "human_loan_amount_selection",
        is_amount_valid,
        ["submit_loan_amount", "human_invalid_loan_amount_selection"],
    )
    builder.add_edge(
        "human_invalid_loan_amount_selection", "human_loan_amount_selection"
    )
    builder.add_edge("submit_loan_amount", "resume_after_kyc_redirect")
    builder.add_conditional_edges(
        "resume_after_kyc_redirect",
        is_kyc_approved,
        ["send_kyc_ack", "kyc_approval_pending"],
    )
    builder.add_edge("kyc_approval_pending", "resume_after_kyc_redirect")
    builder.add_edge("send_kyc_ack", "generate_account_details_questions")
    builder.add_edge(
        "generate_account_details_questions", "human_account_details_feedback"
    )

    # builder.add_conditional_edges(
    #     "generate_account_details_questions",
    #     should_verify_account_details,
    #     ["verify_user_account_details", "human_account_details_feedback"],
    # )
    builder.add_edge("human_account_details_feedback", "extract_user_account_details")
    # builder.add_edge(
    #     "verify_user_account_details", "human_account_details_verification_feedback"
    # )
    # builder.add_conditional_edges(
    #     "human_account_details_verification_feedback",
    #     should_submit_account_details,
    #     ["submit_account_details_form", "extract_user_account_details"],
    # )
    # builder.add_edge(
    #     "extract_user_account_details", "generate_account_details_questions"
    # )
    builder.add_edge("extract_user_account_details", "submit_account_details_form")
    builder.add_edge("submit_account_details_form", "resume_after_emdt_redirect")
    builder.add_conditional_edges(
        "resume_after_emdt_redirect",
        is_emdt_approved,
        ["send_emdt_ack", "emdt_approval_pending"],
    )
    builder.add_edge("emdt_approval_pending", "resume_after_emdt_redirect")

    builder.add_edge("send_emdt_ack", "resume_loan_agreement_signing")
    builder.add_conditional_edges(
        "resume_loan_agreement_signing",
        is_loan_agreement_signed,
        ["loan_agreement_signing_pending", "confirm_loan"],
    )
    builder.add_edge("loan_agreement_signing_pending", "resume_loan_agreement_signing")
    # builder.add_edge("confirm_loan", "summarise_loan_tnc")
    builder.add_edge("confirm_loan", "summarise_loan_tnc")
    builder.add_edge("summarise_loan_tnc", "finalize_offer")
    builder.add_edge("finalize_offer", "human_loan_tnc_feedback")
    builder.add_conditional_edges(
        "human_loan_tnc_feedback",
        user_intent_1,
        ["answer_tnc_query", END],
    )
    builder.add_edge("answer_tnc_query", "human_loan_tnc_feedback")
    # builder.add_edge("send_emdt_ack", "summarise_loan_tnc")
    # builder.add_edge("summarise_loan_tnc", "human_loan_tnc_feedback")
    # builder.add_conditional_edges(
    #     "human_loan_tnc_feedback",
    #     user_intent_1,
    #     ["answer_tnc_query", "loan_agreement_signing"],
    # )
    # builder.add_edge("answer_tnc_query", "human_loan_tnc_feedback")
    # builder.add_edge("loan_agreement_signing", "resume_loan_agreement_signing")
    # builder.add_conditional_edges(
    #     "resume_loan_agreement_signing",
    #     is_loan_agreement_signed,
    #     ["loan_agreement_signing_pending", "confirm_loan"],
    # )
    # builder.add_edge("loan_agreement_signing_pending", "resume_loan_agreement_signing")
    # builder.add_edge("confirm_loan", END)
    return builder
    # Compile
