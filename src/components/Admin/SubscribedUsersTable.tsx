import { UsersBTSDataBaseProp } from "@/types/subscribedUsers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import axios from "axios";



export default async function SubscribedUsersTable() {
  const resp1 = await axios.get(
    "https://efmsapi-staging.azurewebsites.net/api/BydUsers/getAllUsers"
  );
  const users: UsersBTSDataBaseProp[] = await resp1.data;
  // console.log("GETTING USERS FROM BTS_DB",resp1)
  return (
    <section className="h-full">
      <div className="container mx-auto px-4 ">
        <Table className="w-[75vw]">
          <TableHeader>
            <TableRow>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email Address</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Stubscription Plan</TableHead>
              <TableHead>Stubscription Status</TableHead>
              <TableHead>Career/Profession</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {TestSubscribedUsers.map((user) => ( */}
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.emailAddress}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.subscriptionPlan}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>{user.career}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
