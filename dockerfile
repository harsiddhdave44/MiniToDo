FROM nginx:alpine

WORKDIR /usr/share/nginx/html

ADD . .

EXPOSE 80/tcp

CMD ["nginx" , "-g", "daemon off;"]