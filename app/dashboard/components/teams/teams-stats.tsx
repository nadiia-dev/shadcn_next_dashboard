import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@radix-ui/react-avatar";
import { ListChecksIcon, UsersIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import cm from "@/public/cm.jpg";

const TeamsStats = () => {
  const totalTeams = 8;

  return (
    <>
      <div className="grid lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Total teams</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="flex gap-2">
              <UsersIcon />
              <div className="text-5xl font-bold">{totalTeams}</div>
            </div>
            <div>
              <Button size="xs" asChild>
                <Link href="/dashboard/teams">View all</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Team leaders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2"></div>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-base">Team distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2 items-center"></CardContent>
        </Card>
      </div>
      <Card className="my-4">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ListChecksIcon />
            <span>Support tickets resolved</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pl-0"></CardContent>
      </Card>
    </>
  );
};

export default TeamsStats;
