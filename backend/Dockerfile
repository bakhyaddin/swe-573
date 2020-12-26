FROM python:3.7.3
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN mkdir /backend
WORKDIR /backend

COPY requirements.txt /backend/

EXPOSE 8000

RUN pip install -r requirements.txt
COPY . /backend