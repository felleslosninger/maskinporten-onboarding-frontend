import React, {ReactNode} from "react";
import {Button, Heading, Label} from "@digdir/design-system-react";
import styles from "./styles.module.scss";

interface ContainerProps {
    header: string;
    category: string;
    children: ReactNode | ReactNode[];
}

function SkjemaContainer(props: ContainerProps) {
    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <Label size={"medium"}>
                        {props.category}
                    </Label>
                    <Heading size={"medium"}>
                        {props.header}
                    </Heading>
                </div>
                <div className={styles.cardContent}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default SkjemaContainer;