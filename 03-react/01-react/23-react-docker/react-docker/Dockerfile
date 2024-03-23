#Node
FROM node:lts-alpine as build-stage

RUN mkdir app

WORKDIR /app

COPY  package.json ./
COPY  yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:1.21.6-alpine as production-stage
COPY --from=build-stage /app/dist  /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]



