import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Label } from "@digdir/design-system-react";
import {
  BagdeIcon,
  KeyHorizontalIcon,
  TasklistIcon,
} from "@navikt/aksel-icons";
import KeySection from "./KeySection";
import OtherSection from "./OtherSection";
import SertificateSection from "./SertificateSection";
import ContentContainer from "../../common/ContentContainer/ContentContainer";

function TabsSection() {
  const [selectedTab, setSelectedTab] = useState(1);

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            selectedTab === 1 ? styles.active : styles.inactive
          }`}
          onClick={() => setSelectedTab(1)}
        >
          <BagdeIcon />
          <Label size={"large"}>Virksomhetssertifikat</Label>
        </button>
        <button
          className={`${styles.tab} ${
            selectedTab === 2 ? styles.active : styles.inactive
          }`}
          onClick={() => setSelectedTab(2)}
        >
          <KeyHorizontalIcon />
          <Label size={"large"}>Manuelt opplastet nøkkel</Label>
        </button>
        <button
          className={`${styles.tab} ${
            selectedTab === 3 ? styles.active : styles.inactive
          }`}
          onClick={() => setSelectedTab(3)}
        >
          <TasklistIcon />
          <Label size={"large"}>Andre fremgangsmåter</Label>
        </button>
      </div>
      <div className={styles.tabsContentContainer}>
        <ContentContainer className={styles.tabsContent}>
          {selectedTab === 1 && <SertificateSection />}
          {selectedTab === 2 && <KeySection />}
          {selectedTab === 3 && <OtherSection />}
        </ContentContainer>
      </div>
    </div>
  );
}

export default TabsSection;
