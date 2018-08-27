FROM nginx:1.14

LABEL maintainer="web@johnserrano.co"

COPY   /nginx/default.conf /etc/nginx/conf.d/default.conf

# VOLUME /var/log/nginx

EXPOSE 80
