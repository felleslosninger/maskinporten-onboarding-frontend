import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { HelpText, Label, Radio, TextArea } from "@digdir/design-system-react";
import { link } from "../../util/textTransforms";
import { customAlphabet } from "nanoid";
import { NewClientContext } from "./NewClientModal";

const Step2 = () => {
  const context = useContext(NewClientContext);

  if (!context) {
    return null;
  }

  const nanoid = customAlphabet(
    "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    10,
  );

  const onChangeIntegration = (val: string | undefined) => {
    if (val === "true") {
      context.isKeys.set(true);
      context.kid.set(nanoid(10));
    } else {
      context.isKeys.set(false);
    }
    context.error.set(undefined);
    context.isIntegrationChosen.set(true);
  };

  return (
    <>
      <div className={styles.integrationSelect}>
        <div className={styles.radioButtons}>
          <Radio.Group
            onChange={onChangeIntegration}
            legend={
              <div className={styles.radioButtonLabel}>
                Hvordan vil du integrere med tjenesten
                <HelpText
                  className={styles.helpText}
                  title={"Mer info om integrasjoner"}
                >
                  Det finnes flere måter å integrere mot Maskinporten. Bruk av
                  nøkkel og virkomshetssertifikate er tilgjengelig via forenklet
                  onboarding og flere via Samarbeidsportalen.
                  <br />
                  {link(
                    "/guide",
                    "Se beskrivelse av de forskjellige metodene her",
                    true,
                  )}
                </HelpText>
              </div>
            }
          >
            <Radio value={"true"}>Med manuelt opplastet nøkkel</Radio>
            <Radio value={"false"}>
              Signere direkte med virksomhetssertifikat
            </Radio>
          </Radio.Group>
        </div>
        <div className={styles.integrationInfo}>
          {context.isKeys.get && (
            <>
              <Label size={"large"}>
                Nøkkelen din får følgende key-id (kid):
              </Label>
              <Label size={"large"} className={styles.kid}>
                {context.kid.get}
              </Label>
              <Label size={"small"}>Vi støtter kun RSA256 nøkler.</Label>
            </>
          )}
        </div>
      </div>

      {context.isKeys.get && (
        <div className={styles.keyTextArea}>
          <TextArea
            label={"Legg til public-delen av nøkkelen du vil bruke"}
            required
            value={context.key.get}
            placeholder={
              "-----BEGIN RSA PUBLIC KEY-----\n" +
              "MIIBCgKCAQEA+xGZ/wcz9ugFpP07Nspo6U17l0YhFiFpxxU4pTk3Lifz9R3zsIsu\n" +
              "ERwta7+fWIfxOo208ett/jhskiVodSEt3QBGh4XBipyWopKwZ93HHaDVZAALi/2A\n" +
              "mwSXA9VNmhz+PiB+Dml4WWnKW/VHo2ujTXxq7+efMU4H2fny3Se3KYOsFPFGZ1TN\n" +
              "QSYlFuShWrHPtiLmUdPoP6CV2mML1tk+l7DIIqXrQhLUKDACeM5roMx0kLhUWB8P\n" +
              "+0uj1CNlNN4JRZlC7xFfqiMbFRU9Z4N6YwIDAQAB\n" +
              "-----END RSA PUBLIC KEY-----"
            }
            onChange={(e) => context.key.set(e.target.value)}
          />
        </div>
      )}
    </>
  );
};

export default Step2;
