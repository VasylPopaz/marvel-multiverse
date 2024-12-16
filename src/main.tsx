import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer, Zoom } from "react-toastify";

import { App } from "./components";

import "modern-normalize/modern-normalize.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer
        autoClose={3000}
        transition={Zoom}
        theme="dark"
        closeOnClick
      />
    </QueryClientProvider>{" "}
  </BrowserRouter>
);
