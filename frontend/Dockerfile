FROM node:18 as build

WORKDIR /app/frontend/

COPY package*.json /app/frontend/
RUN npm install 

COPY . /app/frontend/

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/local/bin

COPY --from=build /app/frontend/build /usr/share/nginx/html

COPY generate-config.sh .

COPY custom-nginx.template /etc/nginx/conf.d/

RUN chmod +x generate-config.sh

EXPOSE 80

ENTRYPOINT ["/bin/sh", "generate-config.sh"]