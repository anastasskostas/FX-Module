FROM node:14

# cd /usr/src/app/api
WORKDIR /usr/src/app/api

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
CMD ["npm", "run", "start:prod"]