FROM mhart/alpine-node:10 as base

EXPOSE 3000

LABEL maintainer="web@johnserrano.co"

WORKDIR /app

ADD package.json /app/

# RUN npm install && npm install --save serve

ADD . /app

# RUN npm run build

# CMD ["npm", "start",]
CMD ["npm", "run", "dev"]