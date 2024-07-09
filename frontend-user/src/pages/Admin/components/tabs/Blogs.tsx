import { useBlogsQuery } from "@/api/queries";
import { Table,TableHeader, TableHead, TableBody, TableRow } from "@/components/ui/table";
import { BlogsRow } from "./BlogsRow";
import BlogsNew from "./BlogsNew";

export default function Blogs() {
    const { data } = useBlogsQuery();
    const blogs = data;
    return (
      <section className="flex flex-col">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>State</TableHead>
              <TableHead>Creator</TableHead>
              <TableHead>Creation</TableHead>
              <TableHead>Last Edition</TableHead>
              <TableHead>Title</TableHead>  
              <TableHead>Options</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog) => (
              <BlogsRow blog={blog} />
            ))}
          </TableBody>{" "}
        </Table>
        <div className="w-full flex justify-end mt-4">
          <div className="w-24">
            <BlogsNew />
          </div>
        </div>
      </section>
    );
  }