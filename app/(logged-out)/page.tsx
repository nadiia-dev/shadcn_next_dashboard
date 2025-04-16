import { Button } from "@/components/ui/button";
import { PersonStandingIcon } from "lucide-react";
import Link from "next/link";

const LandingPage = () => {
  return (
    <>
      <div className="flex gap-2 items-center">
        <PersonStandingIcon className="text-pink-600" size={50} />
        <h1>SupportMe</h1>
      </div>
      <p>The best dashboard to manage customer support</p>
      <div className="flex gap-2 items-center">
        <Button asChild>
          <Link href="/login">Log in</Link>
        </Button>
        <p>or</p>
        <Button variant="outline" asChild>
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </div>
    </>
  );
};

export default LandingPage;
