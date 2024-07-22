import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full py-2 pt-6 md:py-5">
      <div className="flex flex-row items-center text-center
        sm:justify-center ml-4 sm:ml-0 p-4">
        <Image src="/images/tech_tracker_logo.png"
          alt="Tech Tracker Logo" width={100} height={100}
          className="max-w-[40px] md:max-w-[120px]"
        />
        <h1 className="title-text text-sm md:text-4xl lg:text-8xl
          bg-gradient-to-r from-[#bec8e6] via-[#F0EEE4] to-[#FFF8E7]
          font-bold pl-2 md:pl-12 text-transparent bg-clip-text">
          Tech Tracker
        </h1>
      </div>
    </header>
  );
};
