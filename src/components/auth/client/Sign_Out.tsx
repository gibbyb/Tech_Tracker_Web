import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/shadcn/dropdown-menu';

export default function Sign_Out() {
  const { data: session } = useSession();
  if (!session) {
    return <div />;
  } else {
    const pfp = session?.user?.image
      ? session.user.image
      : '/images/default_user_pfp.png';
    const name = session?.user?.name ? session.user.name : 'Profile';
    return (
      <div className='m-auto mt-1'>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image
              src={pfp}
              alt=''
              width={35}
              height={35}
              className='rounded-full border-2 border-white m-auto mr-1 md:mr-2
              max-w-[25px] md:max-w-[35px]'
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button onClick={() => signOut()} className='w-full'>
                Sign Out
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
}
