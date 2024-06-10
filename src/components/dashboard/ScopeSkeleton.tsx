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
            <Paragraph size={"large"} asChild style={{width: "10rem"}}>
              <Skeleton.Text />
            </Paragraph>
            <Paragraph size={"large"} asChild style={{width: "10rem"}}>
              <Skeleton.Text />
            </Paragraph>
          </div>
          <Label asChild style={{width: "17rem"}}>
            <Skeleton.Text />
          </Label>
        </div>
        <Paragraph asChild style={{width: "10rem"}}>
          <Skeleton.Text />
        </Paragraph>
      </Accordion.Header>
    </Accordion.Item>
  );
}

export default ScopeSkeleton;
