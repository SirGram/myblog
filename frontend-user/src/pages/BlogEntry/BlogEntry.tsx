import Layout from "@/components/Layout/Layout";
import { formatDate } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import { BiLike, BiSolidLike } from "react-icons/bi";
import HoverAvatarCard from "@/components/HoverAvatarCard";
import { IBlogEntry } from "@/types/types";
import { useBlogQuery } from "@/api/queries";
import AdjustedMarkdown from "@/components/AdjustedMarkdown";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  addComment,
  deleteComment,
  downvoteBlog,
  toastApiCall,
  upvoteBlog,
} from "@/api/api";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

function Comments({ entry }: { entry: IBlogEntry }) {
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState("");
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  const queryClient = useQueryClient();
  const addCommentMutation = useMutation({
    mutationFn: ({
      blogId,
      content,
      username,
    }: {
      blogId: string;
      content: string;
      username?: string;
    }) => addComment(blogId, content, username),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs", entry._id] });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (id: string) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs", entry._id] });
    },
  });

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    await toastApiCall(
      () =>
        addCommentMutation.mutateAsync({
          blogId: entry._id,
          content: newComment,
          username,
        }),
      toast,
      "Failed to create comment",
      "Comment created successfully"
    );
    setNewComment("");
    setUsername("");
  };

  const handleDeleteComment = async (id: string) => {
    await toastApiCall(
      () => deleteCommentMutation.mutateAsync(id),
      toast,
      "Failed to create comment",
      "Comment created successfully"
    );
  };
  console.log(entry);
  return (
    <article className="flex flex-col justify-between ">
      <h2 className="font-semibold mb-4">{`(${
        entry.comments?.length || 0
      }) COMMENTS`}</h2>

      {entry.comments?.map((comment, index) => (
        <div key={index} className="mb-2 p-2 border rounded">
          <span>
            <b>{comment.user || "Anonymous"} </b>
            wrote:
          </span>
          <p className="ml-2">{comment.content}</p>
          {isAuthenticated && (
            <div className="mt-2 flex justify-end">
              <Button
                onClick={() => handleDeleteComment(comment._id)}
                variant={"destructive"}
                className="ml-auto hover:opacity-80"
              >
                Delete Comment
              </Button>
            </div>
          )}
        </div>
      ))}
      <form onSubmit={handleCommentSubmit} className="my-4">
        <Input
          className="mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Cool_guy100"
        />
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="mb-2"
        />
        <div className="flex justify-end">
          <Button type="submit" className="ml-auto ">
            Submit Comment
          </Button>
        </div>
      </form>
    </article>
  );
}

function BreadCrumbContainer({ id }: { id: string }) {
  return (
    <Breadcrumb className="text-muted mb-4 mx-2 ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/home" className="hover:bg-secondary p-2">
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <span>Entries</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <span>{id}</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default function BlogEntry() {
  const { id } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: entry } = useBlogQuery(id);

  const [clientId] = useState(() => {
    let storedClientId = localStorage.getItem("clientId");
    if (!storedClientId) {
      storedClientId = uuidv4();
      localStorage.setItem("clientId", storedClientId);
    }
    return storedClientId;
  });

  const [hasUpvoted, setHasUpvoted] = useState(false);

  useEffect(() => {
    if (id) {
      const upvotedKey = `upvoted_${id}`;
      setHasUpvoted(localStorage.getItem(upvotedKey) === "true");
    }
  }, [id]);

  const toggleUpvoteMutation = useMutation({
    mutationFn: ({
      blogId,
      clientId,
      isUpvoting,
    }: {
      blogId: string;
      clientId: string;
      isUpvoting: boolean;
    }) =>
      isUpvoting
        ? upvoteBlog(blogId, clientId)
        : downvoteBlog(blogId, clientId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["blogs", id] });
      setHasUpvoted(variables.isUpvoting);
      if (id) {
        localStorage.setItem(`upvoted_${id}`, variables.isUpvoting.toString());
      }
    },
  });

  const handleToggleVote = async () => {
    if (!id) return;
    const isUpvoting = !hasUpvoted;
    await toastApiCall(
      () =>
        toggleUpvoteMutation.mutateAsync({ blogId: id, clientId, isUpvoting }),
      toast,
      isUpvoting ? "Failed to upvote blog" : "Failed to remove upvote",
      isUpvoting ? "Blog upvoted successfully" : "Upvote removed successfully"
    );
  };
  if (!entry) return <h1>No entry was found</h1>;

  return (
    <Layout showAside={false}>
      <section className="max-w-screen-lg w-full py-6 ">
        <BreadCrumbContainer id={entry._id} />
        <header className="mb-10 py-6 border-b-4   p-4 ">
          <h1 className="mb-10 font-bold text-ring">{entry.title}</h1>
          <div className="w-full mb-4">
            <img
              src={entry.image}
              alt="Entry"
              className="w-full h-auto rounded-md "
            />
          </div>
          <div className="flex gap-1 items-center w-full justify-center">
            <HoverAvatarCard entry={entry} />
            <p className="text-muted-foreground flex items-center gap-2">
              <span title="created on">
                Created on: {formatDate(new Date(entry.creationDate))}
              </span>
              {entry.lastEditionDate && (
                <>
                  <span className="h-6 w-px bg-muted-foreground"></span>
                  <span title="last edition">
                    Last Edition: {formatDate(new Date(entry.creationDate))}
                  </span>
                </>
              )}
            </p>
          </div>
        </header>
        <div className="container">
          <div className="mb-6 min-h-dvh p-2 pr-6">
            <AdjustedMarkdown children={entry.content} />
          </div>
          <div className="flex flex-col w-full justify-between py-4">
            <div className="flex items-center text-2xl mb-2">
              <span>{entry.likes}</span>
              <button
                className="text-2xl m-2 font-bold"
                onClick={handleToggleVote}
              >
                {hasUpvoted ? <BiSolidLike /> : <BiLike />}
              </button>
            </div>
          </div>
          <div className="border-t-4 mb-4  pt-4">
            <Comments entry={entry} />
          </div>
        </div>
      </section>
    </Layout>
  );
}
