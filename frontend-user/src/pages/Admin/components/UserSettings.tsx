import { deleteUser, toastApiCall, updateUser } from "@/api/api";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/context/AuthContext";
import { IUser } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetTrigger,
  SheetHeader,
  SheetDescription,
  SheetTitle,
  SheetContent,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function UserSettings() {
  const { auth } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<IUser>>({
    username: auth?.username || "",
    fullname: auth?.fullname || "",
    email: auth?.email || "",
    settings: {
      about: auth?.settings.about || "",
      avatarImage: auth?.settings.avatarImage || "",
    },
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user blogs"] });
    },
  });

  const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleFormDataSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      settings: { [id]: value },
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault;
      if (!auth?._id) return;
      await toastApiCall(
        () => mutation.mutateAsync({ userId: auth._id, ...formData }),
        toast,
        "Failed to update user profile",
        "User profile updated successfully"
      );
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteAccount = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault;
      if (!auth?._id) return;
      await toastApiCall(
        () => deleteMutation.mutateAsync(auth._id),
        toast,
        "Failed to delete user profile",
        "User profile deleted successfully"
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-fit" variant={"secondary"}>
          SETTINGS
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader className="mb-4">
          <SheetTitle>Change Settings</SheetTitle>
          <SheetDescription>Update user settings</SheetDescription>
        </SheetHeader>
        <form
          className="grid w-full max-w-sm items-center gap-1.5 "
          onSubmit={(e) => handleSubmit(e)}
        >
          <Label htmlFor="username">Username</Label>
          <Input
            className="bg-secondary mb-2"
            type="text"
            id="username"
            value={formData.username}
            onChange={(e) => handleFormData(e)}
          />

          <Label htmlFor="fullname">Fullname</Label>
          <Input
            className="bg-secondary mb-2"
            type="text"
            id="fullname"
            value={formData.fullname}
            onChange={(e) => handleFormData(e)}
          />

          <Label htmlFor="email">Email</Label>
          <Input
            className="bg-secondary mb-2"
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleFormData(e)}
          />

          <Label htmlFor="about">About</Label>
          <Input
            className="bg-secondary mb-2"
            type="text"
            id="settings"
            value={formData.settings?.about}
            onChange={(e) => handleFormDataSettings(e)}
          />

          <Label htmlFor="password">New password</Label>
          <Input
            className="bg-secondary mb-2"
            type="password"
            id="password"
            onChange={(e) => handleFormData(e)}
          />

          <Button className="bg-primary w-full my-2" type="submit">
            Save
          </Button>
        </form>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="absolute bottom-4 right-4">
              DELETE ACCOUNT
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete your account?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={(e) => handleDeleteAccount(e)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SheetContent>
    </Sheet>
  );
}
