'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { registerUser } from '../actions/registerUser';
import { redirect } from 'next/navigation';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    phone: '',
    userType: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log('Form Submitted', formData);
    const result = await registerUser(formData);

    console.log(result, 'this is result');
    // if (result?.acknowledged) {
    //   redirect('/login');
    // }
    if (result && 'acknowledged' in result && result.acknowledged) {
      redirect('/login');
    } else if (result && 'error' in result) {
      console.error(result.error);
    } else {
      console.error('Unexpected registration failure.');
    }

    // fetch(`/api`, {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data.message);
    //     if (data?.message) {
    //       alert(data.message);
    //     }
    //   });
  };
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 min-w-full'>
      <div className='bg-white p-8 rounded-lg shadow-md w-1/2 my-5 text-center'>
        <div className='flex justify-center mb-4'>
          <div className='bg-gray-200 p-3 rounded-full'>
            <span className='text-2xl font-bold'>b</span>
          </div>
        </div>
        <h2 className='text-2xl font-bold text-gray-700'>Welcome To Bazaar</h2>
        <form onSubmit={handleSubmit} className='mt-4 space-y-4'>
          <div>
            <label
              htmlFor='user-type'
              className='block text-sm/6 font-medium text-gray-900 text-left'
            >
              User Type
            </label>
            <select
              value={formData.userType}
              name='userType'
              onChange={(e) =>
                setFormData({ ...formData, userType: e.target.value })
              }
              required
              className='select select-primary w-full max-w-xs'
            >
              <option value='' disabled>
                Select User
              </option>
              <option value='seller'>Wanna Sell Product</option>
              <option value='buyer'>Wanna Buy Product</option>
            </select>
          </div>
          <input
            type='name'
            name='name'
            placeholder='User Name'
            value={formData.name}
            onChange={handleChange}
            className='w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500'
            required
          />
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            className='w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500'
            required
          />
          <input
            type='phone'
            name='phone'
            placeholder='Phone Number'
            value={formData.phone}
            onChange={handleChange}
            className='w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500'
            required
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            className='w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500'
            required
          />

          {/* Upload Image start */}
          {/* <div className='col-span-full'>
            <label
              htmlFor='cover-photo'
              className='block text-sm/6 font-medium text-gray-900'
            >
              Photo
            </label>
            <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
              <div className='text-center'>
                <svg
                  className='mx-auto size-12 text-gray-300'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                  data-slot='icon'
                >
                  <path
                    fillRule='evenodd'
                    d='M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z'
                    clipRule='evenodd'
                  />
                </svg>
                <div className='mt-4 flex text-sm/6 text-gray-600'>
                  <label
                    htmlFor='file-upload'
                    className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500'
                  >
                    <span>Upload a file</span>
                    <input
                      id='file-upload'
                      name='photo'
                      type='file'
                      className='sr-only'
                      value={formData.photo}
                      onChange={handleChange}
                    />
                  </label>
                  <p className='pl-1'>or drag and drop</p>
                </div>
                <p className='text-xs/5 text-gray-600'>
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div> */}

          {/* Upload Image End */}

          <button
            type='submit'
            className='w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition'
          >
            Login
          </button>
        </form>
        <div className='my-4 text-gray-500'>or</div>
        <button className='w-full flex items-center justify-center bg-blue-800 text-white p-3 rounded-md hover:bg-blue-900 transition'>
          <FaFacebook className='mr-2' /> Continue With Facebook
        </button>
        <button className='w-full flex items-center justify-center bg-blue-500 text-white p-3 rounded-md mt-2 hover:bg-blue-600 transition'>
          <FaGoogle className='mr-2' /> Continue With Google
        </button>
        <p className='mt-4'>
          Do not have an account?{' '}
          <a href='#' className='text-blue-500 font-bold'>
            Register
          </a>
        </p>
        <p className='mt-2'>
          Forgot your password?{' '}
          <a href='#' className='text-blue-500 font-bold'>
            Reset It
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
