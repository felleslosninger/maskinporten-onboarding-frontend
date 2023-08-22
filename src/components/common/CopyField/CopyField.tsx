import React, {ReactNode, useEffect, useState} from "react";
import styles from "./styles.module.scss";
import {Popover} from "@digdir/design-system-react";
import {CheckmarkIcon} from "@navikt/aksel-icons";

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
    }
    
    return (
        <div className={`${styles.box} ${isCopied && styles.clicked}`}
             onClick={onCopy}
             onMouseEnter={() => setShowTooltip(true)}
             onMouseLeave={() => setShowTooltip(false)}
        >
            <Popover trigger={<div>{props.children}</div>} open={showTooltip} placement={"top"} variant={"info"}>
                <div className={styles.popoverContent}>
                    {isCopied && <CheckmarkIcon />}
                    {isCopied ? "Kopiert" : "Kopier"}
                </div>
            </Popover>
        </div>
    );
};

export default CopyField;