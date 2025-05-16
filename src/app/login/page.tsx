'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      // redirect: true,
      email,
      password,
      callbackUrl: '/home',
    });

    console.log(res);
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-sm'>
        <h2 className='text-2xl font-semibold text-center mb-6'>Login</h2>
        <form onSubmit={handleSubmit}>
          {/* <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-600'>
              Name
            </label>
            <input
              type='name'
              name='name'
              // ref={EmailInputRef}
              onChange={(e) => setUserName(e.target.value)}
              className='mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
              placeholder='Enter your name'
            />
          </div> */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-600'>
              Email
            </label>
            <input
              type='email'
              name='email'
              // ref={EmailInputRef}
              onChange={(e) => setEmail(e.target.value)}
              className='mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
              placeholder='Enter your email'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-600'>
              Password
            </label>
            <input
              type='password'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              // ref={PasswordInputRef}
              className='mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
              placeholder='Enter your password'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all'
          >
            Login
          </button>
        </form>
        <p className='text-center text-sm text-gray-600 mt-4'>
          Do not have an account?{' '}
          <Link href='/signup' className='text-blue-500 hover:underline'>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
