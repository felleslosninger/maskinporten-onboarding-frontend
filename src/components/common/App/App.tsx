import React from "react";
import { HelmetProvider } from'react-helmet-async';
import { IdleTimerProvider } from "react-idle-timer";
import { logout } from "../../auth/login";
import { useUser } from "../../../hooks/auth";
import Layout from "../Layout/Layout";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import "@altinn/figma-design-tokens/dist/tokens.css";
import "./App.css";

function App() {
  const {data} = useUser();

  const onIdle = () => {
    if (data && data.isAuthenticated) {
      logout();
    }
  }

  return (
      <HelmetProvider>
        <IdleTimerProvider
          timeout={10 * 60 * 1000}
          onIdle={onIdle}
        >
          <div className="App">
            <Layout />
          </div>
        </IdleTimerProvider>
      </HelmetProvider>
  );
}

export default App;
