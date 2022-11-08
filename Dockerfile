FROM node:alpine
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . /app
RUN yarn build
ENV REACT_APP_NAME=myName
CMD ["yarn", "start"]