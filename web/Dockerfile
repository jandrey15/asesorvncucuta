FROM mhart/alpine-node:10 as base

EXPOSE 3000

LABEL maintainer="web@johnserrano.co"

WORKDIR /app

COPY package*.json /app/

# RUN npm install && npm install --save serve

RUN npm install

COPY . /app

# RUN npm run build

# CMD ["npm", "start",]
CMD ["npm", "run", "dev"]