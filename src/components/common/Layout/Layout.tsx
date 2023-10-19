import React from "react";
import Header from "../Header/Header";
import { Route, Routes } from "react-router-dom";
import Landingpage from "../../landing/Landingpage";
import Onboardingpage from "../../onboarding/Onboardingpage";
import Dashboard from "../../dashboard/Dashboard";
import Footer from "../Footer/Footer";
import styles from "./styles.module.scss";
import Termspage from "../../terms/Termspage";

function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        <Routes>
          <Route path={"/"} element={<Landingpage />} />
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/guide"} element={<Onboardingpage />} />
          <Route path={"/terms"} element={<Termspage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
