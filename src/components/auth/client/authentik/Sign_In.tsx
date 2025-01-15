import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/shadcn/button";

export default function Sign_In_Authentik() {
  return (
    <Button
      onClick={() => signIn('authentik')}
      className="bg-gradient-to-tl from-[#35363F] to=[#24191A] rounded-xl
        px-4 py-2 md:py-2.5 font-semibold text-white hover:bg-gradient-to-tr
        hover:from-[#35363F] hover:to-[#23242F]"
    >
      <h1 className="md:text-2xl my-auto font-semibold">Sign In</h1>
    </Button>
  );
};
