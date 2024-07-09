import { createBlog, updateBlog, toastApiCall } from "@/api/api";
import AdjustedMarkdown from "@/components/AdjustedMarkdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SheetTrigger,
  SheetContent,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { IBlogEntry } from "@/types/types";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Sheet } from "@/components/ui/sheet";
import { useState } from "react";
import HoverCardMarkdownHelp from "../HoverCardMarkdownHelp";
import BlogsNewStatus from "./BlogsNewStatus";

type FormDataType = {
  title: string;
  content: string;
  published: boolean;
  image: string;
};

export default function BlogsNew({
  entry,
  buttonText = "New Blog",
  isEdit = false,
}: {
  entry?: IBlogEntry;
  buttonText?: string;
  isEdit?: boolean;
}) {
  const [formData, setFormData] = useState<FormDataType>({
    title: entry?.title || "",
    content: entry?.content || "",
    published: entry?.published || false,
    image: entry?.image || "",
  });
  const { auth } = useAuth();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
  const mutation2 = useMutation({
    mutationFn: updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const [errors, setErrors] = useState({
    title: "",
    content: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
    // Validate input
    if (id === "title") {
      if (value.length < 5) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          title: "Title must be at least 5 characters long.",
        }));
      } else if (value.length > 120) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          title: "Title must be no more than 120 characters long.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          title: "",
        }));
      }
    }

    if (id === "content") {
      if (value.length < 200) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          content: "Content must be at least 200 characters long.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          content: "",
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errors.title || errors.content) {
      toast({
        title: "Failed Validation",
        description: errors?.title || errors?.content,
        variant: "destructive",
      });
      return;
    }
    if (!auth || (isEdit && !entry?._id)) return;
    await toastApiCall(
      () =>
        !isEdit
          ? mutation.mutateAsync({ ...formData, userId: auth._id })
          : mutation2.mutateAsync({
              ...formData,
              userId: auth._id,
              blogId: entry?._id || "",
              lastEditionDate: new Date(),
            }),
      toast,
      isEdit ? "Failed to update blog" : "Failed to create blog",
      isEdit ? "Blog updated succesfully" : "Blog created successfully",
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className=" w-full" variant={"secondary"}>{buttonText}</Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="flex overflow-scroll  h-full w-full flex-col "
      >
        <Tabs defaultValue="edit">
          <TabsList className="grid w-[20rem]  grid-cols-2">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="edit" className="p-2 flex flex-col  ">
            {errors.title && <p className="text-red-500">{errors.title}</p>}
            {errors.content && <p className="text-red-500">{errors.content}</p>}
            <form className="flex-grow" onSubmit={(e) => handleSubmit(e)}>
              <div className="flex gap-2 w-full  items-end">
                <Label htmlFor="image" className="text-left mb-2 w-full">
                  Image Url
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => handleChange(e)}
                    className="mt-2 w-full flex-1"
                    placeholder="http://i.imgur/4aef3.jpg"
                  />
                </Label>

                <SheetFooter className="mb-2 flex place-items-end">
                  <BlogsNewStatus
                    formData={formData}
                    setFormData={setFormData}
                  />
                  <SheetClose asChild>
                    <Button type="submit">
                      {!isEdit ? "Post blog" : "Edit blog"}
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </div>
              <Label htmlFor="title" className="text-left mb-2 w-full">
                Title
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange(e)}
                  className="mt-2 w-full flex-1"
                  required
                  minLength={5}
                  maxLength={120}
                />
              </Label>
              <Label htmlFor="content" className="text-left">
                Markdown Content
                <HoverCardMarkdownHelp />
                <Textarea
                  onChange={(e) => handleChange(e)}
                  id="content"
                  value={formData.content}
                  className="mt-2 h-40"
                  required
                  minLength={200}
                />
              </Label>
            </form>
          </TabsContent>
          <TabsContent value="preview" className="flex flex-col ">
            <h1 className="mb-6">{formData.title}</h1>
            <div className="flex-grow ">
              <AdjustedMarkdown children={formData.content} />
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
