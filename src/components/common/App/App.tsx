import React, {useEffect} from "react";
import { HelmetProvider } from "react-helmet-async";
import { IdleTimerProvider } from "react-idle-timer";
import { logout } from "../../auth/login";
import { useUser } from "../../../hooks/auth";
import Layout from "../Layout/Layout";
import "@digdir/design-system-tokens/brand/digdir/tokens.css";
import "@altinn/figma-design-tokens/dist/tokens.css";
import styles from "./styles.module.css";

function App() {
  const { data } = useUser();

  useEffect(() => {
    const scriptToken = window.env.ANALYTICS_TOKEN;
    const scriptUrl = window.env.ANALYTICS_SCRIPT;
    const empty = ['', 'none', 'undefined', 'null'];

    if (empty.includes(scriptToken) || empty.includes(scriptUrl)) {
      console.log('Analytics not enabled');
      return;
    }

    window._monsido = window._monsido || {
      token: scriptToken,
      statistics: {
        enabled: true,
        cookieLessTracking: true,
        documentTracking: {
          enabled: true,
          documentCls: "monsido_download",
          documentIgnoreCls: "monsido_ignore_download",
          documentExt: []
        }
      },
      heatmap: {
        enabled: true
      },
      pageCorrect: {
        enabled: true
      }
    };

    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const onIdle = () => {
    if (data && data.isAuthenticated) {
      logout();
    }
  };

  return (
    <HelmetProvider>
      <IdleTimerProvider timeout={10 * 60 * 1000} onIdle={onIdle}>
        <div className={styles.App}>
          <Layout />
        </div>
      </IdleTimerProvider>
    </HelmetProvider>
  );
}

export default App;
