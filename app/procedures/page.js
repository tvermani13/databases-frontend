import Link from 'next/link';

export default function Home() {
    const allowedProcedures = [
        'add_owner', 'add_employee', 'add_driver_role', 'add_worker_role', 'add_product', 'add_van', 'add_business',
        'add_service', 'add_location', 'start_funding', 'hire_employee', 'fire_employee', 'manage_service', 'takeover_van',
        'load_van', 'refuel_van', 'fuel_required', 'drive_van', 'purchase_product', 'remove_product', 'remove_van', 'remove_driver_role'
    ]
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-2xl font-bold mb-4">Database Procedures</h1>
            <ul className="list-disc">
                {allowedProcedures.map((procedure) => (
                    <li key={procedure} className="mb-2">
                        <Link href={`/procedures/${procedure}`} className="text-blue-500 hover:underline">
                            {procedure}
                        </Link>
                    </li>
                ))}
            </ul>
            <Link href="/"
                className="mt-4 px-4 py-2 bg-white text-black border border-gray-300 rounded hover:bg-gray-100">
                Back to main page
            </Link>
        </div>
    );
}