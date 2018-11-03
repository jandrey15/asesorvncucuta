# FROM mhart/alpine-node
FROM mhart/alpine-node:10 as base

EXPOSE 3000

LABEL maintainer="web@johnserrano.co"

WORKDIR /app

COPY package*.json /app/

# RUN npm install && npm install --save serve
ENV NODE_ENV production
# ENV PORT 3000

RUN yarn install && \
  yarn add mocha chai supertest -D

COPY . /app

RUN npm run build

CMD ["npm", "start"]
# CMD ["npm", "run", "dev"]