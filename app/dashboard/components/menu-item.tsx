"use client";

import { DrawerContext } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { use } from "react";

const MenuItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const { onClose } = use(DrawerContext);
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      className={cn(
        "block p-2 hover:bg-white dark:hover:bg-zinc-700 rounded-md text-muted-foreground hover:text-foreground",
        isActive &&
          "bg-primary hover:bg-primary dark:hover:bg-primary hover:text-primary-foreground text-primary-foreground"
      )}
      href={href}
      onClick={onClose}
    >
      {children}
    </Link>
  );
};

export default MenuItem;
