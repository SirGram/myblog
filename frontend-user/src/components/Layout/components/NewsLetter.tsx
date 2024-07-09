import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function NewsLetter() {
  const {toast} = useToast()
  const [hasAlreadyJoined, setHasAlreadyJoined] = useState(false);
  const handleJoin = () => {
    if (hasAlreadyJoined) {
      toast({
        title: "You have already joined the newsletter!",
        variant: "destructive",
      });
    } else {
      setHasAlreadyJoined(true);
      toast({
        title: "Successfully joined newsletter!",
      });
    }
  };
    return (
      <article className="flex flex-col justify-between h-10">
        <h2 className=" font-semibold mb-4 ">JOIN OUR NEWSLETTER</h2>
        <div className="w-full h-full flex gap-2 items-center">
          <Input
            type="text"
            className="border-none h-full  "
            placeholder="Enter email"
          />
          <Button className="h-full w-auto text-background font-bold"  onClick={handleJoin}>
          Join
          </Button>
        </div>
      </article>
    );
  }