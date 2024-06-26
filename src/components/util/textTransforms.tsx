import styles from "./textTransforms.module.scss";
import React from "react";
import { Link as DigdirLink } from "@digdir/designsystemet-react";
import { Link } from "react-router-dom";

export const bold = (text: string) => (
  <span className={styles.bold}>{text}</span>
);

export const link = (to: string, text: string, newtab?: boolean) => (
  <DigdirLink asChild>
    <Link to={to} target={newtab ? "_blank" : "_self"}>
      {text}
    </Link>
  </DigdirLink>
);
