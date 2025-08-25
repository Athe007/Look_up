from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import models, schemas, database

router = APIRouter()

@router.post("/", response_model=schemas.LinkedAccountOut)
def add_account(acc: schemas.LinkedAccountCreate, db: Session = Depends(database.get_db)):
    new_acc = models.LinkedAccount(platform=acc.platform, handle=acc.handle, user_id=1)  # demo user
    db.add(new_acc)
    db.commit()
    db.refresh(new_acc)
    return new_acc

@router.get("/", response_model=list[schemas.LinkedAccountOut])
def list_accounts(db: Session = Depends(database.get_db)):
    return db.query(models.LinkedAccount).filter(models.LinkedAccount.user_id == 1).all()
