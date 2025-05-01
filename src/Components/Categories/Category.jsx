'use client';
import { useEffect, useState } from 'react';
import SvgArray from './Icons';

const Category = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, [setCategories]);
  return (
    <div>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32'>
          <h2 className='text-2xl font-bold text-gray-900'>Collections</h2>

          <div className='mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0'>
            {categories.map((category) => (
              <div key={category._id} className='group relative'>
                <div className='w-full rounded-lg bg-white object-cover  group-hover:opacity-75 group-hover:shadow-xl max-sm:h-80 sm:aspect-2/1 lg:aspect-square py-8 '>
                  <img
                    className='bg-gray-100 px-2 py-5 rounded mx-auto inset-y-16 relative'
                    height={80}
                    width={120}
                    src={category.image}
                    alt='Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.'
                  />
                  <div className='absolute inset-y-2/3 inset-x-36 ml-3 '>
                    <h3 className='mt-6 text-sm text-gray-500'>
                      {category?.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
