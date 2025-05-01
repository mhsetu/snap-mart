import Image from 'next/image';
import AppleWatch from '../../../Assets/Png/Apple Watch.png';

const BannerOne = () => {
  return (
    <div className='bg-[#fffef4] max-w-2xl flex relative inset-8 items-center rounded-xl cursor-pointer'>
      <div className=' mx-8'>
        <button className='bg-[#d6f065] px-2 py-2 text-xs my-2 rounded-md'>
          Starting At only $699
        </button>
        <h1 className='font-semibold text-4xl mb-3'>Waterproof JBL Speaker</h1>
        <p>Rock out with powerful JBL Pro Sound that deliver clean</p>
      </div>
      <div className='hover:scale-110 duration-[3s] w-2/4'>
        <Image src={AppleWatch} width={300} alt='Apple Watch' />
      </div>
    </div>
  );
};

export default BannerOne;
