FROM --platform=linux/amd64 node:20-alpine as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

ARG REACT_APP_BACKEND_BASE_URL
ARG REACT_APP_ENV
ARG REACT_APP_CODE_KEY

ENV REACT_APP_BACKEND_BASE_URL=$REACT_APP_BACKEND_BASE_URL \
    REACT_APP_ENV=$REACT_APP_ENV \
    REACT_APP_CODE_KEY=$REACT_APP_CODE_KEY

RUN npm run build

FROM nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/package.json /usr/share/nginx/package.json
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 4200