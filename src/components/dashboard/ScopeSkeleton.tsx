import React from "react";
import { Accordion } from "@digdir/design-system-react";
import Skeleton from "../common/Skeleton/Skeleton";
import styles from "./styles.module.scss";

function ScopeSkeleton() {
  return (
    <Accordion.Item>
      <Accordion.Header className={styles.skeletonHeader}>
        <div className={styles.skeleton}>
          <div className={styles.skeletonTop}>
            <Skeleton width={"10rem"} heigth={"1.5rem"} />
            <Skeleton width={"10rem"} heigth={"1.5rem"} />
          </div>
          <Skeleton width={"17rem"} heigth={"1.25rem"} />
        </div>
        <Skeleton width={"10rem"} heigth={"1.5rem"} />
      </Accordion.Header>
    </Accordion.Item>
  );
}

export default ScopeSkeleton;
