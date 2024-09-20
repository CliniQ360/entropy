from typing import List
from pydantic import BaseModel, Field


class UserDetails(BaseModel):
    firstName: str = Field(description="Customer's first name")
    lastName: str = Field(description="Customer's last name")
    dob: str = Field(description="Customer's date of birth in DD-MM-YYYY format")
    gender: str = Field(description="Customer's gender in Male, Female or Other format")
    email: str = Field(description="Customer's email address")
    pan: str = Field(description="Customer's PAN number")
    contactNumber: str = Field(description="Customer's contact number")
    addressL1: str = Field(description="Customer's address line 1")
    addressL2: str = Field(description="Customer's address line 2")
    city: str = Field(description="Customer's city")
    state: str = Field(description="Customer's state")
    pincode: str = Field(description="Customer's pincode")
    employmentType: str = Field(
        description="Customer's employment type in Salaried or Self Employed format"
    )
    companyName: str = Field(description="Customer's company name")
    officialEmail: str = Field(description="Customer's company email id")
    income: str = Field(description="Customer's annual income")
    endUse: str = Field(
        description="Customer's purpose to get loan in Education, Health, Travel, Other"
    )


class UserDocumentDetails(BaseModel):
    firstNameAadhaar: str = Field(description="Customer's first name on Aadhaar card")
    middleNameAadhaar: str = Field(description="Customer's middle name on Aadhaar card")
    lastNameAadhaar: str = Field(description="Customer's first name on aadhar card")
    firstNamePan: str = Field(description="Customer's first name on PAN card")
    middleNamePan: str = Field(description="Customer's middle name on PAN card")
    lastNamePan: str = Field(description="Customer's first name on PAN card")
    dob: str = Field(description="Customer's date of birth in DD-MM-YYYY format")
    gender: str = Field(description="Customer's gender in Male, Female or Other format")
    pan: str = Field(description="Customer's PAN number")
    addressL1: str = Field(description="Customer's address line 1")
    addressL2: str = Field(description="Customer's address line 2")
    city: str = Field(description="Customer's city")
    state: str = Field(description="Customer's state")
    pincode: str = Field(description="Customer's pincode")


class UserDetailsResponse(BaseModel):
    userDetails: List[UserDetails]


class GeneratedQuestion(BaseModel):
    text: str


class UserAccountDetails(BaseModel):
    accHolderName: str = Field(description="Bank account holder name")
    acctype: str = Field(
        description="Bank account holder type in Savings or Current format"
    )
    ifscCode: str = Field(description="Bank's IFSC code")
    accNo: str = Field(description="Bank account number")


class UserAccountDetailsResponse(BaseModel):
    userAccountDetails: List[UserAccountDetails]


class UserIntent(BaseModel):
    user_intent: str = Field(
        description="Classification of user message  in question or Acknowledgement"
    )
