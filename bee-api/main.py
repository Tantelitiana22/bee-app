from fastapi import FastAPI
from db.database import engine
from db import models
from routers import user, post
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.include_router(user.router)
app.include_router(post.router)


@app.get("/")
def root():
    return "Hello bee"

models.Base.metadata.create_all(engine)

app.mount('/images', StaticFiles(directory='images'), name='images')
