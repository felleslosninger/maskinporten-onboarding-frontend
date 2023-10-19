import React from "react";
import { Heading, Paragraph } from "@digdir/design-system-react";
import InfoBox from "../InfoBox/InfoBox";
import { bold, link } from "../../util/textTransforms";
import styles from "./styles.module.scss";
import CodeExample from "../CodeExample/CodeExample";
import CodeLanguage from "../CodeExample/CodeLanguage";
import sertificateCode from "../CodeExample/sertificateCode.json";
import ConfigBox from "./ConfigBox";

function SertificateSection() {
  return (
    <>
      <Heading spacing size={"large"}>
        Signere direkte med virksomhetssertifikat
      </Heading>
      <Paragraph spacing>
        Når du signerer direkte med virksomhetssertifikat bruker du test eller
        prod-virksomhetssertifikatet og legger hele inn som en del av JWT-grant
        før du sender til maskinporten. Du bruker også virksomhetssertifikatet
        til å signere tokenet. Du trenger ikke å laste opp nøkler eller
        virksomhetssertifikat og kan signere med hvilket du vil.
      </Paragraph>
      <InfoBox>
        {bold("Forutsetninger:")}
        <ol className={`${styles.bottomSpacing} ${styles.orderedList}`}>
          <li>
            Det finnes et virksomhetssertifikat tilgjengelig for rett miljø.{" "}
            {link(
              "https://docs.digdir.no/docs/Maskinporten/maskinporten_autentisering#hvem-kan-utstede-virksomhetssertifikater",
              "Hvordan skaffer jeg et virksomhetssertifikat?",
            )}
          </li>
          <li>
            API-tilgangen er gitt til din virksomhet av organisasjonen som
            tilbyr API'et. Når dette er gjort vil du se tilgangen i{" "}
            {link("/dashboard", "oversikten")}.
          </li>
          <li>
            Det er opprett en {link("/dashboard", "ny integrasjon ")} eller en
            eksisterende integrasjon som du ønsker å gjenbruke . Denne må være
            opprettet med integrasjonsmetode "virksomhetssertifikat"
          </li>
        </ol>
        <Heading size={"medium"}>Fremgangsmåte</Heading>
        <ol className={styles.orderedList}>
          <li>
            Lag JWT-grant i henhold til{" "}
            {link(
              "https://docs.digdir.no/docs/Maskinporten/maskinporten_protocol_jwtgrant",
              "standarden",
            )}
            . Følgende felter er påkrevd
          </li>
          <ol>
            <li>
              Headerfeltet <code>alg</code>: RS256, RS384 eller RS512 er mulige
              verdier støttet av Maskinporten
            </li>
            <li>
              Headerfeltet <code>x5c</code>: Virksomhetssertifikat{" "}
            </li>
            <li>
              Bodyfeltet <code>aud</code>: Maskinporten sin issuer-url, se
              miljøspesifikke url under Konfigurasjonsfelter
            </li>
            <li>
              Bodyfeltet <code>iss</code>: client-id for integrasjonen du ønsker
              å bruke
            </li>
            <li>
              Bodyfeltet <code>scope</code>: scopet knyttet til apiet du vil
              aksessere
            </li>
            <li>
              Bodyfeltet <code>ita</code>: Timestamp i UTC-tid
            </li>
            <li>
              Bodyfeltet <code>exp</code>: Timestamp for utgått tilgang i
              UTC-tid
            </li>
          </ol>
          Anbefalt eller knyttet til APIet som skal benyttes
          <ol>
            <li>
              Bodyfeltet <code>jti</code>: unik uuid
            </li>
            <li>
              Bodyfeltet <code>resource</code>: Dersom API-tilbyder har
              spesifisert en audience-begrensning på sitt API må den settes her.
              Gyldige verdier må beskrives av API-tilbyder. Se mer om{" "}
              {link(
                "https://docs.digdir.no/docs/Maskinporten/maskinporten_func_audience_restricted_tokens",
                "audience-begrensning",
                true,
              )}
            </li>
          </ol>
          <li>Signer JWT-grant med virksomhetssertifikatet</li>
          <li>
            POST med content-type <code>application/x-www-form-urlencoded</code>{" "}
            til Maskinporten sitt token-endepunkt* og følgende parametre i body
            <ol>
              <li>
                <code>grant</code> med verdi{" "}
                <code>urn:ietf:params:oauth:grant-type:jwt-bearer</code>
              </li>
              <li>
                <code>assertion</code> med serialisert JWT-grant som verdi
              </li>
            </ol>
          </li>
          <li>
            I POST-responsen vil du motta et JSON. Feltet{" "}
            <code>access_token</code> vil være autentisering som trengs mot
            tjenestetilbyder. <code>expiresIn</code> vil beskrive hvor lenge
            tokenet er gyldig, vanligvis 2 minutter.
          </li>
          <li>
            Gjør en kall til API-tjenesten med innholdet i{" "}
            <code>access_token</code> som en del av http-headeren:{" "}
            <code>Authentication: Bearer accesstoken-verdi</code>{" "}
          </li>
        </ol>
      </InfoBox>

      <ConfigBox />

      <CodeExample
        title={"Eksempelkode"}
        filter={(client) => !client.keys}
        filterText={"virksomhetssertifikat"}
      >
        <CodeLanguage
          title={"Java 8"}
          language={"java"}
          code={sertificateCode.java}
        />
      </CodeExample>
    </>
  );
}

export default SertificateSection;
