import { useUsersQuery } from "@/api/queries";
import { Table,TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import TabUsersNew from "./UsersNew";

export default function Users() {
    const { data } = useUsersQuery();
  
    return (
      <section className="flex flex-col">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Fullname</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Registration Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.fullname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {formatDate(new Date(user.registrationDate))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
  
        <div className="col-span-2">
          <div className="w-full flex justify-end">
            <div className="w-24 mr">
              <TabUsersNew />
            </div>
          </div>
        </div>
      </section>
    );
  }