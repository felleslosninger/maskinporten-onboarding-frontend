import React, {ReactNode} from "react";
import {Link} from "react-router-dom";
import styles from './styles.module.scss';

interface LinkProps {
    to: string;
    children: ReactNode | ReactNode[];
}

function StyledLink(props: LinkProps) {
    return (
        <Link to={props.to} className={styles.link}>
            {props.children}
        </Link>
    );
}

export default StyledLink;