import React, { useState } from "react";
import styles from "./styles.module.scss";
import {Label} from "@digdir/design-system-react";
import {
  TasklistIcon,
  KeyHorizontalIcon,
  BagdeIcon,
} from "@navikt/aksel-icons";
import KeySection from "./KeySection";
import OtherSection from "./OtherSection";
import SertificateSection from "./SertificateSection";

function TabsSection() {
  const [selectedTab, setSelectedTab] = useState(1);

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        <div
          className={`${styles.tab} ${
            selectedTab === 1 ? styles.active : styles.inactive
          }`}
          onClick={() => setSelectedTab(1)}
        >
          <BagdeIcon />
          <Label size={"large"}>Virksomhetssertifikat</Label>
        </div>
        <div
          className={`${styles.tab} ${
            selectedTab === 2 ? styles.active : styles.inactive
          }`}
          onClick={() => setSelectedTab(2)}
        >
          <KeyHorizontalIcon />
          <Label size={"large"}>Manuelt opplastet nøkkel</Label>
        </div>
        <div
          className={`${styles.tab} ${
            selectedTab === 3 ? styles.active : styles.inactive
          }`}
          onClick={() => setSelectedTab(3)}
        >
          <TasklistIcon />
          <Label size={"large"}>Andre fremgangsmåter</Label>
        </div>
      </div>
      <div className={styles.tabsContentContainer}>
        <div className={styles.tabsContent}>
          {selectedTab === 1 && <SertificateSection />}
          {selectedTab === 2 && <KeySection />}
          {selectedTab === 3 && <OtherSection />}
        </div>
      </div>
    </div>
  );
}

export default TabsSection;
