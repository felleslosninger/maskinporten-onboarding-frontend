import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { Paragraph } from "@digdir/design-system-react";
import { bold } from "../../util/textTransforms";
import StyledLink from "../../common/StyledLink/StyledLink";
import { NewClientContext } from "./NewClientModal";

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
              <Paragraph>Miljø:</Paragraph>
              <Paragraph>{props.env}</Paragraph>
            </div>
            <div>
              <Paragraph>API tilgang:</Paragraph>
              <Paragraph>
                {context.requestResponse?.data.scopes.join(",")}
              </Paragraph>
            </div>
            <div>
              <Paragraph>Integrasjonsbeskrivelse:</Paragraph>
              <Paragraph>{context.requestResponse?.data.description}</Paragraph>
            </div>
            <div>
              <Paragraph>Klient-id:</Paragraph>
              <Paragraph>{context.requestResponse?.data.clientId}</Paragraph>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.usageInfo}>
        <Paragraph>{bold("Ta i bruk integrasjon?")}</Paragraph>
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
