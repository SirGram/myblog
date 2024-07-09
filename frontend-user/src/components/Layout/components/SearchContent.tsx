import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IBlogEntry } from "@/types/types";
import { useBlogsQuery } from "@/api/queries";

export default function SearchContent() {
  const { data } = useBlogsQuery();
  const posts = data;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<IBlogEntry[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const results = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        post.user.fullname.toLowerCase().includes(term) ||
        post.content.toLowerCase().includes(term)
    );
    setSearchResults(results);
  };

  return (
    <div className="relative ">
      <div className="border-2 border-transparent  p-3 px-6 w-full rounded-md bg-background items-center gap-4 flex focus-within:border-primary">
        <FiSearch className="text-primary" />
        <input
          type="text"
          placeholder="Search in posts..."
          value={searchTerm}
          onChange={(e) => handleSearch(e)}
          className="w-full bg-background focus:outline-none"
        />
      </div>
      {searchTerm && (
        <div className="absolute top-14 rounded-b-md overflow-hidden bg-background w-full z-20 h-min overflow-y-auto">
          {searchResults.length > 0 ? (
            searchResults.map((post) => (
              <Link to={`/blogs/${post._id}`}>
                <div
                  key={post._id}
                  className="border-b-2 p-2 hover:bg-secondary"
                >
                  <span className="text-blue-500 hover:underline">
                    {post.title}
                  </span>
                  <p>by {post.user.username}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="p-2">No results were found.</p>
          )}
        </div>
      )}
    </div>
  );
}
