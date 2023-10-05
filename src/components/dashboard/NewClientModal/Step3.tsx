import React, {useContext} from "react";
import styles from "./styles.module.scss";
import {Label, Paragraph} from "@digdir/design-system-react";
import {bold} from "../../util/textTransforms";
import StyledLink from "../../common/StyledLink/StyledLink";
import {NewClientContext} from "./NewClientModal";

interface Props {
    env: string;
    scope: string;
}

const Step3 = (props: Props) => {
    const context = useContext(NewClientContext);

    if (!context) {
        return null;
    }

    return (
      <div className={styles.successContainer}>
        <div>
          <div className={styles.responseInfo}>
            <div className={styles.responseInfoContent}>
              <div>
                <Label>Miljø:</Label>
                <Paragraph>{context.requestResponse?.data.env}</Paragraph>
              </div>
              <div>
                <Label>API tilgang:</Label>
                <Paragraph>{context.requestResponse?.data.scopes.join(",")}</Paragraph>
              </div>
              <div>
                <Label>Integrasjonsbeskrivelse:</Label>
                <Paragraph>{context.requestResponse?.data.description}</Paragraph>
              </div>
              <div>
                <Label>Klient-id:</Label>
                <Paragraph>{context.requestResponse?.data.clientId}</Paragraph>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.usageInfo}>
          <Label>{bold("Ta i bruk integrasjon?")}</Label>
          <Paragraph>
            Følg var onboardingsguide for informasjon om hvordan du kan ta i bruk
            integrasjonen din
          </Paragraph>
          <div className={styles.usageButtons}>
            <StyledLink to={"/guide"}>Gå til Onboardingsguiden</StyledLink>
          </div>
        </div>
      </div>
    );
};

export default Step3;