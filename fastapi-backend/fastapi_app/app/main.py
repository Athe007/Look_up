from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import auth, accounts

app = FastAPI(title="Identity Linker API")

# Allow all origins (adjust in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(accounts.router, prefix="/accounts", tags=["accounts"])

@app.get("/")
def root():
    return {"message": "Identity Linker API is running"}
