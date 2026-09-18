import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { ConvexProvider, ConvexReactClient } from "convex/react";

import App from "./App";
import "./index.css"

const convex = new ConvexReactClient(`${import.meta.env.VITE_CONVEX_URL}`);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ConvexProvider client={convex}>
      <App />
    </ConvexProvider>
  </BrowserRouter>
);