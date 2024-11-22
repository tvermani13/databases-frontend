import db from '../../../../path-to-db-config'; // Adjust the path to your database config

const allowedViews = ['display_service_view', 'display_product_view', 'display_location_view', 'display_driver_view', 'display_employee_view', 'display_owner_view']; // valid view names

export async function GET(request, { params }) {
    const { viewName } = params;

    if (!allowedViews.includes(viewName)) {
        return new Response(JSON.stringify({ error: 'Invalid view name' }), { status: 400 });
    }

    const query = `SELECT * FROM ??`;

    return new Promise((resolve) => {
        db.query(query, [viewName], (err, results) => {
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
}
