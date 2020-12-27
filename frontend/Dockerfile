FROM node:14.4.0-alpine3.10
USER root
WORKDIR /frontend

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /frontend/package.json
COPY package-lock.json /frontend/package-lock.json
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

COPY . /frontend

RUN npm run build