'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending a reset email
    setMessage('If this email exists in our system, a reset link has been sent.');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        {/* Logo Image */}
        <div className="flex justify-center mb-6">
          <Image src="/protiviti_logo.png" alt="Protiviti Logo" width={200} height={100} />
        </div>
        
        {/* Forgot Password Form */}
        <h2 className="text-2xl font-semibold text-center mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input 
              type="email" 
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition">
            Reset Password
          </button>
        </form>
        
        {/* Message */}
        {message && <p className="text-center text-green-600 mt-4">{message}</p>}
        
        {/* Back to Sign In */}
        <div className="text-center mt-4">
          <Link href="/sign-in" className="text-blue-600 hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}