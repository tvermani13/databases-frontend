"use client";

import ViewTable from '../../components/ViewTable';
import { useParams } from 'next/navigation';

export default function ViewPage() {
    const params = useParams();
    const { viewName } = params;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <ViewTable viewName={viewName} />
        </div>
    );
}
