import Sign_In from "./Sign_In";

export default function No_Session() {
  return (
    <div className="w-2/3 mx-auto text-center pt-10">
      <h1 className="text-2xl font-semibold">Unauthorized. Please sign in first.</h1>
      < Sign_In />
    </div>
  );
};
