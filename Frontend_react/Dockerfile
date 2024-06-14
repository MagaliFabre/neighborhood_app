FROM node as builder
ENV NODE_ENV production

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN ls /app
RUN npm run build

FROM nginx:1.19.0-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build /usr/share/nginx/html
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
