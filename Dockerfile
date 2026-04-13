FROM nginx:alpine

COPY front-end/ /usr/share/nginx/html

EXPOSE 80