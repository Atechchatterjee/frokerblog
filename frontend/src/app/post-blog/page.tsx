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
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface BlogPost {
  title: string;
  description: string;
}

export default function PostBlog() {
  const form = useForm<BlogPost>({
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const [clearDescription, setClearDescription] = useState<boolean>(false);

  async function handleSubmit() {
    try {
      const response = await fetch("http://localhost:8000/create-blogpost", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.getValues("title"),
          description: form.getValues("description"),
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
      <Card className="mt-[10rem] max-w-[55rem] min-w-[40rem] mx-auto p-4">
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
