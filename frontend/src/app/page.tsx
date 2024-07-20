"use client";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

export default function Home() {
  const [blogs, setBlogs] = useState<any[]>();
  useEffect(() => {
    (async () => {
      return fetch("http://localhost:8000/fetch-all-blogs", {
        method: "GET",
      });
    })().then(async (res) => {
      const data = await res.json();
      setBlogs(data);
    });
  }, []);
  return (
    <main className="w-full">
      <Navbar />
      <section className="flex flex-col gap-5">
        <h1 className="text-3xl text-black  mt-[12rem] text-center">
          <span className="text-primary">FROKER</span> BLOG
        </h1>
        <p className="text-[#3D3D3D] text-5xl text-center leading-normal">
          Articles covering the most recent
          <br /> updates and advancements
        </p>
        <pre>{JSON.stringify(blogs)}</pre>
      </section>
    </main>
  );
}
