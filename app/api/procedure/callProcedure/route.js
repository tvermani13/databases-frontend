import db from '../../../../path-to-db-config'; // Adjust the path to your database config

const allowedProcedures = [
    'add_owner', 'add_employee', 'add_driver_role', 'add_worker_role', 'add_product', 'add_van', 'add_business',
    'add_service', 'add_location', 'start_funding', 'hire_employee', 'fire_employee', 'manage_service', 'takeover_van',
    'load_van', 'refuel_van', 'fuel_required', 'drive_van', 'purchase_product', 'remove_product', 'remove_van', 'remove_driver_role'
]
export async function POST(request) {
    try {
        const body = await request.json();
        const { procedureName, params } = body;

        if (!allowedProcedures.includes(procedureName)) {
            return new Response(JSON.stringify({ error: 'Invalid procedure name' }), { status: 400 });
        }

        const paramValues = Object.keys(params).map((key) => params[key]);
        const placeholders = paramValues.map(() => '?').join(', ');
        const query = `CALL ${procedureName}(${placeholders})`;

        return new Promise((resolve) => {
            db.query(query, paramValues, (err, results) => {
                if (err) {
                    console.error(err);
                    resolve(
                        new Response(JSON.stringify({ error: err.message }), { status: 500 })
                    );
                } else {
                    resolve(new Response(JSON.stringify(results), { status: 200 }));
                }
            });
        });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
