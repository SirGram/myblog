import { useState } from "react";
import BlogPagination from "./components/BlogPagination";
import { IBlogEntry } from "@/types/types";
import BlogCard from "./components/BlogCard";
import { useBlogsQuery } from "@/api/queries";
import Layout from "@/components/Layout/Layout";

export default function Home() {
  const { data = [] } = useBlogsQuery();
  console.log(data);
  let entries: IBlogEntry[] =
    Array.isArray(data) && data.length > 0
      ? [...data].sort(
          (a, b) =>
            new Date(b.creationDate).valueOf() -
            new Date(a.creationDate).valueOf()
        )
      : data;

  entries = Array.isArray(entries)
    ? entries.filter(
        (blog) => blog && blog.published && blog.published.toString() === "true"
      )
    : [];
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 3;
  const totalPages = Math.ceil(entries.length / entriesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * entriesPerPage;
  const selectedEntries = entries.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  return (
    <Layout>
      <div className="ml-auto container   lg:pr-0 ">
        <h1 className=" font-bold py-10 pr-10 border-b-4 ">
          READ THROUGH OUR LATEST POSTS
        </h1>
        <div className="flex flex-col mb-6">
          {selectedEntries.length > 0 ? (
            selectedEntries.map((entry) => (
              <BlogCard entry={entry} key={entry._id} />
            ))
          ) : (
            <div>No entries found.</div>
          )}
        </div>

        <BlogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </Layout>
  );
}
