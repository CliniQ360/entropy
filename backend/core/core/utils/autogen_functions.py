from core.crud.user_interaction_crud import CRUDUserInteractions
import os
from commons.external_call import APIInterface


def submit_form(**kwargs):
    user_json = {
        "first_name": kwargs.get("firstName"),
        "last_name": kwargs.get("lastName"),
        "gender": kwargs.get("gender"),
        "mobile_number": kwargs.get("contactNumber"),
        "email": kwargs.get("email"),
        "date_of_birth": kwargs.get("dob"),
        "pan_number": kwargs.get("pan"),
        "address_line_1": kwargs.get("addressL1"),
        "address_line_2": kwargs.get("addressL2"),
        "pincode": kwargs.get("pincode"),
        "city": kwargs.get("city"),
        "state": kwargs.get("state"),
        "employment_type": kwargs.get("employmentType"),
        "employer_name": kwargs.get("companyName"),
        "income": kwargs.get("income"),
        "official_email": kwargs.get("officialEmail"),
        "end_use": kwargs.get("endUse"),
    }
    interaction_obj = CRUDUserInteractions().read(
        interaction_id=kwargs.get("interaction_id")
    )
    if interaction_obj:
        interaction_metadata = interaction_obj.get("interaction_metadata")
        interaction_metadata.update(user_json)
        CRUDUserInteractions().update(
            **{
                "interaction_id": kwargs.get("interaction_id"),
                "interaction_metadata": interaction_metadata,
            }
        )
    else:
        interaction_metadata = user_json
        CRUDUserInteractions().create(
            **{
                "interaction_id": kwargs.get("interaction_id"),
                "interaction_metadata": interaction_metadata,
            }
        )
    credit_base_url = os.environ["CREDIT_BASE_URL"]
    search_url = f"{credit_base_url}/v1/credit/search"
    submit_url = f"{credit_base_url}/v1/credit/submitForm"
    select_url = f"{credit_base_url}/v1/credit/select"
    get_txn_url = f"{credit_base_url}/v1/txn_details"
    get_aa_url = f"{credit_base_url}/v1/credit/getAAUrl"
    # making initial search call
    search_resp, search_resp_code = APIInterface().post_with_params(
        route=search_url, params={"user_id": "3"}
    )
    txn_id = search_resp.get("txn_id")
    user_contact_number = kwargs.get("contactNumber")
    finvu_user_id = f"{user_contact_number}@finvu"
    del kwargs["interaction_id"]
    kwargs.update({"bureauConsent": True, "aa_id": finvu_user_id})
    submit_payload = {"loanForm": kwargs}
    print(f"{submit_payload=}")
    submit_resp, submit_resp_code = APIInterface().post_with_params(
        route=submit_url, params={"txn_id": txn_id}, data=submit_payload
    )
    select_resp, select_resp_code = APIInterface().post_with_params(
        route=select_url, params={"txn_id": txn_id}
    )
    get_aa_resp, get_aa_resp_code = APIInterface().get(
        route=get_aa_url, params={"user_id": finvu_user_id, "txn_id": txn_id}
    )
    aa_url = get_aa_resp.get("aa_url")
    print(f"{aa_url=}")
    return aa_url
