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
      <form className="w-full flex flex-row pt-4 pr-8"
        action={async () => {
          "use server"
          await signOut()
        }}>
        <Image src={pfp} alt="" width={35} height={35}
          className="rounded-full border-2 border-white m-auto mr-4"
        />
        <button type="submit" className="w-full">Sign Out</button>
      </form>
    );
  }
};
