import React from "react";
import {
  Accordion,
  Label,
  Paragraph,
  Skeleton
} from "@digdir/designsystemet-react";
import styles from "./styles.module.scss";

function ScopeSkeleton() {
  return (
    <Accordion.Item>
      <Accordion.Header className={styles.skeletonHeader}>
        <div className={styles.skeleton}>
          <div className={styles.skeletonTop}>
            <Paragraph size={"large"} as={Skeleton.Text} style={{width: "10rem"}} />
            <Paragraph size={"large"} as={Skeleton.Text} style={{width: "10rem"}} />
          </div>
          <Label as={Skeleton.Text} style={{width: "17rem"}} />
        </div>
        <Paragraph as={Skeleton.Text} style={{width: "10rem"}} />
      </Accordion.Header>
    </Accordion.Item>
  );
}

export default ScopeSkeleton;
