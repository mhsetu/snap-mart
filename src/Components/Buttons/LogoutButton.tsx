'use client';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

export const LogoutButton = () => {
  return (
    <>
      <button className='btn btn-primary z-50' onClick={() => signOut()}>
        Logout
      </button>
    </>
  );
};

export const LogInButton = () => {
  return (
    <>
      <Link href='/login'>
        <button className='btn btn-primary z-50'>Login</button>
      </Link>
    </>
  );
};
