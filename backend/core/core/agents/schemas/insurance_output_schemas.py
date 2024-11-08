from pydantic import BaseModel, Field
from typing import List


class UserDetails(BaseModel):
    firstName: str = Field(description="Customer's first name")
    lastName: str = Field(description="Customer's last name")
    dob: str = Field(description="Customer's date of birth in DD-MM-YYYY format")
    gender: str = Field(description="Customer's gender in Male, Female or Other format")
    email: str = Field(description="Customer's email address")
    phone: str = Field(description="Customer's phone number")
    address: str = Field(description="Customer's full address")
    pincode: str = Field(description="Customer's pincode")
    any_pre_existing_disease: str = Field(
        description="Check if customer has any pre-existing diseases. Can only take values Yes or No"
    )
    diabetes: str = Field(
        description="Is customer suffering with diabetes? Can only take values Yes or No"
    )
    bloodPressure: str = Field(
        description="Is customer suffering with bloodPressure? Can only take values Yes or No"
    )
    heartAilments: str = Field(
        description="Is customer suffering with heartAilments? Can only take values Yes or No"
    )
    other: str = Field(
        description="Is customer suffering with any other pre-existing diseases? Can only take values Yes or No"
    )
    amount: int = Field(description="Amount of insurance")
    politicallyExposedPerson: str = Field(
        description="Check if customer is politically exposed person. Can only take values Yes or No"
    )
    heightfoot: str = Field(description="Height in foot")
    heightinch: str = Field(description="Height in inch")
    weight: str = Field(description="Weight in kg")


class UserDetailsResponse(BaseModel):
    userDetails: List[UserDetails]


class BuyerDetails(BaseModel):
    firstName: str = Field(description="Buyer's first name")
    lastName: str = Field(description="Buyer's last name")
    dob: str = Field(description="Buyer's date of birth in YYYY-MM-DD format")
    gender: str = Field(description="Buyer's gender in Male, Female or Other format")
    email: str = Field(description="Buyer's email address")
    phone: str = Field(description="Buyer's phone number")
    address: str = Field(description="Buyer's full address")
    politicallyExposedPerson: str = Field(
        description="Check if buyer is politically exposed person. Yes or No"
    )


class BuyerDetailsResponse(BaseModel):
    buyerDetails: List[BuyerDetails]


class NomineeDetails(BaseModel):
    firstName: str = Field(description="Nominee's first name")
    lastName: str = Field(description="Nominee's last name")
    phone: str = Field(description="Nominee's phone number")
    relation: str = Field(description="Nominee's relation with person insured")


class NomineeDetailsResponse(BaseModel):
    nomineeDetails: List[NomineeDetails]


class GeneratedQuestion(BaseModel):
    text: str


class InsurancePlanEnum(BaseModel):
    insurance_plan_for: str = Field(
        description="If customer wants insurance plan for self or family"
    )


class UserDocumentDetails(BaseModel):
    firstName: str = Field(description="Customer's first name on Aadhaar card")
    lastName: str = Field(description="Customer's first name on aadhar card")
    dob: str = Field(description="Customer's date of birth in DD-MM-YYYY format")
    gender: str = Field(description="Customer's gender in Male, Female or Other format")
    address: str = Field(description="Customer's complete address")
    pincode: str = Field(description="Customer's pincode")


class UserIntentClassification(BaseModel):
    user_intent: str = Field(
        description="Intent of the user in the audio file from the given options: 'submit', 'edit'"
    )


class UserIntent(BaseModel):
    user_intent: str = Field(
        description="Classification of user message in question or Acknowledgement"
    )


class AddOnOffer(BaseModel):
    id: str
    descriptor: str


class AddOnOfferList(BaseModel):
    add_on_list: List[AddOnOffer]
