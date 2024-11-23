import mysql from 'mysql2/promise';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

const db = mysql.createPool({
  host: serverRuntimeConfig.DB_HOST,
  user: serverRuntimeConfig.DB_USER,
  password: serverRuntimeConfig.DB_PASSWORD,
  database: serverRuntimeConfig.DB_NAME,
});

export async function POST() {
  try {
    const query = 'CALL magic44_reset_database_state()';
    const [results] = await db.query(query);
    return new Response(JSON.stringify({ message: 'Database restored successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error restoring database:', error);
    return new Response(JSON.stringify({ error: 'Failed to restore database' }), { status: 500 });
  }
}
