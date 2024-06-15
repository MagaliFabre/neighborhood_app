FROM node as builder
ENV NODE_ENV production

WORKDIR /app
COPY package.json .
# COPY ./Frontend_react/package.json .
COPY package-lock.json .
# COPY ./Frontend_react/package-lock.json .

RUN npm install
COPY . .
# COPY ./Frontend_react/. .
RUN ls /app
RUN npm run build

FROM nginx:1.19.0-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
