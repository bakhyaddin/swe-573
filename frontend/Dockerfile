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
RUN npm run build

# COPY 357155870B1223942DC74C3B47A6C463.txt /app/build/.well-known/pki-validation/357155870B1223942DC74C3B47A6C463.txt

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
# this is only for production purposes
COPY ./nginx/certificate /app/certificate
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]