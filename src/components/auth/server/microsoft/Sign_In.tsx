import Image from "next/image";
import { signIn } from "~/auth";

export default async function Sign_In_Microsoft() {
  return (
    <form className="items-center justify-center mx-auto"
      action={async () => {
        "use server";
        await signIn("microsoft-entra-id");
      }}>
      <button type="submit" className="flex flex-row mx-auto
        bg-gradient-to-tl from-[#35363F] to=[#24191A] rounded-xl px-4 py-2 md:py-2.5
        font-semibold text-white hover:bg-gradient-to-tr hover:from-[#35363F] hover:to-[#23242F]">
        <Image src="/images/microsoft_logo.png" alt="Microsoft" width={35} height={35}
          className="mr-2"
        />
        <h1 className="md:text-2xl my-auto font-semibold">Sign In</h1>
      </button>
    </form>
  );
}
