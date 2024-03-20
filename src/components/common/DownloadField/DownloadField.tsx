import React, { ReactNode, useState } from "react";
import styles from "./styles.module.scss";
import {Button, Tooltip} from "@digdir/designsystemet-react";
import {DownloadIcon} from "@navikt/aksel-icons";

interface Props {
  downloadValue: string;
  downloadName?: string;
  callback?: () => void;
  children: ReactNode;
}

function DownloadField(props: Props) {
  const [isDownloaded, setIsDownloaded] = useState(false);
  const file = new Blob([props.downloadValue], {type: 'text/plain'})

  const onDownload = () => {
    setIsDownloaded(true);
    if (props.callback) {
      props.callback();
    }
  };

  return (
    <Tooltip content={isDownloaded ? "Nedlastet" : "Last ned"} placement={"top"}>
      <Button
        className={`${styles.box} ${isDownloaded && styles.clicked}`}
        onClick={onDownload}
        variant={"tertiary"}
        asChild
      >
        <a download={props.downloadName}
           target={"_blank"}
           rel={"noreferrer"}
           href={URL.createObjectURL(file)}
        >
          <DownloadIcon />
          {props.children}
        </a>

      </Button>
    </Tooltip>
  );
}

export default DownloadField;
