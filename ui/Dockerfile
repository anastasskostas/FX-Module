FROM node:13.12.0-alpine

# cd /app
WORKDIR /usr/src/app/ui

COPY package*.json ./

RUN npm install

# copy all files
COPY . .

EXPOSE 3000
CMD ["npm", "run", "start:prod"]