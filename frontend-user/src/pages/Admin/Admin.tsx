import Layout from "@/components/Layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LogoutButton from "./components/LogoutButton";
import Users from "./components/tabs/Users";
import Blogs from "./components/tabs/Blogs";
import UserSettings from "./components/UserSettings";

export default function Admin() {
  return (
    <Layout showAside={false}>
      <div className="w-full justify-center p-6">
        <Tabs defaultValue="blogs">
          <div className="flex w-full justify-between">
            <TabsList className="grid w-[20rem]  grid-cols-2">
              <TabsTrigger value="blogs">Blogs</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
            <div className="gap-2 flex">
              <UserSettings />
              <LogoutButton />
            </div>
          </div>
          <TabsContent value="blogs">
            <Blogs />
          </TabsContent>
          <TabsContent value="users">
            <Users />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
