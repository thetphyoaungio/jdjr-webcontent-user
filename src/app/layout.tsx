import { ThemeProvider } from "@/components/layout/theme-provider";

import "@/styles/globals.css";
import { plusJakartaSans } from "./font";
// import { Toaster } from "@/components/ui/toast/toaster";
import { saveUserUseTime } from "@/lib/user-usetime/data";
import { getSession } from "@/lib/data";
import { Toaster } from "@/components/ui/sonner";
import Head from "next/head";

const RootLayout = async ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getSession();

  if (
    session &&
    session.hasOwnProperty("deviceId") &&
    session.deviceId.trim()
  ) {
    try {
      const result: any = await saveUserUseTime(Date.now(), session.deviceId);
    } catch (error: any) {
      console.log(`Error occured in saveUserUseTime:: ${error.message}`);
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/uploads/icons/logo/favicon.svg" />
      </head>
      <body className={plusJakartaSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <main>
            {children}
            <Toaster duration={2000} position="bottom-center" />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
