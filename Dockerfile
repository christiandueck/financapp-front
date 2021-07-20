FROM node:15.5.0-alpine

WORKDIR /user/src/financapp-front

COPY package.json .

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

CMD yarn dev