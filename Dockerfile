FROM node:16

WORKDIR /app

COPY package.json .

ARG NODE_ENV

RUN npm install -g serve

COPY ./build/ ./

ENV PORT 3000

EXPOSE $PORT


CMD ["serve", "-s", "."]