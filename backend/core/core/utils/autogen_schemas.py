from pydantic import BaseModel, Field
from enum import Enum


class Gender(str, Enum):
    Male = "Male"
    Female = "Female"
    Others = "Others"


class EmploymentType(str, Enum):
    Salaried = "Salaried"
    SelfEmployment = "Self Employment"


class EndUse(str, Enum):
    ConsumerDurablePurchase = "ConsumerDurablePurchase"
    Education = "Education"
    Travel = "Travel"
    Health = "Health"
    Other = "Other"


class UserDetails(BaseModel):
    interaction_id: str = Field(None, description="Unique id generated for each chat")
    firstName: str = Field(None, description="First name of the user")
    lastName: str = Field(None, description="Last name of the user")
    dob: str = Field(None, description="date of birth of the user in DD/MM/YYYY format")
    gender: Gender = Field(None, description="Gender of the user")
    contactNumber: str = Field(None, description="Mobile number of the user")
    email: str = Field(None, description="Email id of the user")
    pan: str = Field(None, description="PAN card number for the user")
    addressL1: str = Field(
        None, description="User address line 1 from the conversation"
    )
    addressL2: str = Field(
        None, description="User address line 2 from the conversation"
    )
    pincode: str = Field(None, description="User pincode from the conversation")
    city: str = Field(None, description="User city name from the conversation")
    state: str = Field(None, description="User state name from the conversation")
    employmentType: EmploymentType = Field(None, description="Type of employment")
    companyName: str = Field(None, description="Name of the employer for the user")
    officialEmail: str = Field(None, description="Official email id with the employer")
    income: str = Field(None, description="Annual income of the user")
    endUse: EndUse = Field(None, description="The reason user wanted to avail for loan")
    message: str = Field(None, description="Raw message to the user from agent")
    # end_use: str = Field(None, description="The reason user wanted to avail for loan")
    # employment_type: str = Field(None, description="Type of employment")
    # gender: str = Field(None, description="Gender of the user")
