FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

COPY nginx_conf/nginx.production.conf /etc/nginx/conf.d
COPY nginx_conf/nginx.conf /etc/nginx
COPY dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]