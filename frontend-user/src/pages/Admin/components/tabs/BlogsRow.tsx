
import { deleteBlog, toastApiCall } from "@/api/api";
import HoverAvatarCard from "@/components/HoverAvatarCard";
import { Button } from "@/components/ui/button";
import {  TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { formatDate } from "@/lib/utils";
import { IBlogEntry } from "@/types/types";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuGroup, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import BlogsNew from "./BlogsNew";

export function BlogsRow({ blog }: { blog: IBlogEntry }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
const {auth} = useAuth()
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const handleDeleteBlog = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    await toastApiCall(
      () => mutation.mutateAsync(blog._id),
      toast,
      "Failed to delete blog",
      "Blog deleted successfully",
    );
  };

  return (
    <TableRow key={blog._id}>
      <TableCell className="w-24">
        <span
          className={` rounded-lg bg-primary px-2 py-1 text-xs text-primary-foreground  ${
            blog.published && "opacity-60"
          }`}
        >
          {blog.published ? "published" : "unpublished"}
        </span>
      </TableCell>
      <TableCell>
        <HoverAvatarCard entry={blog} />
      </TableCell>
      <TableCell className="text-muted-foreground  ">
        {formatDate(new Date(blog.creationDate))}
      </TableCell>
      <TableCell className="text-muted-foreground ">
        {blog.lastEditionDate
          ? formatDate(new Date(blog.lastEditionDate))
          : "Unedited"}
      </TableCell>
      <TableCell className="text-muted-foreground">{blog.title}</TableCell>
      <TableCell>
        {blog.user._id === auth?._id &&
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]  ">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuGroup >
              <DropdownMenuSeparator />
              <div className="flex items-center w-full mt-2">
                <BlogsNew buttonText="Edit Blog" entry={blog} isEdit={true} />
              </div>
              <DropdownMenuSeparator />
              <div className="flex items-center w-full">
                <Button
                  onClick={(e) => handleDeleteBlog(e)}
                  variant={"destructive"}
                  className="w-full"
                >
                  Delete Blog
                </Button>
              </div>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>}
      </TableCell>
    </TableRow>
  );
}
