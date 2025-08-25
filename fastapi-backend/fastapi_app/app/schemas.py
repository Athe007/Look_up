from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    password: str

class UserOut(BaseModel):
    id: int
    email: str
    class Config:
        orm_mode = True

class LinkedAccountCreate(BaseModel):
    platform: str
    handle: str

class LinkedAccountOut(BaseModel):
    id: int
    platform: str
    handle: str
    class Config:
        orm_mode = True
