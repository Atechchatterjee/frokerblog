"use client";
import Navbar from "@/components/Navbar";
import Tiptap from "@/components/Tiptap";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SERVER_URL } from "@/lib/constants";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface BlogPost {
  title: string;
  description: string;
  author: string;
  duration: number;
}

export default function PostBlog() {
  const form = useForm<BlogPost>({
    defaultValues: {
      title: "",
      description: "",
      author: "",
      duration: 0,
    },
  });
  const [clearDescription, setClearDescription] = useState<boolean>(false);

  async function handleSubmit() {
    try {
      const response = await fetch(`${SERVER_URL}/create-blogpost`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.getValues("title"),
          description: form.getValues("description"),
          author: form.getValues("author"),
          duration: form.getValues("duration"),
        }),
      });
      console.log({ response });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main>
      <Navbar />
      <h1 className="mt-[8rem] text-2xl text-center font-semibold">
        Create Blog Post
      </h1>
      <Card className="mt-[2rem] max-w-[55rem] min-w-[40rem] mx-auto p-4 mb-[3rem]">
        <FormProvider {...form}>
          <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>

                  <FormControl>
                    <Input placeholder="title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Tiptap
                      placeholder="description"
                      content={field.value}
                      onChange={field.onChange}
                      clear={clearDescription}
                      setClear={(clearValue: boolean) => {
                        setClearDescription(clearValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>

                  <FormControl>
                    <Input placeholder="author" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (in mins)</FormLabel>

                  <FormControl>
                    <Input placeholder="duration" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <span className="psuedo-element h-2"></span>
            <Button type="submit" className="w-[6rem] ml-auto">
              Submit
            </Button>
          </form>
        </FormProvider>
      </Card>
    </main>
  );
}
