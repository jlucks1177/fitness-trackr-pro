import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Layout from "./layout/Layout";

import { AuthProvider } from "./auth/AuthContext";
import { ApiProvider } from "./api/ApiContext";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ApiProvider>
        <Layout>
          <App />
        </Layout>
      </ApiProvider>
    </AuthProvider>
  </BrowserRouter>
);
