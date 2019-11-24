FROM node:alpine as builder
WORKDIR /usr/src/app
COPY package.json .
RUN npm install -g yarn
RUN yarn

FROM node:alpine as prod
WORKDIR /usr/src/app
COPY package.json .
COPY tslint.json .
COPY tsconfig.json .
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY src ./src