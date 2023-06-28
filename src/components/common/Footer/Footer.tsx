import React from "react";
import styles from './styles.module.scss';
import StyledLink from "../StyledLink/StyledLink";
import { FigureIcon, EnvelopeClosedIcon, PhoneIcon } from '@navikt/aksel-icons';

function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.footerContent}>
                <StyledLink to={"/"} icon={<FigureIcon />}>
                    Tilgjengelighet
                </StyledLink>
                <StyledLink to={"mailto:hjelp@etaten.no"} icon={<EnvelopeClosedIcon />}>
                    hjelp@etaten.no
                </StyledLink>
                <StyledLink to={"tel:+4712345678"} icon={<PhoneIcon />}>
                    (+47) 12 34 56 78
                </StyledLink>
            </div>
        </div>
    );
}

export default Footer;