from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)

    accounts = relationship("LinkedAccount", back_populates="owner")

class LinkedAccount(Base):
    __tablename__ = "linked_accounts"
    id = Column(Integer, primary_key=True, index=True)
    platform = Column(String, nullable=False)
    handle = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="accounts")
