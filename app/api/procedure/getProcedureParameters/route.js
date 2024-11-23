import mysql from 'mysql2/promise';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

const db = mysql.createPool({
  host: serverRuntimeConfig.DB_HOST,
  user: serverRuntimeConfig.DB_USER,
  password: serverRuntimeConfig.DB_PASSWORD,
  database: serverRuntimeConfig.DB_NAME,
});

function formatQuery(query, values) {
  return query.replace(/\?/g, () => mysql.escape(values.shift()));
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const procedureName = searchParams.get('procedureName');
    const databaseName = serverRuntimeConfig.DB_NAME;

    console.log(procedureName);
    console.log(databaseName);

    if (!procedureName) {
      return new Response(JSON.stringify({ error: 'Procedure name is required' }), { status: 400 });
    }

    const query = `
      SELECT PARAMETER_NAME, DATA_TYPE, DTD_IDENTIFIER
      FROM INFORMATION_SCHEMA.PARAMETERS
      WHERE SPECIFIC_NAME = ? AND SPECIFIC_SCHEMA = ?;
    `;

    const [results] = await db.query(query, [procedureName, databaseName]);
    // console.log(results);

    console.log(formatQuery(query, [procedureName, databaseName]));

    if (results.length === 0) {
      console.log("NO PARAMETERS FOUND");
      return new Response(JSON.stringify({ error: 'No parameters found for the specified procedure.' }), { status: 404 });
    }

    const parameters = results.map((row) => ({
      name: row.PARAMETER_NAME,
      type: row.DATA_TYPE,
      details: row.DTD_IDENTIFIER, // Useful for length/precision, if needed
    }));

    return new Response(JSON.stringify({ parameters }), { status: 200 });
  } catch (error) {
    console.error('Error fetching procedure parameters:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch procedure parameters.' }), { status: 500 });
  }
}
