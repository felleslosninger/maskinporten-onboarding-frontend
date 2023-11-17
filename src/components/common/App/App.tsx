import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from'react-helmet-async';
import Layout from "../Layout/Layout";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import "@altinn/figma-design-tokens/dist/tokens.css";
import "./App.css";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnMount: false,
        refetchOnWindowFocus: false
      }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <div className="App">
          <Layout />
        </div>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
