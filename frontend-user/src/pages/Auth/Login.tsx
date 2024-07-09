import { useEffect, useState } from "react";

import Layout from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toastApiCall } from "@/api/api";
import { useToast } from "@/components/ui/use-toast";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await toastApiCall(
        () => login(username, password),
        toast,
        "Error logging in",
        "Succesfully logged in"
      );
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout showAside={false}>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col w-full md:w-1/2 mx-auto justify-center mt-6"
      >
        <div>
          <Label>
            Username
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Label>
        </div>
        <div>
          <Label>
            Password
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Label>
        </div>
        <Button type="submit" className="mt-6">
          Login
        </Button>
      </form>
    </Layout>
  );
}
