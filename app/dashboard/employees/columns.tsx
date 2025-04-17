"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Employee } from "./page";

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "avatar",
    header: "",
  },
  {
    accessorKey: "firstName",
    header: "First name",
  },
  {
    accessorKey: "lastName",
    header: "Last name",
  },
  {
    accessorKey: "teamName",
    header: "Team",
  },
  {
    accessorKey: "isTeamLeader",
    header: "",
  },
];
