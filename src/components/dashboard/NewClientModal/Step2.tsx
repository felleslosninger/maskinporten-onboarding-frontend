import React, { useContext } from "react";
import styles from "./styles.module.scss";
import {
  HelpText,
  Paragraph,
  Radio,
  Textarea,
} from "@digdir/design-system-react";
import { link } from "../../util/textTransforms";
import { customAlphabet } from "nanoid";
import { NewClientContext } from "./NewClientModal";
import { importSPKI } from "jose";

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
    context.message.set(undefined);
    context.isIntegrationChosen.set(true);
  };

  const onKeyChanged = async (key: string) => {
    context.message.set(undefined); // reset error message if exists
    context.key.set(key);

    try {
      const spki: CryptoKey = await importSPKI(key, "RS256", {
        extractable: true,
      });
      const alg = spki.algorithm as RsaKeyAlgorithm;
      if (alg.modulusLength < 2048) {
        const tip = (
          <HelpText title={"Mer info"}>
            Denne nøkkelen bruker en modulus på lengde {alg.modulusLength}. Vi
            anbefaler en lengde på minimum 2048 bits.
          </HelpText>
        );
        context.message.set({
          message: <span>Denne nøkkelen kan være usikker {tip}</span>,
          level: "warn",
        });
      }
    } catch (e) {
      context.message.set({
        message: "Dette er en ugyldig RSA public key",
        level: "err",
      });
    }
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
                  aria-label={"Les mer"}
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
              <Paragraph size={"large"}>
                Nøkkelen din får følgende key-id (kid):
              </Paragraph>
              <Paragraph size={"large"} className={styles.kid}>
                {context.kid.get}
              </Paragraph>
              <Paragraph size={"small"}>Vi støtter kun RSA nøkler.</Paragraph>
            </>
          )}
        </div>
      </div>

      {context.isKeys.get && (
        <div className={styles.keyTextArea}>
          <Textarea
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
            onChange={(e) => onKeyChanged(e.target.value)}
          />
        </div>
      )}
    </>
  );
};

export default Step2;
