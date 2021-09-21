FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY . .
RUN npx sequelize-cli db:migrate --env=development --config=src/sequelize/config/config.json  --migrations-path src/sequelize/migrations
CMD ["npm", "start"]
