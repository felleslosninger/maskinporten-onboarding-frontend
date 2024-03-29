import React, { useState } from "react";
import styles from "./styles.module.scss";
import {
  Heading,
  ToggleGroup,
  Paragraph,
} from "@digdir/designsystemet-react";
import InfoBox from "../InfoBox/InfoBox";
import { bold } from "../../util/textTransforms";
import { useConfig } from "../../../hooks/auth";

function ConfigBox() {
  const { data: config } = useConfig();
  const [selectedConfig, setSelectedConfig] = useState("test");

  if (!config) {
    return null;
  }

  return (
    <>
      <div className={styles.configHeader}>
        <Heading level={3} size={"large"}>
          Konfigurasjonsfelter
        </Heading>
        <ToggleGroup
          value={selectedConfig}
          size={"small"}
          onChange={(value) => setSelectedConfig(value)}
        >
          {Object.keys(config).map((env) => (
            <ToggleGroup.Item value={env} key={env}>
              {env.toUpperCase()}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup>
      </div>

      <Paragraph spacing>
        Dette er endepunktene som Digdir bruker til uthenting av{" "}
        <span lang={"en"}>access-tokens</span>.
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
