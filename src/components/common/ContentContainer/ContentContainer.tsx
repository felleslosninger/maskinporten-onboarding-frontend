import React, { ReactNode } from "react";
import styles from "./styles.module.scss";

interface ContentContainerProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

function ContentContainer(props: ContentContainerProps) {
  return (
    <div className={`${props.className} ${styles.content}`}>
      {props.children}
    </div>
  );
}

export default ContentContainer;
