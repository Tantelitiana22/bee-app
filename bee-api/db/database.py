import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
_ =load_dotenv()

POSTGRES_USER = os.getenv('POSTGRES_USER')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')
POSTGRES_DB = os.getenv('POSTGRES_DB')

SQLALCHEMY_DATABASE_URL = 'sqlite:///./ig_api.db'
POSTGRES_DATABSE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@api_postgresql/{POSTGRES_DB}".replace("\"","")

print(POSTGRES_DATABSE_URL)

engine = create_engine(POSTGRES_DATABSE_URL)

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()