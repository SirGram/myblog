import { formatDate } from "@/lib/utils";
import { Link } from "react-router-dom";
import { BiComment, BiLike } from "react-icons/bi";
import HoverAvatarCard from "@/components/HoverAvatarCard";
import { IBlogEntry } from "@/types/types";
export default function BlogCard({ entry }: { entry: IBlogEntry }) {
  return (
    <article className="flex flex-col md:flex-row items-center py-6 px-2 border-b-2 w-full hover:bg-primary hover:text-background ease-linear transition-all duration-150">
      {/* Left side:*/}
      <div className="w-36 h-20 object-cover">
        <img
          src={entry.image}
          alt="Entry"
          className="w-full h-full object-cover rounded-md -skew-x-6"
        />
      </div>
      {/* Right side: */}
      <div className="flex flex-col justify-between mx-6 flex-1 ">
        <Link className="flex my-2" to={`/blogs/${entry._id}`}>
          <h2 className="text-xl hover:underline break-words">{entry.title}</h2>
        </Link>

        <footer className="flex gap-3  items-center justify-between">
          <div className="flex gap-3 items-center justify-between">
            <p className="flex items-center h-10">
              <HoverAvatarCard entry={entry} />
              {formatDate(new Date(entry.creationDate))}
            </p>
          </div>
          <span className="flex items-center gap-1">
            {entry.likes} <BiLike />
            {entry.comments.length} <BiComment />
          </span>
        </footer>
      </div>
    </article>
  );
}
