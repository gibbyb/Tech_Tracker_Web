import Image from 'next/image';
import { signIn } from '~/auth';

const Sign_In_Authentik = () => {
  return (
    <form
      className='items-center justify-center mx-auto'
      action={async () => {
        'use server';
        await signIn('authentik');
      }}
    >
      <button
        type='submit'
        className='flex flex-col mx-auto text-center items-center
        bg-gradient-to-tl from-[#35363F] to=[#24191A] rounded-xl px-4 py-2 md:py-2.5
        font-semibold text-white hover:bg-gradient-to-tr hover:from-[#35363F] hover:to-[#23242F]'
      >
      <h1 className='md:text-2xl my-auto font-semibold mb-1'>
      Sign In with 
      </h1>
      <Image
        src='/images/authentik_logo.svg'
        alt='Microsoft'
        width={150}
        height={150}
      />
      </button>
    </form>
  );
};
export default Sign_In_Authentik;
