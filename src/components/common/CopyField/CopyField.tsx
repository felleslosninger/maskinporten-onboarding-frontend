import React, { ReactNode, useState } from "react";
import styles from "./styles.module.scss";
import {Tooltip} from "@digdir/design-system-react";

interface Props {
  copyValue: string;
  children: ReactNode;
}

function CopyField(props: Props) {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(props.copyValue);
    setIsCopied(true);
  };

  return (
    <Tooltip
      content={isCopied ? "Kopiert" : "Kopier"}
      placement={"top"}
    >
      <button
        className={`${styles.box} ${isCopied && styles.clicked}`}
        onClick={onCopy}
      >
        {props.children}
      </button>
    </Tooltip>
  );
}

export default CopyField;
