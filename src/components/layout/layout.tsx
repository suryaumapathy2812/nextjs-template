import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import Nav from "./nav";
import { ScrollArea } from "../ui/scroll-area";
import Header from "./header";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

const links = [
  {
    name: "Dashboard",
    href: "/",
  },
  {
    name: "Settings",
    href: "/settings",
  },
  {
    name: "Profile",
    href: "/profile",
  },
];

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();
  console.log(session);

  if (!session) redirect("/api/auth/signin");

  return (
    <div className="h-screen w-screen">
      <ResizablePanelGroup direction="vertical" className="h-full">
        <ResizablePanel
          defaultSize={7}
          className="block max-h-16 min-h-16 border-b lg:hidden"
        >
          <Header links={links} />
        </ResizablePanel>
        <ResizablePanel minSize={93}>
          <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel
              defaultSize={18}
              minSize={15}
              className="hidden h-full min-w-[300px] max-w-[300px] border-r transition-all duration-300 ease-in-out lg:block"
            >
              <Nav links={links} />
            </ResizablePanel>
            <ResizablePanel minSize={80}>
              <ScrollArea className="h-full p-4">{children}</ScrollArea>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
