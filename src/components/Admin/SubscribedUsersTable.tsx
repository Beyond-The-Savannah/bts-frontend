import { TestSubscribedUsers } from "@/staticData/testUsers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function SubscribedUsersTable() {
  return (
    <section className="h-full">
      <div className="container mx-auto px-4 ">
        <Table className="w-[75vw]">
          <TableHeader>
            <TableRow>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email Address</TableHead>
              <TableHead>Stubscription Status</TableHead>
              <TableHead>Career/Profession</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TestSubscribedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>{user.carrer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
