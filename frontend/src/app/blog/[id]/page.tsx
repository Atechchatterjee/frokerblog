"use client";
import Navbar from "@/components/Navbar";
import Tiptap from "@/components/Tiptap";
import { useEffect, useState } from "react";

export default function Blog({
  params,
}: {
  params: { [slug: string]: string };
}) {
  const [blog, setBlog] = useState<any>();

  useEffect(() => {
    (async () => {
      return fetch(`http://localhost:8000/fetch-blog/?id=${params.id}`, {
        method: "GET",
      });
    })().then(async (res) => {
      setBlog(await res.json());
    });
  }, []);

  function parseJSONSafely(content: string) {
    try {
      let parsedJSON = JSON.parse(content);
      return parsedJSON;
    } catch (err) {
      console.error(err);
      return {};
    }
  }

  return (
    <main>
      <Navbar />
      <div className="flex flex-col gap-5 mt-[10rem] px-32">
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
