import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import MenuItem from "./menu-item";
import MenuTitle from "./menu-title";
import Link from "next/link";
import LightDarkToggle from "@/components/ui/light-dark-toggle";
import { cn } from "@/lib/utils";

const MainMenu = ({ className }: { className?: string }) => {
  return (
    <nav
      className={cn(
        "md:bg-muted overflow-auto p-4 flex flex-col h-screen",
        className
      )}
    >
      <header className="block border-b dark:border-b-black border-b-zinc-300 pb-4">
        <MenuTitle />
      </header>
      <ul className="py-4 grow">
        <MenuItem href="/dashboard">My dashboard</MenuItem>
        <MenuItem href="/dashboard/teams">Teams</MenuItem>
        <MenuItem href="/dashboard/employees">Employees</MenuItem>
        <MenuItem href="/dashboard/account">Account</MenuItem>
        <MenuItem href="/dashboard/settings">Settings</MenuItem>
      </ul>
      <footer className="flex gap-2 items-center">
        <Avatar>
          <AvatarFallback className="bg-pink-300 dark:bg-pink-800 rounded-full w-8 h-8 flex items-center justify-center text-xs font-medium">
            TP
          </AvatarFallback>
        </Avatar>
        <Link href="/" className="hover:underline">
          Logout
        </Link>
        <LightDarkToggle className="ml-auto" />
      </footer>
    </nav>
  );
};

export default MainMenu;
