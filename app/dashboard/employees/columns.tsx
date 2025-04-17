"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Employee } from "./page";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "avatar",
    header: "",
    cell: ({ row }) => {
      const avatar: string = row.getValue("avatar");
      const firstName: string = row.getValue("firstName");
      const lastName: string = row.getValue("lastName");

      return (
        <Avatar>
          {!!avatar ? (
            <Image
              height={40}
              width={40}
              src={avatar}
              alt={`${firstName} ${lastName} avatar`}
              className="rounded-full flex items-center justify-center text-xs font-medium"
            />
          ) : (
            <AvatarFallback className="uppercase rounded-full w-10 h-10 flex items-center justify-center text-xs font-medium bg-muted text-center">
              {firstName[0]}
              {lastName[0]}
            </AvatarFallback>
          )}
        </Avatar>
      );
    },
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
    cell: ({ row }) => {
      const isTeamLeader: boolean = row.getValue("isTeamLeader");
      return isTeamLeader ? (
        <Badge variant="success">Team Leader</Badge>
      ) : null;
    },
  },
];
