import { signIn } from "~/auth";

export default async function Sign_In() {
  return (
    <form className="w-full"
      action={async () => {
        "use server";
        await signIn("microsoft-entra-id");
      }}>
      <button type="submit" className="w-full">Sign In</button>
    </form>
  );
}
