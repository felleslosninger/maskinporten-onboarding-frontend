import React, { ReactNode, useState } from "react";
import styles from "./styles.module.scss";
import { Label, Popover } from "@digdir/design-system-react";
import { CheckmarkIcon } from "@navikt/aksel-icons";

interface Props {
  copyValue: string;
  children: ReactNode;
}

function CopyField(props: Props) {
  const [isCopied, setIsCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(props.copyValue);
    setIsCopied(true);
  };

  return (
    <button
      className={`${styles.box} ${isCopied && styles.clicked}`}
      onClick={onCopy}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Popover
        trigger={<div>{props.children}</div>}
        open={showTooltip}
        placement={"top"}
        variant={"info"}
      >
        <Label size={"small"} className={styles.popoverContent}>
          {isCopied && <CheckmarkIcon />}
          {isCopied ? "Kopiert" : "Kopier"}
        </Label>
      </Popover>
    </button>
  );
}

export default CopyField;
