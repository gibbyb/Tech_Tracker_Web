import Link from 'next/link';
import Image from 'next/image';
import Sign_In_Microsoft from '~/components/auth/server/microsoft/Sign_In';
import Sign_In_Authentik from '~/components/auth/server/authentik/Sign_In';
import Header from '~/components/ui/Header';

export default function No_Session() {
  return (
    <main
      className='w-full min-h-screen mx-auto text-center pt-2 md:pt-10
      bg-gradient-to-b from-[#111111] to-[#212325]'
    >
      <div className='md:w-2/3 pt-4 pb-2 md:pt-10 md:pb-4 m-auto'>
        <Header />
      </div>
      <div className='mx-auto flex flex-col'>
        <div className='py-4'>
          <Sign_In_Microsoft />
        </div>
        <div className='py-4'>
          <Sign_In_Authentik />
        </div>
        <Link
          href='https://git.gibbyb.com/gib/Tech_Tracker_Web'
          className='text-center text-[16px] md:text-lg px-4 py-2 md:py-2.5 font-semibold
          bg-gradient-to-tl from-[#35363F] to=[#24191A] rounded-xl hover:text-sky-200 
          hover:bg-gradient-to-tr hover:from-[#35363F] hover:to-[#23242F]
          mx-auto flex flex-row'
        >
          <Image
            src='/images/gitea_logo.svg'
            alt='Gitea'
            width={35}
            height={35}
            className='mr-2'
          />
          <h3 className='my-auto'>Source Code</h3>
        </Link>
      </div>
    </main>
  );
}
