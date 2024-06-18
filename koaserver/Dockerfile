FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

## EXPOSE [Port you mentioned in the vite.config file]
RUN npm i

EXPOSE 5000

CMD npm start
