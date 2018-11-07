FROM nginx:1.14

LABEL maintainer="web@johnserrano.co"

COPY   /nginx/default.conf /etc/nginx/conf.d/default.conf

COPY   /nginx/backend-dev.conf /etc/nginx/conf.d/backend-dev.conf
COPY   /nginx/backend-prod.conf /etc/nginx/conf.d/backend-prod.conf

COPY   /nginx/api-dev.conf /etc/nginx/conf.d/api-dev.conf
COPY   /nginx/api-prod.conf /etc/nginx/conf.d/api-prod.conf

COPY   /nginx/static-dev.conf /etc/nginx/conf.d/static-dev.conf
COPY   /nginx/static-prod.conf /etc/nginx/conf.d/static-prod.conf

# VOLUME /var/log/nginx

EXPOSE 80
