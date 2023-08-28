import React from "react";
import styles from "./styles.module.scss";
import StyledLink from "../StyledLink/StyledLink";
import { FigureIcon, EnvelopeClosedIcon, PhoneIcon } from "@navikt/aksel-icons";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        <StyledLink to={"/"} icon={<FigureIcon />}>
          Tilgjengelighet
        </StyledLink>
        <StyledLink
          to={"mailto:servicedesk@digdir.no"}
          icon={<EnvelopeClosedIcon />}
        >
          servicedesk@digdir.no
        </StyledLink>
        <StyledLink to={"tel:+4795736103"} icon={<PhoneIcon />}>
          (+47) 95 73 61 03
        </StyledLink>
      </div>
    </div>
  );
}

export default Footer;
