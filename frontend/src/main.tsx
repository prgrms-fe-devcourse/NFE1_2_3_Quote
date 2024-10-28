import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GlobalStyle from "@styles/GlobalStyle";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./styles/ThemeProvider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
