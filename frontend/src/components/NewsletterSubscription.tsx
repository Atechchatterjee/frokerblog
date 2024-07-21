import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

export default function NewsLetterSubscription() {
  return (
    <Card className="w-[70rem] mx-auto px-10 py-7 items-center flex gap-4 mb-[5rem]">
      <img
        src="https://res.cloudinary.com/dapbrn8a9/image/upload/v1706767740/Frokerassets/OBJECTS_lpey0b.png"
        className="max-w-[20rem]"
      />
      <div className="flex flex-col gap-7">
        <h3 className="text-3xl font-semibold flex-1">
          Subscribe to our newsletter to get the latest updates and news
        </h3>
        <div className="flex flex-1 gap-0">
          <Input placeholder="Enter your email" className="rounded-l-full" />
          <Button className="rounded-r-full">Subscribe</Button>
        </div>
      </div>
    </Card>
  );
}
