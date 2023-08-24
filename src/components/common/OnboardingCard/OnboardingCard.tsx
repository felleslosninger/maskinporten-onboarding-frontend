import React from "react";
import {Label} from "@digdir/design-system-react";
import {ReactComponent as FokusSvg} from "../../../assets/fokus.svg";
import StyledLink from "../StyledLink/StyledLink";
import styles from './styles.module.scss';

function OnboardingCard() {
    return (
        <StyledLink to={"/guide"} className={styles.link}>
            <div className={styles.container}>
                <div className={styles.textSection}>
                    <Label>
                        Trenger du hjelp til å komme i gang?
                    </Label>
                    <StyledLink>
                        Gå til Onboardingsguiden
                    </StyledLink>
                </div>
                <FokusSvg className={styles.illustration} />
            </div>
        </StyledLink>
    );
}

export default OnboardingCard;