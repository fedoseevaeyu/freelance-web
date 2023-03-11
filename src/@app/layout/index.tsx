import type { PropsWithChildren } from "react";

import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-60px-80px)]">{children}</main>
      <Footer />
    </>
  );
}
