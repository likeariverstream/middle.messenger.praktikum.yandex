FROM node:16.13.0-alpine

WORKDIR /var/www/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["node", "./server.js"]
