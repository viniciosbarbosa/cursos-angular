FROM node:22-alpine
WORKDIR /app
RUN npm install -g json-server@0.17.4
COPY ./db.prod.json .
EXPOSE 4000
ENTRYPOINT json-server --watch db.prod.json --host 0.0.0.0 --port 4000

