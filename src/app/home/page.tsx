// import Image from 'next/image';

import Header from '@/Components/Header/Header';
import SecondMain from '@/Components/Home/SecondMain';
import Sliders from '@/Components/Slider/Sliders';
import UserInfo from '@/Components/UserInfo/UserInfo';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';

// import Main from '@/Components/Home/Main';

export default function Home() {
  
  return (
    //
    <div>
      <Header />
      {/* <Main /> */}
      <Sliders />
      {/* <p className='font-bold text-xl'>Client side session</p> */}
      <UserInfo />
      {/* <p>Server side session</p>
      {JSON.stringify(session)} */}
      <SecondMain />
    </div>
  );
}
