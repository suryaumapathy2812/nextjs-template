"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut } from "lucide-react";

type Props = {
  links: {
    name: string;
    href: string;
  }[];
};

export default function Nav(props: Props) {
  const { data } = useSession();

  return (
    <div className="h-full max-h-screen">
      <nav className="group flex h-full flex-col">
        <div className="p-6">
          <Link href="/" className="w-full text-3xl font-semibold">
            Genie
          </Link>
        </div>
        <div className="flex flex-col gap-2 py-2">
          {props.links.map((_nav, _idx) => (
            <Button className="text-left" variant={"link"} key={_idx}>
              <Link href={_nav.href} className="w-full p-2">
                {_nav.name}
              </Link>
            </Button>
          ))}
        </div>
        <div className="mb-2 mt-auto hidden p-4 lg:block">
          {!data && (
            <Button className="text-left" variant={"link"}>
              <Link href="/login" className="w-full p-2">
                Login
              </Link>
            </Button>
          )}
          {data && (
            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={data.user?.image as any} />
                  <AvatarFallback>{data.user?.name?.charAt(0)} </AvatarFallback>
                </Avatar>
                <div> {data.user.name} </div>
              </div>
              <Button
                className="text-left"
                variant={"secondary"}
                size={"icon"}
                onClick={() => signOut()}
              >
                <LogOut size={20} />
              </Button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
