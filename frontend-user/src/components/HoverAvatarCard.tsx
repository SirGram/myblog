import { formatDateMonthAndYear } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../components/ui/hover-card";
import { IBlogEntry } from "@/types/types";

export default function HoverAvatarCard({ entry }: { entry: IBlogEntry }) {
  console.log(entry)
  const fallback = entry.user.fullname.slice(0, 2).toUpperCase();
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">
          <Avatar className="size-8">
            <AvatarImage src={entry.user.settings?.avatarImage} />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-background">
        <div className="flex  space-x-4">
          <Avatar>
            <AvatarImage src={entry.user.settings?.avatarImage} />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
          <div className="space-y-1 flex-1">
            <h4 className="text-sm font-semibold">{entry.user.fullname}</h4>
            <p className="text-sm">
              {entry.user.settings?.about || "Nothing to say"}
            </p>
            <div className=" items-center pt-2 flex justify-end">
              <span className="text-xs text-muted-foreground ">
                Joined{" "}
                {formatDateMonthAndYear(new Date(entry.user.registrationDate))}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
