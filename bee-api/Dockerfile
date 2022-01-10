FROM ubuntu:20.04

WORKDIR /app

COPY requirements.txt .


RUN apt-get update
RUN apt-get -y install python3-pip
RUN apt-get update
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . .