'use client';

import { useState } from 'react';
import clientLogger from '@/utils/clientLogger';

export default function Home() {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('demo-user');
  const [logLevel, setLogLevel] = useState('INFO');

  const handleLog = () => {
    if (!message.trim()) return;

    // Log the message with selected level
    clientLogger[logLevel.toLowerCase() as 'debug' | 'info' | 'warn' | 'error' | 'fatal'](
      message,
      { username, metadata: { timestamp: new Date().toISOString() } }
    );

    setMessage('');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Next.js Logging System</h1>

      <div className="mb-4">
        <label className="block mb-2">Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Log Level:</label>
        <select
          value={logLevel}
          onChange={(e) => setLogLevel(e.target.value)}
          className="border p-2 w-full"
        >
          <div className='text-black'>
            <option value="DEBUG">DEBUG</option>
            <option value="INFO">INFO</option>
            <option value="WARN">WARN</option>
            <option value="ERROR">ERROR</option>
            <option value="FATAL">FATAL</option>
          </div>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 w-full h-32"
        />
      </div>

      <button
        onClick={handleLog}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Send Log
      </button>
    </div>
  );
}