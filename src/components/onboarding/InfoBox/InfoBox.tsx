import React, {ReactNode} from "react";
import styles from "./styles.module.scss";

interface Props {
    children: ReactNode[] | ReactNode;
}

function InfoBox(props: Props) {

    return (
        <div className={styles.box}>
            {props.children}
        </div>
    );
}

export default InfoBox;