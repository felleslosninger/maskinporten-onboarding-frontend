import React from "react";
import styles from './styles.module.scss';

interface Props {
    width: string;
    heigth: string;
}

const Skeleton = (props: Props) => (
    <div className={styles.skeleton}
         style={{width: props.width, height: props.heigth}}
    />
);

export default Skeleton;