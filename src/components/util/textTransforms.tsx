import styles from "./textTransforms.module.scss";
import {Link} from "react-router-dom";
import React from "react";

export const bold = (text: string) => (
    <span className={styles.bold}>{text}</span>
);

export const link = (to: string, text:string, newtab?: boolean) => (
    <Link to={to} target={newtab ? "_blank" : "_self"}>{text}</Link>
);