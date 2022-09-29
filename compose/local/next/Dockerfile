FROM node:16-alpine


# set working directory
WORKDIR /app

# install app dependencies
# COPY package.json ./
COPY package*.json ./
RUN yarn install
COPY . .
# COPY .env .
RUN yarn build
CMD ["yarn", "start"]
# COPY yarn.lock ./
# RUN yarn install