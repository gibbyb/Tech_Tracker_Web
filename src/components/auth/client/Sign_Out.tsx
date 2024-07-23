import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "~/components/ui/shadcn/button";

export default function Sign_Out() {
  const { data: session } = useSession();
  if (!session) {
    return <div/>;
  } else {
    const pfp = session?.user?.image ? session.user.image : "/images/default_user_pfp.png";
    return (
      <div className="flex flex-row">
        <Image src={pfp} alt="" width={35} height={35}
          className="rounded-full border-2 border-white m-auto mr-1 md:mr-2
          max-w-[25px] md:max-w-[35px]"
        />
        <Button onClick={() => signOut()}
          className="w-full p-2 rounded-xl text-sm md:text-lg"
          //bg-gradient-to-tl from-[#35363F] to=[#24191A]
          //hover:bg-gradient-to-tr hover:from-[#35363F] hover:to-[#23242F]"
        >
          Sign Out
        </Button>
      </div>
    );
  }
};

        //<User_Avatar session={session} />
