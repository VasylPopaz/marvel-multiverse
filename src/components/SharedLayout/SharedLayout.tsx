import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Footer, Header } from "../index";

export const SharedLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};
