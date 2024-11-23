"use client";

import Link from 'next/link';
import ViewTable from '../../components/ViewTable';
import { useParams } from 'next/navigation';

export default function ViewPage() {
    const params = useParams();
    const { viewName } = params;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <ViewTable viewName={viewName} />
            <Link href="/view"
                className="mt-4 px-4 py-2 bg-white text-black border border-gray-300 rounded hover:bg-gray-100">
                Back to Views
            </Link>
        </div>
        
    );
}
