import * as React from "react";

import { Input } from "./input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function PasswordInput({ className, ...props }: React.ComponentProps<"input">) {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div className="relative">
      <Input
        type={isVisible ? "text" : "password"}
        className={cn("pr-10", className)}
        {...props}
      />
      <span className="absolute top-[7px] right-1 cursor-pointer select-none">
        {isVisible ? (
          <EyeIcon onClick={() => setIsVisible(false)} />
        ) : (
          <EyeOffIcon onClick={() => setIsVisible(true)} />
        )}
      </span>
    </div>
  );
}

export { PasswordInput };
