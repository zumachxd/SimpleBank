import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'NG_Cash',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    dialect:'postgres'
   }
module.exports = config;