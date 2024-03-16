FROM node:18-alpine

WORKDIR /app
COPY src /app/src
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./tsconfig.json /app/tsconfig.json

RUN ls -al
RUN npm ci

CMD [ "npm", "start" ]