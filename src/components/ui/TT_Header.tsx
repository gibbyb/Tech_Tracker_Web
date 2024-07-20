import Image from "next/image";

export default function TT_Header() {
  return (
    <header className="w-full py-5">
      <div className="flex flex-row items-center text-center justify-center p-8">
        <Image src="/images/tech_tracker_logo.png"
          alt="Tech Tracker Logo" width={100} height={100}
        />
        <h1 className="title-text text-8xl font-bold pl-12
          bg-gradient-to-r from-[#bec8e6] via-[#F0EEE4] to-[#FFF8E7]
          text-transparent bg-clip-text">
          Tech Tracker
        </h1>
      </div>
    </header>
  );
};
