# pull official base image
FROM node:12.16.0-alpine as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install

# add app
COPY . /app

# start app
# RUN npm run build

# COPY ./7255877FEB484591C85CB7E034377FC1.txt /app/build/.well-known/pki-validation/7255877FEB484591C85CB7E034377FC1.txt

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx/certificate /app/certificate
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]