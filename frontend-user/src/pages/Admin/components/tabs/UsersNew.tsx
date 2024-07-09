import { createUser, toastApiCall } from "@/api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet,SheetTrigger, SheetHeader,SheetDescription,SheetTitle, SheetFooter, SheetClose, SheetContent } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function UsersNew() {
    const [formData, setFormData] = useState({
      username: "",
      password: "",
      fullname: "",
      email: "",
    });
    const {toast} = useToast()
    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: createUser,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    });
    const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("try");
      await toastApiCall(
        () => mutation.mutateAsync(formData),
        toast,
        "Failed to create user",
        "User created successfully",
      );
    };
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button className="mt-4 w-full">New Admin</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>New Admin</SheetTitle>
            <SheetDescription>Add administrator to the database</SheetDescription>
          </SheetHeader>
          <form
            className="flex flex-col mt-4 mb-4"
            onSubmit={(e) => handleSubmit(e)}
          >
            <Label htmlFor="fullname" className="text-left mb-3">
              Fullname
              <Input
                id="fullname"
                placeholder="Pedro Duarte"
                value={formData.fullname}
                onChange={(e) => handleFormData(e)}
                className="mt-2"
                required
              />
            </Label>
  
            <Label htmlFor="fullname" className="text-left  mb-3">
              Username
              <Input
                id="username"
                placeholder="duarte123"
                value={formData.username}
                onChange={(e) => handleFormData(e)}
                className="mt-2"
                required
              />
            </Label>
  
            <Label htmlFor="email" className="text-left  mb-3">
              Email
              <Input
                id="email"
                type="email"
                placeholder="duarte@example.com"
                value={formData.email}
                onChange={(e) => handleFormData(e)}
                className="mt-2"
                required
              />
            </Label>
  
            <Label htmlFor="password" className="text-left mb-3">
              Password
              <Input
                id="password"
                type="password"
                placeholder="mypassword"
                value={formData.password}
                onChange={(e) => handleFormData(e)}
                className="mt-2"
                required
              />
            </Label>
  
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    );
  }