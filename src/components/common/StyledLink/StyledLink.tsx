import React, { ReactComponentElement, ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

interface LinkProps {
  to: string;
  children: ReactNode | ReactNode[];
  icon?: ReactComponentElement<any>;
  className?: string;
}

function StyledLink(props: LinkProps) {
  return (
    <Link to={props.to} className={`${styles.link} ${props.className}`}>
      {props.icon && props.icon}
      {props.children}
    </Link>
  );
}

export default StyledLink;
