import Link from 'next/link';

export default function Home() {
    const allowedViews = ['display_service_view', 'display_product_view', 'display_location_view', 'display_driver_view', 'display_employee_view', 'display_owner_view']; // valid view names

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-2xl font-bold mb-4">Database Views</h1>
            <ul className="list-disc">
                {allowedViews.map((view) => (
                    <li key={view} className="mb-2">
                        <Link href={`/view/${view}`} className="text-blue-500 hover:underline">
                            {view}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}