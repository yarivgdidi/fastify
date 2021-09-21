npm install --save-dev sequelize-cli
cd src/sequelize  
npx sequelize-cli init
npx sequelize-cli model:generate --name User --attributes first:string,last:string,email:string, password:string
npx sequelize-cli db:create
npx sequelize-cli db:migrate --env=development
