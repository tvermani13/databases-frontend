import mysql from 'mysql2/promise';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

const db = mysql.createPool({
  host: serverRuntimeConfig.DB_HOST,
  user: serverRuntimeConfig.DB_USER,
  password: serverRuntimeConfig.DB_PASSWORD,
  database: serverRuntimeConfig.DB_NAME,
});
const allowedViews = [
  'display_service_view',
  'display_product_view',
  'display_location_view',
  'display_driver_view',
  'display_employee_view',
  'display_owner_view',
];

export async function GET(req, { params }) {
  try {
    const { viewName } = params;

    if (!allowedViews.includes(viewName)) {
      return new Response(JSON.stringify({ error: 'Invalid view name' }), { status: 400 });
    }

    const query = `SELECT * FROM ??`;
    const [results] = await db.query(query, [viewName]);

    return new Response(JSON.stringify(results), { status: 200 });
  } catch (error) {
    console.error('Error fetching view data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch view data.' }), { status: 500 });
  }
}
