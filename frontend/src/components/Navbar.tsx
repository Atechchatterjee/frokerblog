import Image from "next/image";

export default function Navbar() {
  return (
    <div className="flex gap-2 py-4 px-32 w-full items-center bg-white fixed top-0 left-0">
      <Image src="/froker-logo.png" alt="froker-logo" height={57} width={115} />
      <div className="flex gap-10 ml-auto text-primary text-xl">
        <a href="/">Home</a>
        <a href="/post-blog">Blogs</a>
        <a href="#">Discover Froker</a>
      </div>
    </div>
  );
}
