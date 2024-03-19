import React from "react";
import { Heading, Paragraph } from "@digdir/designsystemet-react";
import InfoBox from "../InfoBox/InfoBox";
import { link } from "../../util/textTransforms";
import styles from "./styles.module.scss";
import CodeExample from "../CodeExample/CodeExample";
import CodeLanguage from "../CodeExample/CodeLanguage";
import sertificateCode from "../CodeExample/sertificateCode.json";
import ConfigBox from "./ConfigBox";

function SertificateSection() {
  return (
    <>
      <Heading level={2} spacing size={"large"}>
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
        <Heading level={3} size={"xxsmall"}>
          Forutsetninger:
        </Heading>
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
            eksisterende integrasjon som du ønsker å gjenbruke. Denne må være
            opprettet med integrasjonsmetode "virksomhetssertifikat"
          </li>
        </ol>
        <Heading level={3} size={"medium"}>
          Fremgangsmåte
        </Heading>
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
              Headerfeltet <code lang={"en"}>alg</code>: RS256, RS384 eller
              RS512 er mulige verdier støttet av Maskinporten
            </li>
            <li>
              Headerfeltet <code lang={"en"}>x5c</code>: Virksomhetssertifikat
              på X.509 format.
            </li>
            <li>
              Bodyfeltet <code lang={"en"}>aud</code>: Maskinporten sin
              issuer-url, se miljøspesifikke url under Konfigurasjonsfelter
            </li>
            <li>
              Bodyfeltet <code lang={"en"}>iss</code>: Integrasjons-id for
              integrasjonen du ønsker å bruke
            </li>
            <li>
              Bodyfeltet <code lang={"en"}>scope</code>: Scopet knyttet til
              apiet du vil aksessere
            </li>
            <li>
              Bodyfeltet <code lang={"en"}>iat</code>: Timestamp i UTC-tid
            </li>
            <li>
              Bodyfeltet <code lang={"en"}>exp</code>: Timestamp for utgått
              tilgang i UTC-tid. Maksimal tillatt verdi her er 120 sekunder
              etter <code lang={"en"}>iat</code> timestamp.
            </li>
          </ol>
          Anbefalt eller knyttet til APIet som skal benyttes
          <ol>
            <li>
              Bodyfeltet <code lang={"en"}>jti</code>: Unik uuid for hver grant.
              Kan ikke gjenbrukes.
            </li>
            <li>
              Bodyfeltet <code lang={"en"}>resource</code>: Dersom API-tilbyder
              har spesifisert en audience-begrensning på sitt API må den settes
              her. Gyldige verdier må beskrives av API-tilbyder. Se mer om{" "}
              {link(
                "https://docs.digdir.no/docs/Maskinporten/maskinporten_func_audience_restricted_tokens",
                "audience-begrensning",
                true,
              )}
            </li>
          </ol>
          <li>
            Signer <span lang={"en"}>JWT-grant</span> med
            virksomhetssertifikatet
          </li>
          <li>
            POST med content-type{" "}
            <code lang={"en"}>application/x-www-form-urlencoded</code> til
            Maskinporten sitt token-endepunkt (se url-er i seksjonen
            Konfigurasjonsfelter) og følgende parametre i body
            <ol>
              <li>
                <code lang={"en"}>grant</code>: Skal alltid ha verdien{" "}
                <code lang={"en"}>
                  urn:ietf:params:oauth:grant-type:jwt-bearer
                </code>
              </li>
              <li>
                <code lang={"en"}>assertion</code>: Serialisert og ferdigsignert
                JWT-grant
              </li>
            </ol>
          </li>
          <li>
            I POST-responsen vil du motta et JSON. Feltet{" "}
            <code lang={"en"}>access_token</code> vil være autentisering som
            trengs mot tjenestetilbyder. <code lang={"en"}>expiresIn</code> vil
            beskrive hvor lenge tokenet er gyldig, vanligvis 2 minutter.
          </li>
          <li>
            Gjør en kall til API-tjenesten med innholdet i{" "}
            <code lang={"en"}>access_token</code> som en del av http-headeren:{" "}
            <code lang={"en"}>Authentication: Bearer [accesstoken]</code>{" "}
          </li>
        </ol>
      </InfoBox>

      <ConfigBox />

      <CodeExample
        filter={(client) => !client.keys}
        filterText={"virksomhetssertifikat"}
      >
        <CodeLanguage
          title={"Java 8"}
          language={"java"}
          code={sertificateCode.java}
          dependencies={sertificateCode.dependencies.java}
        />
      </CodeExample>
    </>
  );
}

export default SertificateSection;
