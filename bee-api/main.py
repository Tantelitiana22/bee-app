from fastapi import FastAPI
from db.database import engine
from db import models
from routers import user, post, comment
from fastapi.staticfiles import StaticFiles
from auth import authentication
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="BeeApp",
            openapi_url="/api/v1/bee/openapi.json",
            docs_url="/api/v1/bee/docs")

app.include_router(user.router, prefix='/api/v1/bee')
app.include_router(post.router, prefix='/api/v1/bee')
app.include_router(authentication.router, prefix='/api/v1/bee')
app.include_router(comment.router, prefix='/api/v1/bee')

@app.get("/")
def root():
    return "Hello bee"


origins =[
    'http://localhost:3000',
    'http://localhost:8080'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

models.Base.metadata.create_all(engine)

app.mount('/images', StaticFiles(directory='images'), name='images')

