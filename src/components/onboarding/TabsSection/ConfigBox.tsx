import React, {useState} from "react";
import styles from "./styles.module.scss";
import {Heading, Label, Paragraph, ToggleButtonGroup} from "@digdir/design-system-react";
import InfoBox from "../InfoBox/InfoBox";
import {bold} from "../../util/textTransforms";
import {useConfig} from "../../../hooks/auth";

function ConfigBox() {
  const {data: config} = useConfig();
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
        <Heading size={"large"}>Konfigurasjonsfelter</Heading>
        <ToggleButtonGroup
          items={items}
          selectedValue={selectedConfig}
          onChange={(value) => setSelectedConfig(value)}
        />
      </div>

      <Paragraph spacing>
        Dette er endepunktene som Digdir bruker til uthenting av
        access-tokens.
      </Paragraph>
      <InfoBox className={styles.configBox}>
        <Label>
          {bold("Issuer Url:")} {config[selectedConfig].issuer}
        </Label>
        <Label>
          {bold("Token Url:")} {config[selectedConfig].token_endpoint}
        </Label>
      </InfoBox>
    </>
  );
}

export default ConfigBox;