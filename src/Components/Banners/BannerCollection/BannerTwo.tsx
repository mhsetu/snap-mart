import Image from 'next/image';
import Iphone from '../../../Assets/Png/Iphone 14.png';

const BannerTwo = () => {
  return (
    <div className=' flex relative max-w-2xl inset-8 items-center bg-[#fffef4] rounded-xl '>
      <div className='mx-8'>
        <button className='bg-[#383737] px-2 py-2 text-xs text-white my-2 rounded-md'>
          Starting At only $699
        </button>
        <h1 className='font-semibold text-4xl mb-3'>Waterproof JBL Speaker</h1>
        <p>Rock out with powerful JBL Pro Sound that deliver clean</p>
      </div>

      <div className=' hover:scale-110 duration-[3s]'>
        <Image src={Iphone} width={300} alt='Iphone' />
      </div>
    </div>
  );
};

export default BannerTwo;
