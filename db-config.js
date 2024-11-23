import mysql from 'mysql2/promise';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

const db = mysql.createPool({
  host: serverRuntimeConfig.DB_HOST,
  user: serverRuntimeConfig.DB_USER,
  password: serverRuntimeConfig.DB_PASSWORD,
  database: serverRuntimeConfig.DB_NAME
});

export default db;
