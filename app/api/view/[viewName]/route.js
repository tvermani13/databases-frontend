import mysql from 'mysql2/promise';
import getConfig from 'next/config';
import 'dotenv/config';
const { serverRuntimeConfig } = getConfig();

const db = mysql.createPool({
  host: serverRuntimeConfig.DB_HOST,
  user: serverRuntimeConfig.DB_USER,
  password: serverRuntimeConfig.DB_PASSWORD,
  database: serverRuntimeConfig.DB_NAME,
});

// const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

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
    // const viewName = req.nextUrl.pathname.split("/")[3]; // Dynamically extract the value of `viewName`

    // const { searchParams } = new URL(req.url);
    // const viewName = searchParams.get('viewName');

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
