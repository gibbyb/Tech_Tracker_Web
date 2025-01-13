import Image from "next/image";
import { auth } from "~/auth"
import { signOut } from "~/auth"
 
export default async function Sign_Out() {
  const session = await auth();
  if (!session) {
    return (<div/>);
  } else {
    // Add User profile picture next to Sign Out button
    const pfp = session?.user?.image ? session.user.image : "/images/default_user_pfp.png";
    return (
      <form className="flex flex-row"
        action={async () => {
          "use server"
          await signOut()
        }}>
        <Image src={pfp} alt="" width={35} height={35}
          className="rounded-full border-2 border-white m-auto mr-1 md:mr-2
          max-w-[25px] md:max-w-[35px]"
        />
        <button type="submit" className="w-full p-2 rounded-xl text-sm md:text-lg
          bg-gradient-to-tl from-[#35363F] to=[#24191A]
          hover:bg-gradient-to-tr hover:from-[#35363F] hover:to-[#23242F]"
        >
          Sign Out
        </button>
      </form>
    );
  }
};
