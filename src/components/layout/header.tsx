"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useState } from "react";
import Nav from "./nav";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  links: {
    name: string;
    href: string;
  }[];
};

export default function Header(props: Props) {
  const { data, status } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side={"left"} className="w-[300px] p-0">
          <Nav links={props.links} />
        </SheetContent>
      </Sheet>

      <div className="flex h-full flex-row items-center px-4">
        <div>
          <Button
            size={"icon"}
            variant={"secondary"}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu size={24} />
          </Button>
        </div>

        {status !== "loading" && (
          <div className="ml-auto">
            {data ? (
              <>
                <Avatar>
                  <AvatarImage src={data.user?.image as any} />
                  <AvatarFallback>{data.user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </>
            ) : (
              <>
                <Button>Login</Button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
