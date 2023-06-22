import React from "react";
import {Button} from "@digdir/design-system-react";
import styles from "./styles.module.scss";

type ButtonProps = React.ComponentPropsWithoutRef<'button'>;

function InvertedButton(props: ButtonProps) {
    return <Button {...props} color={"inverted"} className={styles.button} />
}

export default InvertedButton;