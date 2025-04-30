"use client";

import { ColumnDef } from "@tanstack/react-table";

export type SubscribedUserProp = {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  subscriptionPlan: string;
  subscriptionStatus: string;
  career: number;
};

export const columns: ColumnDef<SubscribedUserProp>[]= [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lasttName",
    header: "Last Name",
  },
  {
    accessorKey: "emailAddress",
    header: "Email Address",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "subscriptionPlan",
    header: "Subscription Plan",
  },
  {
    accessorKey: "subscriptionStatus",
    header: "Subscription Status",
  },
  {
    accessorKey: "career",
    header: "Career",
  },
];
