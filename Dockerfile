FROM node:10.14.0
WORKDIR /usr/local/app
COPY package.json .
RUN npm install
COPY . .

CMD npm start