import React from "react";
import {Label} from "@digdir/design-system-react";
import {ReactComponent as FokusSvg} from "../../../assets/fokus.svg";
import StyledLink from "../../common/StyledLink/StyledLink";
import styles from './styles.module.scss';

function OnboardingCard() {
    return (
        <div className={styles.container}>
            <div className={styles.textSection}>
                <Label>
                    Trenger du hjelp til å komme i gang?
                </Label>
                <StyledLink to={"/dashboard"}>
                    Gå til Onboardingsguiden
                </StyledLink>
            </div>
            <FokusSvg className={styles.illustration} />
        </div>
    );
}

export default OnboardingCard;