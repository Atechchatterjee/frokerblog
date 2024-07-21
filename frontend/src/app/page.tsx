"use client";
import Navbar from "@/components/Navbar";
import NewsLetterSubscription from "@/components/NewsletterSubscription";
import Tiptap from "@/components/Tiptap";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SERVER_URL } from "@/lib/constants";
import { parseJSONSafely, fetchDummyImages } from "@/lib/utils";
import { useEffect, useState } from "react";
import { CookiesProvider } from "react-cookie";

export default function Home() {
  const [pinnedBlogs, setPinnedBlogs] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [currentPageCount, setCurrentPageCount] = useState<number>(1);
  const size = 3;

  async function fetchAllBlogs(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(
          `${SERVER_URL}/fetch-all-blogs?page=${currentPageCount}&size=${size}&pinned=3`,
          {
            method: "GET",
          }
        );
        const data: any[] = await res.json();
        resolve(data);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }

  useEffect(() => {
    fetchAllBlogs()
      .then((data) => {
        if (currentPageCount === 1) {
          setPinnedBlogs(data.filter((_, i) => i < 3));
          setBlogs(data.filter((_, i) => i >= 3));
        } else {
          setBlogs(data);
        }
      })
      .catch(console.error);

    fetchDummyImages(size + 3)
      .then((data: any) => {
        setImages(
          data.photos.map((photo: any) => {
            return photo.url;
          })
        );
      })
      .catch(console.error);
  }, [currentPageCount]);

  function handlePageNavigationPrev() {
    if (currentPageCount !== 1) {
      setCurrentPageCount((currentPageCount) => currentPageCount - 1);
    }
  }

  function handlePageNavigationNext() {
    setCurrentPageCount((currentPageCount) => currentPageCount + 1);
  }

  return (
    <CookiesProvider>
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
          <div className="flex flex-1 gap-2 w-[70rem] mx-auto mt-[2rem]">
            {pinnedBlogs && pinnedBlogs.length > 0 && (
              <Card className="flex flex-1 flex-col gap-4 p-4">
                <img
                  src={images[0]}
                  alt={"img-1"}
                  className="flex-1 max-h-[20rem]"
                />
                <div className="flex-col flex-1">
                  <a href={`/blog/${pinnedBlogs[0]._id}?id=${11}`}>
                    <p className="line-clamp-1 max-h-[5rem] overflow-clip">
                      <h1 className="text-xl font-medium hover:text-primary">
                        {pinnedBlogs[0].title}
                      </h1>
                    </p>
                  </a>

                  <p className="line-clamp-1 max-h-[5rem] overflow-clip">
                    <Tiptap
                      content={parseJSONSafely(pinnedBlogs[0].description)}
                      editable={false}
                    />
                  </p>

                  <a
                    href={`/blog/${pinnedBlogs[0]._id}?id=${11}`}
                    className="text-primary font-medium underline underline-offset-4"
                  >
                    Read More...
                  </a>
                </div>
              </Card>
            )}
            {pinnedBlogs && pinnedBlogs.length > 1 && (
              <div className="flex flex-1 flex-col gap-3 items-center">
                {pinnedBlogs
                  .filter((_, i) => i > 0)
                  .map((pinnedBlog, i) => (
                    <Card className="flex flex-1 gap-3 p-4 py-auto">
                      <img
                        src={images[i + 1]}
                        alt={"img-2"}
                        className="flex-1 h-fit w-32"
                      />
                      <div className="flex flex-1 flex-col gap-3 items-start">
                        <a href={`/blog/${pinnedBlog._id}?id=${i + 10 + 2}`}>
                          <p className="line-clamp-2 max-h-[5rem] overflow-clip">
                            <h1 className="text-lg font-medium hover:text-primary">
                              {pinnedBlog.title}
                            </h1>
                          </p>
                        </a>
                        <p className="line-clamp-1 max-h-[5rem] overflow-clip">
                          <Tiptap
                            content={parseJSONSafely(pinnedBlog.description)}
                            editable={false}
                            textMode
                          />
                        </p>
                        <a
                          href={`/blog/${pinnedBlog._id}?id=${i + 10 + 2}`}
                          className="text-primary font-medium underline underline-offset-4"
                        >
                          Read More...
                        </a>
                      </div>
                    </Card>
                  ))}
              </div>
            )}
          </div>
          <div className="flex flex-col w-[70rem] mx-auto mt-[2rem]">
            <h2 className="text-4xl font-medium mb-[2rem]">Recent Post</h2>
            <div className="grid grid-cols-3 gap-4">
              {blogs?.map((blog, i) => (
                <Card className="flex flex-col p-4 gap-4 max-w-[30rem] max-h-[30rem]">
                  <img
                    src={images[i + 3]}
                    alt={`img-${i}`}
                    className="flex flex-1 max-h-[15rem]"
                  />
                  <div className="flex flex-4 flex-col gap-4">
                    <a href={`/blog/${blog._id}?id=${i + 3 + 10 + 1}`}>
                      <h1 className="text-xl font-medium hover:text-primary">
                        {blog.title}
                      </h1>
                    </a>
                    <p className="line-clamp-1 max-h-[5rem] overflow-clip">
                      <Tiptap
                        content={parseJSONSafely(blog.description)}
                        editable={false}
                        textMode
                      />
                    </p>
                    <a
                      href={`/blog/${blog._id}?id=${i + 3 + 10 + 1}`}
                      className="text-primary font-medium underline underline-offset-4"
                    >
                      Read More...
                    </a>
                  </div>
                </Card>
              ))}
            </div>
            <div className="flex gap-2 mx-auto mt-[2rem] mb-[2rem]">
              <Button
                variant="ghost"
                onClick={handlePageNavigationPrev}
                disabled={currentPageCount === 1}
              >
                prev
              </Button>
              <Button
                variant="ghost"
                onClick={handlePageNavigationNext}
                disabled={
                  !blogs ||
                  (blogs && (blogs.length === 0 || blogs.length < size))
                }
              >
                next
              </Button>
            </div>
          </div>
          <NewsLetterSubscription />
        </section>
      </main>
    </CookiesProvider>
  );
}
