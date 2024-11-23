'use client';

import Link from 'next/link';
import React, { useState, useEffect, use } from 'react';

export default function ProcedurePage({ params }) {
  // const { procedureName } = params;
  const resolvedParams = use(params);
  const { procedureName } = resolvedParams;
  const [parameters, setParameters] = useState([]);
  const [formData, setFormData] = useState({});
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchParameters() {
      try {
        const res = await fetch(`../api/procedure/getProcedureParameters?procedureName=${procedureName}`);
        // console.log(res);
        const data = await res.json();
        setParameters(data.parameters); 
        setFormData(data.parameters.reduce((acc, param) => ({ ...acc, [param.name]: '' }), {}));
      } catch (err) {
        setError('Failed to load parameters.');
        console.error(err);
      }
    }
    fetchParameters();
  }, [procedureName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`../api/procedure/callProcedure`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ procedureName, params: formData }),
      });
      const result = await res.json();
      setResponse(JSON.stringify(result, null, 2));
      setError('');
    } catch (err) {
      setResponse('');
      setError('Failed to execute procedure.');
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1>Procedure: {procedureName}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {parameters.length > 0 ? (
        <div>
          {parameters.map((param, index) => (
            <div key={index} className="mb-4">
              <label>
                {param.name} ({param.type}):
                <input
                  type="text"
                  name={param.name}
                  value={formData[param.name] || ''}
                  onChange={handleChange}
                  className="px-4 py-2 border rounded w-full text-black"
                />
              </label>
            </div>
          ))}
          <button onClick={handleSubmit}>Execute</button>
        </div>
      ) : (
        <p>Loading parameters...</p>
      )}
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{response}</pre>
        </div>
      )}
      <Link href="/procedures"
        className="mt-4 px-4 py-2 bg-white text-black border border-gray-300 rounded hover:bg-gray-100">
          Back to Procedures
      </Link>
    </div>
    
  );
}