"use client";
import Navbar from "@/components/Navbar";
import Tiptap from "@/components/Tiptap";
import {
  fetchDummyImages,
  fetchSpecificDummyImage,
  parseJSONSafely,
} from "@/lib/utils";
import { useEffect, useState } from "react";
import { LuClock10 } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useCookies } from "react-cookie";
import { SERVER_URL } from "@/lib/constants";

export default function Blog({
  params,
  searchParams,
}: {
  params: { [slug: string]: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const [blog, setBlog] = useState<any>();
  const [image, setImage] = useState<string>("");
  const [cookies, setCookies] = useCookies(["likes"]);
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    const exisitingCookie = cookies.likes;
    if (blog && exisitingCookie[blog._id] === "1") {
      setLiked(true);
    } else setLiked(false);
  }, [blog]);

  useEffect(() => {
    (async () => {
      return fetch(`${SERVER_URL}/fetch-blog/?id=${params.id}`, {
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

  async function updateLikes(noLikes: number) {
    try {
      await fetch(`${SERVER_URL}/update-likes?id=${blog._id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: noLikes,
        }),
      });
      setBlog({ ...blog, likes: parseInt(blog.likes) + 1 });
      return Promise.resolve();
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  }

  function handleLikeIncrement() {
    const exisitingCookie = cookies.likes;
    if (exisitingCookie[blog._id] === "1") {
      alert("you already liked");
    } else {
      updateLikes(parseInt(blog.likes) + 1).then(() => {
        setCookies(
          "likes",
          JSON.stringify({
            ...exisitingCookie,
            [blog._id]: "1",
          })
        );
        setLiked(true);
      });
    }
  }

  return (
    <main>
      <Navbar />
      <div className="flex flex-col gap-5 mt-[10rem] px-32">
        <img src={image} className="w-full h-[30rem] object-cover" />
        {!!blog ? (
          <>
            <div className="flex gap-5 items-center">
              <span className="text-primary">by {blog.author}</span>
              <span className="flex gap-2 text-primary items-center">
                <LuClock10 />
                {blog.duration} min read.
              </span>
              <div className="ml-auto flex gap-3 items-center font-medium">
                <Button
                  className="rounded-full"
                  disabled={liked}
                  onClick={handleLikeIncrement}
                >
                  {liked ? <FaHeart /> : <FaRegHeart />}
                </Button>
                {blog.likes} likes
              </div>
            </div>
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
