from sqlalchemy import Column, String, DateTime, JSON
from core import Base


class UserInteractions(Base):
    __tablename__ = "user_interactions"
    __table_args__ = {"extend_existing": True}
    interaction_id = Column(String, primary_key=True)
    transaction_id = Column(String)
    interaction_metadata = Column(JSON)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
