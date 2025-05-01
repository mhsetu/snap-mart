import BannerOne from './BannerOne';
import BannerTwo from './BannerTwo';

const BannerCollection = () => {
  return (
    <div className='w-full grid grid-cols-2 gap-8'>
      <BannerOne />
      <BannerTwo />
    </div>
  );
};

export default BannerCollection;
