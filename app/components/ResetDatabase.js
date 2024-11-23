"use client";

import React, { useEffect, useState } from 'react';

export default function RestorePage() {
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const resetDatabase = async () => {
    try {
      const res = await fetch('../api/resetDatabase', {
        method: 'POST',
      });

      if (res.ok) {
        const data = await res.json();
        setResponse('Database restored successfully');
        setError('');
      } else {
        setError('Failed to restore database');
        setResponse('');
      }
    } catch (err) {
      setError('Error restoring database');
      setResponse('');
      console.error(err);
    }
  };

  useEffect(() => {
    if (response || error) {
      const timer = setTimeout(() => {
        setResponse('');
        setError('');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [response, error]);

  return (
    <div>
      <button onClick={resetDatabase}>Restore Database</button>
      {response && <p>{response}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
