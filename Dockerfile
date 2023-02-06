# pull the base image
FROM node:alpine as builder 

# set the working direction
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json .

COPY package-lock.json .

RUN npm install

# add app
COPY . .

EXPOSE 80

# start app
# CMD ["npm", "run","build"]

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]