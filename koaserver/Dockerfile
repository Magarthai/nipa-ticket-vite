FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .

## EXPOSE [Port you mentioned in the vite.config file]
RUN npm install node-pre-gyp -g
RUN npm rebuild bcrypt --build-from-source
RUN npm i

EXPOSE 5000

CMD npm start
