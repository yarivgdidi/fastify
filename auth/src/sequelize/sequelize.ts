import { Sequelize } from "sequelize";

class SequelizeWrapper {
    private _db? : Sequelize
    get connection() {
        if(!this._db) {
            throw new Error('no db connection')
        }
        return this._db;
    }

    async connect() {
        const sequelize = new Sequelize("mysql://comunix:comunix@comunix-mysql-srv:3306/comunix");
        const dbConnect = async () => {
            try {
                await sequelize.authenticate();
                console.log('Connection has been established successfully.');
                this._db = sequelize;
            } catch (error) {
                console.error('Unable to connect to the database:', error);
            }
        }
    }
}

export const sequelizeWrapper = new SequelizeWrapper()
