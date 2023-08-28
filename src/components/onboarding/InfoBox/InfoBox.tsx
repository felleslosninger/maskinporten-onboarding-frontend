import React, { ReactNode } from "react";
import styles from "./styles.module.scss";

interface Props {
  children: ReactNode[] | ReactNode;
  className?: string;
}

function InfoBox(props: Props) {
  return (
    <div className={`${props.className} ${styles.box}`}>{props.children}</div>
  );
}

export default InfoBox;
