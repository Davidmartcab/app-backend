FROM node:latest as install

LABEL stage=install

WORKDIR /src/install

COPY package.json .

COPY package-lock.json .

RUN npm install

FROM node:latest as compile

LABEL stage=compile

WORKDIR /src/build

COPY --from=install /src/install .

COPY . .

RUN npm run build

RUN npm install

FROM node:latest as deply

WORKDIR /app

COPY --from=compile /src/build/dist/main.js index.js

COPY --from=compile /src/build/node_modules node_modules

ENTRYPOINT node .