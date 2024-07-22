import Link from "next/link";
import Image from "next/image";
import Sign_In from "~/components/auth/Sign_In";
import Header from "~/components/ui/Header";

export default function No_Session() {
  return (
    <main className="w-full min-h-screen mx-auto text-center pt-2 md:pt-10
      bg-gradient-to-b from-[#111111] to-[#212325]">
      <div className="w-2/3 pt-4 pb-2 md:pt-8 md:pb-4 m-auto">
        < Header />
      </div>
      < Sign_In />
      <div className="w-5/6 mx-auto flex flex-col">
        <h3 className="text-center text-[16px] md:text-lg italic pt-4">
          You must have a Gulfport Microsoft 365 Account to sign in.
        </h3>
        <Link href="https://authjs.dev/getting-started/providers/microsoft-entra-id"
          className="text-center text-[16px] md:text-lg italic pt-4 pb-4 text-sky-200
          hover:text-sky-300"
        >
          Tech Tracker uses Auth.js and Microsoft Entra ID for Authentication
        </Link>
        <Link href="https://git.gibbyb.com/gib/Tech_Tracker_Web"
          className="text-center text-[16px] md:text-lg px-4 py-2 md:py-2.5 font-semibold
          bg-gradient-to-tl from-[#35363F] to=[#24191A] rounded-xl hover:text-sky-200 
          hover:bg-gradient-to-tr hover:from-[#35363F] hover:to-[#23242F]
          mx-auto flex flex-row mt-4"
        >
          <Image src="/images/gitea_logo.svg" alt="Gitea" width={35} height={35}
            className="mr-2"
          />
          <h3 className="my-auto">View Source Code</h3>
        </Link>
    </div>
    </main>
  );
};
