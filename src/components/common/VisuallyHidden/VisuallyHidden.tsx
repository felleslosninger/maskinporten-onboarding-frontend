import React, { ReactNode } from "react";
import styles from "./styles.module.scss";

interface Props {
  children: ReactNode;
}

function VisuallyHidden({ children }: Props) {
  return <span className={styles.hidden}>{children}</span>;
}

export default VisuallyHidden;
