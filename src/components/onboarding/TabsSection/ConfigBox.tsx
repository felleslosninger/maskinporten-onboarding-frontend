import React, { useState } from "react";
import styles from "./styles.module.scss";
import {
  Heading,
  LegacyToggleButtonGroup,
  Paragraph
} from "@digdir/design-system-react";
import InfoBox from "../InfoBox/InfoBox";
import { bold } from "../../util/textTransforms";
import { useConfig } from "../../../hooks/auth";

function ConfigBox() {
  const { data: config } = useConfig();
  const [selectedConfig, setSelectedConfig] = useState("test");

  if (!config) {
    return null;
  }

  const items = Object.keys(config).map((value) => {
    return {
      label: value.toUpperCase(),
      value: value,
    };
  });

  return (
    <>
      <div className={styles.configHeader}>
        <Heading level={3} size={"large"}>Konfigurasjonsfelter</Heading>
        <LegacyToggleButtonGroup
          items={items}
          selectedValue={selectedConfig}
          onChange={(value) => setSelectedConfig(value)}
        />
      </div>

      <Paragraph spacing>
        Dette er endepunktene som Digdir bruker til uthenting av <span lang={"en"}>access-tokens</span>.
      </Paragraph>
      <InfoBox className={styles.configBox}>
        <Paragraph lang={"en"}>
          {bold("Issuer Url:")} {config[selectedConfig].issuer}
        </Paragraph>
        <Paragraph lang={"en"}>
          {bold("Token Url:")} {config[selectedConfig].token_endpoint}
        </Paragraph>
      </InfoBox>
    </>
  );
}

export default ConfigBox;
