import { IBlogEntry } from "@/types/types";
import { Link } from "react-router-dom";

export default function TopPosts({ topPosts }: { topPosts: IBlogEntry[] }) {
    return (
      <div>
        <h2 className=" font-semibold mb-4">TOP ENTRIES</h2>
        {topPosts.map((post, index) => (
          <div
            key={index}
            className=" mb-4 pb-2  border-b-4 border-ring flex gap-3 items-center h-auto "
          >
            <Link to={`/blogs/${post._id}`}>
              <span className="font-medium w-full overflow-hidden  overflow-ellipsis hover:underline opacity-80">
                {post.title}
              </span>
            </Link>
          </div>
        ))}
      </div>
    );
  }