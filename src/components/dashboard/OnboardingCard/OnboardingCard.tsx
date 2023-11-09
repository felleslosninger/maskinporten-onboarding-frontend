import React from "react";
import {Paragraph} from "@digdir/design-system-react";
import { ReactComponent as FokusSvg } from "../../../assets/fokus.svg";
import StyledLink from "../../common/StyledLink/StyledLink";
import styles from "./styles.module.scss";

function OnboardingCard() {
  return (
    <StyledLink to={"/guide"} className={styles.link} ariaLabel={"Gå til onboardingsguide"}>
      <div className={styles.container}>
        <div className={styles.textSection}>
          <Paragraph spacing size={"medium"}>Trenger du hjelp til å komme i gang?</Paragraph>
          <div className={styles.text}>Gå til Onboardingsguiden</div>
        </div>
        <FokusSvg className={styles.illustration} />
      </div>
    </StyledLink>
  );
}

export default OnboardingCard;
