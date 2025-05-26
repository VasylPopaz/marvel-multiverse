import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Loader } from "../components";
import { Header, Footer } from "../layout";

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
