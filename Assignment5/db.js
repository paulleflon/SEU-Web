import {createConnection} from 'mysql2/promise';
import {config} from 'dotenv';
config();

const connection = await createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: 'homework_db'
});

export default connection;
