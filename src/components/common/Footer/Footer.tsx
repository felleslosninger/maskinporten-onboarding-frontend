import React from "react";
import styles from "./styles.module.scss";
import StyledLink from "../StyledLink/StyledLink";
import { EnvelopeClosedIcon, FigureIcon, PhoneIcon } from "@navikt/aksel-icons";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        <StyledLink
          to={"/"}
          icon={<FigureIcon />}
          ariaLabel={"Gå til tilgjengelighetserklæring"}
        >
          Tilgjengelighet
        </StyledLink>
        <StyledLink
          to={"mailto:servicedesk@digdir.no"}
          icon={<EnvelopeClosedIcon />}
          ariaLabel={"Send epost til addresse servicedesk@digdir.no"}
        >
          servicedesk@digdir.no
        </StyledLink>
        <StyledLink
          to={"tel:+4795736103"}
          icon={<PhoneIcon />}
          ariaLabel={"Ring digdir på nummer 95 73 61 03"}
        >
          (+47) 95 73 61 03
        </StyledLink>
      </div>
    </div>
  );
}

export default Footer;
