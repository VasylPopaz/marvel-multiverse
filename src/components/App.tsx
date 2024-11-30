import { Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";

import { SharedLayout } from "../components";

const Home = lazy(() => import("../pages/Home"));
const Characters = lazy(() => import("../pages/Characters"));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/characters" element={<Characters />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
