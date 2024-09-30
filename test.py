from num2words import num2words
import re

selected_offer = {
    "offer_details": {"MIN_LOAN_AMOUNT": "1,00,000", "MAX_LOAN_AMOUNT": "10,00,000"}
}
min_loan_amt = selected_offer.get("offer_details").get("MIN_LOAN_AMOUNT")
min_loan_amt = re.sub("[^A-Za-z0-9]+", "", min_loan_amt)
min_loan_amt_words = num2words(min_loan_amt)
max_loan_amt = selected_offer.get("offer_details").get("MAX_LOAN_AMOUNT")
max_loan_amt = re.sub("[^A-Za-z0-9]+", "", max_loan_amt)
max_loan_amt_words = num2words(max_loan_amt, to="")
print(min_loan_amt_words)
print(max_loan_amt_words)
