FROM node:16.13.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent

COPY . ./

EXPOSE 5000
CMD ["node", "index.js"]