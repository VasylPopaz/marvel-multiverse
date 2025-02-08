import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Footer, Header, Loader } from "../index";

export const SharedLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};
