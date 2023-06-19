import React from "react";
import Header from "../Header/Header";
import {Link, Route, Routes} from "react-router-dom";
import Auth from "../../auth/Auth";
import Callback from "../../auth/Callback";
import styles from './styles.module.scss';
import Landingpage from "../../landing/Landingpage/Landingpage";
import Dashboard from "../../dashboard/Dashboard";

function Layout() {

    return (
        <div className={styles.layout}>
            <Header />
            <div className={styles.content}>
                <Routes>
                    <Route path={"/"} element={<Landingpage />} />
                    <Route path={"/logginn"} element={<Auth />} />
                    <Route path={"/dashboard"} element={<Dashboard />} />
                </Routes>
            </div>
        </div>
    )
}

export default Layout;