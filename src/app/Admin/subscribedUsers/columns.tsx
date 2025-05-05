"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SubscribedUserProp } from "@/types/subscribedUser";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<SubscribedUserProp>[] = [
    {
        id:"select",
        header:({table})=>(
            <Checkbox
                checked={table.getIsAllPageRowsSelected()|| (table.getIsSomePageRowsSelected() && "indeterminate")}
                onCheckedChange={(value)=>table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell:({row})=>(<Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value)=>row.toggleSelected(!!value)}
        aria-label="Select row"
        />),
        enableSorting:false,
        enableHiding:false,

    },
//   {
//     accessorKey: "id",
//     header: "ID",
//   },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted()==="asc")}
        >
          Email Address <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "subscriptionPlan",
    header: "Subscription Plan",
  },
  {
    accessorKey: "status",
    header: "Subscription Status",
  },
  {
    accessorKey: "career",
    header: "Career",
  },
  {
    id: "actions",
    header: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open Menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(user.id.toString())
                }
              >
                Copy user ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Delete User</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
