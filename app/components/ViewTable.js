'use client';

import React, { useState, useEffect } from 'react';

export default function ViewTable({ viewName }) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:5001/view/${viewName}`);
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [viewName]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (data.length === 0) return <div>No data available for view: {viewName}</div>;

    return (
        <div>
            <h2>Data for View: {viewName}</h2>
            <table className="min-w-full border-collapse">
                <thead>
                    <tr>
                        {Object.keys(data[0]).map((key) => (
                            <th key={key} className="px-4 py-2 border">{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {Object.values(row).map((value, colIndex) => (
                                <td key={colIndex} className="px-4 py-2 border">{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
