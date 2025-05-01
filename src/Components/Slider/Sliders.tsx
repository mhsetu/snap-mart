'use client';

import { Parallax, ParallaxProvider } from 'react-scroll-parallax';

import { motion } from 'framer-motion';

import { useEffect, useState } from 'react';
import Input from './Input/Input';
// import { ParallaxBanner } from 'react-scroll-parallax';
// import SecondMain from '../Home/SecondMain';

const images = [
  'https://images.unsplash.com/photo-1615118265620-d8decf628275?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1677346862368-3f140e02eb86?q=80&w=2077&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

// const layer = [
//   {
//     image:
//       'https://images.unsplash.com/photo-1615118265620-d8decf628275?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     speed: -20,
//   },
//   {
//     image:
//       'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     speed: -10,
//   },
// ];

export default function ParallaxSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // const nextSlide = () => {
  //   setInterval(()=>{
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  //   },5000)
  // };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change slide every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    // <div className='relative w-full h-screen overflow-hidden'>
    //   {images.map((img, index) => (
    //     <motion.div
    //       key={index}
    //       initial={{ opacity: 0, scale: 1.1 }}
    //       animate={{
    //         opacity: index === currentIndex ? 1 : 0,
    //         scale: index === currentIndex ? 1 : 1.1,
    //       }}
    //       transition={{ duration: 1 }}
    //       className='absolute inset-0 bg-cover bg-center'
    //       style={{
    //         backgroundImage: `url(${img})`,
    //       }}
    //     />
    //   ))}

    //   <div className='absolute inset-0 flex flex-col items-center justify-center text-white'>
    //     <h1 className='text-4xl font-bold'>THE STYLE FOR TODAY</h1>
    //     <p className='mt-2 text-lg'>
    //       Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    //     </p>
    //     <button
    //       className='mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg'
    //       onClick={nextSlide}
    //     >
    //       Next Slide
    //     </button>
    //   </div>
    // </div>
    // <ParallaxBanner layers={layer} className='aspect-[2/1]'>
    //   <div className='absolute inset-0 flex items-center justify-center'>
    //     <h1 className='text-8xl text-white font-thin'>Hello World!</h1>
    //   </div>
    // </ParallaxBanner>
    <ParallaxProvider>
      {/* Fixed Parallax Section */}
      <div className='relative top-0 w-full h-screen overflow-hidden'>
        {images.map((img, index) => (
          <Parallax key={index} speed={-20} className='absolute inset-0'>
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{
                opacity: index === currentIndex ? 1 : 0,
                scale: index === currentIndex ? 1 : 1.1,
              }}
              transition={{ duration: 1.5 }}
              className='absolute inset-0 bg-cover bg-center'
              style={{
                backgroundImage: `url(${img})`,
              }}
            />
          </Parallax>
        ))}

        {/* Content Overlay */}
        <div className='absolute inset-0 flex flex-col items-center justify-center text-white'>
          <h1 className='text-4xl font-bold mb-5'>THE STYLE FOR TODAY</h1>
          {/* <p className='mt-2 text-lg mb-3'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p> */}
          {/* <button className='mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg'>
            Next Slide
          </button> */}
        </div>
        <div className='absolute inset-y-1/2 w-full mt-6 text-white'>
          <Input />
        </div>
      </div>

      {/* Scrollable Content Below */}
    </ParallaxProvider>
  );
}
