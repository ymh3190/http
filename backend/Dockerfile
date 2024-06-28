FROM node:18.17.0-alpine

WORKDIR /app

COPY babel.config.json .
COPY package.json package-lock.json ./
RUN npm ci
COPY src ./src
RUN npm run build
CMD [ "npm", "start" ]
