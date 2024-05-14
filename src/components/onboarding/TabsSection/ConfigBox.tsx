import React, {useEffect, useState} from "react";
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
  const [selectedConfig, setSelectedConfig] = useState<string>();

  useEffect(() => {
    if (config) {
      setSelectedConfig(Object.keys(config)[0]);
    }
  }, [config]);

  if (!config) {
    return null;
  }

  return (
    <>
      <div className={styles.configHeader}>
        <Heading level={3} size={"large"}>
          Konfigurasjonsfelter
        </Heading>
        {Object.keys(config).length > 1 && (
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
        )}
      </div>

      <Paragraph spacing>
        Dette er endepunktene som Digdir bruker til uthenting av{" "}
        <span lang={"en"}>access-tokens</span>.
      </Paragraph>
      <InfoBox className={styles.configBox}>
        <Paragraph lang={"en"}>
          {bold("Issuer Url:")} {selectedConfig && config[selectedConfig].issuer}
        </Paragraph>
        <Paragraph lang={"en"}>
          {bold("Token Url:")} {selectedConfig && config[selectedConfig].token_endpoint}
        </Paragraph>
      </InfoBox>
    </>
  );
}

export default ConfigBox;
