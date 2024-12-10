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

const allowedProcedures = [
  'add_owner', 'add_employee', 'add_driver_role', 'add_worker_role', 'add_product', 'add_van', 'add_business',
  'add_service', 'add_location', 'start_funding', 'hire_employee', 'fire_employee', 'manage_service', 'takeover_van',
  'load_van', 'refuel_van', 'drive_van', 'purchase_product', 'remove_product', 'remove_van', 'remove_driver_role',
];

// fuel_required is a pre-written function, not a procedure

export async function POST(req) {
  try {
    const body = await req.json();
    const { procedureName, params } = body;

    if (!allowedProcedures.includes(procedureName)) {
      return new Response(JSON.stringify({ error: 'Invalid procedure name' }), { status: 400 });
    }

    const paramValues = Object.values(params);
    const placeholders = paramValues.map(() => '?').join(', ');
    const query = `CALL ${procedureName}(${placeholders})`;

    const [results] = await db.query(query, paramValues);

    return new Response(JSON.stringify(results), { status: 200 });

  } catch (error) {
    console.error('Error in callProcedure:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}