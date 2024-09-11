import AdminLayout from "@/components/layout/layout";
import CustomProvider from "@/components/provider/providers";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Genie",
  description: "Gen AI for Education",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <CustomProvider>
          <AdminLayout>{children}</AdminLayout>
        </CustomProvider>
      </body>
    </html>
  );
}
