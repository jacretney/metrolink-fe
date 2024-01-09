FROM node:21.5.0-alpine3.19 as build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build --verbose

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]