from fastapi import APIRouter, Depends
from sqlalchemy.orm.session import Session
from routers.schemas import UserBase, UserDiplay
from db.database import get_db
from db import db_user

router = APIRouter(
    prefix='/user',
    tags=['user']
)

@router.post('/', response_model=UserDiplay)
def create_user(request:UserBase, db:Session=Depends(get_db)):
    return db_user.create_user(request, db)
