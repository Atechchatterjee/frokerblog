"use client";
import Navbar from "@/components/Navbar";
import Tiptap from "@/components/Tiptap";
import {
  fetchDummyImages,
  fetchSpecificDummyImage,
  parseJSONSafely,
} from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Blog({
  params,
  searchParams,
}: {
  params: { [slug: string]: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const [blog, setBlog] = useState<any>();
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    (async () => {
      return fetch(`http://localhost:8000/fetch-blog/?id=${params.id}`, {
        method: "GET",
      });
    })().then(async (res) => {
      setBlog(await res.json());
    });
    if (searchParams && typeof searchParams["id"] === "string")
      fetchSpecificDummyImage(parseInt(searchParams["id"])).then(
        (data: any) => {
          setImage(data.photo.url);
        }
      );
    else
      fetchDummyImages(1).then((data: any) => {
        setImage(data.photos[0].url);
      });
  }, []);

  return (
    <main>
      <Navbar />
      <div className="flex flex-col gap-5 mt-[10rem] px-32">
        <img src={image} className="w-full h-[30rem] object-cover" />
        {!!blog ? (
          <>
            <h1 className="text-xl font-semibold">{blog.title}</h1>
            <Tiptap
              content={parseJSONSafely(blog.description) ?? ""}
              editable={false}
            />
          </>
        ) : (
          <p>...loading</p>
        )}
      </div>
    </main>
  );
}
