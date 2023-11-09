import React from "react";
import { Heading, Paragraph } from "@digdir/design-system-react";
import InfoBox from "../InfoBox/InfoBox";
import { link } from "../../util/textTransforms";
import styles from "./styles.module.scss";
import CodeExample from "../CodeExample/CodeExample";
import CodeLanguage from "../CodeExample/CodeLanguage";
import keyCode from "../CodeExample/keyCode.json";
import ConfigBox from "./ConfigBox";

function KeySection() {
  return (
    <>
      <Heading level={2} size={"large"} spacing>
        Med manuelt opplastet nøkkel
      </Heading>
      <Paragraph spacing>
        Her lager du ditt eget asymmentriske nøkkelpar. Når du oppretter en ny
        integrasjon, legger du ved public-nøkkelen du ønsker å bruke. Du får en
        {" "}<span lang={"en"}>key</span> id (kid) som du kan referer til som en del
        av JWT-grant og bruker privatnøkkelen til å signere hele JWT-tokenet
      </Paragraph>

      <InfoBox>
        <Heading level={3} size={"xxsmall"}>Forutsetninger:</Heading>
        <ol className={`${styles.bottomSpacing} ${styles.orderedList}`}>
          <li>
            API-tilgangen er gitt til din virksomhet av organisasjonen som
            tilbyr API'et. Når dette er gjort vil du se tilgangen i{" "}
            {link("/dashboard", "oversikten")}.
          </li>
          <li>
            Du har opprettet et RSA nøkkelpar og har
            public-delen av nøkkelen tilgjengelig. Om du ikke har et
            eksisterende nøkkelpar kan du opprette et med kommandoene. Om du
            ikke trenger en keystore, kan du hoppe over punkt to.
            <ol>
              <li>
                <code lang={"en"}>
                  openssl req -newkey rsa:2048 -x509 -keyout key.pem -out
                  cert.pem -days 365
                </code> oppretter en ny nøkkel og selvsignert sertifikat
              </li>
              <li>
                <code lang={"en"}>
                  openssl pkcs12 -export -in cert.pem -inkey key.pem -out
                  certificate.p12 -name "certificate"
                </code>
                {" "} lager en keystore som passer java-eksempelet under med navn
                "certificate". Denne er ikke nøvendig om du ikke trenger en
                keystore.
              </li>
              <li>
                <code lang={"en"}>
                  openssl rsa -in key.pem -pubout -out maskinporten.pem.pub
                </code>
                {" "} henter ut public-delen til fila maskinporten.pem.pub .
              </li>
            </ol>
          </li>
          <li>
            Det er opprett en {link("/dashboard", "ny integrasjon ")} eller en
            eksisterende integrasjon som du ønsker å gjenbruke et eksisterende
            nøkkelsett. Dersom du oppretter ny integrasjon, last opp
            public-delen av nøkkelen du ønsker å bruke ved opprettelse.
          </li>
        </ol>
        <Heading level={3} size={"medium"}>Fremgangsmåte</Heading>
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
              Headerfeltet <code lang={"en"}>alg</code>: RS256, RS384 eller RS512 er mulige
              verdier støttet av Maskinporten
            </li>
            <li>
              Headerfeltet <code lang={"en"}>kid</code>: key-id (kid) fra integrasjonen du
              ønsker å bruke
            </li>
            <li>
              Bodyfeltet <code lang={"en"}>aud</code>: Maskinporten sin issuer-url, se
              miljøspesifikke url under Konfigurasjonsfelter
            </li>
            <li>
              Bodyfeltet <code lang={"en"}>iss</code>: client-id for integrasjonen du ønsker
              å bruke
            </li>
            <li>
              Bodyfeltet <code lang={"en"}>scope</code>: scopet knyttet til apiet du vil
              aksessere
            </li>
            <li>
              Bodyfeltet <code lang={"en"}>iat</code>: Timestamp i UTC-tid
            </li>
            <li>
              Bodyfeltet <code lang={"en"}>exp</code>: Timestamp for utgått tilgang i
              UTC-tid
            </li>
          </ol>
          Anbefalt eller knyttet til APIet som skal benyttes
          <ol>
            <li>
              Bodyfeltet <code lang={"en"}>jti</code>: unik uuid
            </li>
            <li>
              Bodyfeltet <code lang={"en"}>resource</code>: Dersom API-tilbyder har
              spesifisert en audience-begrensning på sitt API må den settes her.
              Gyldige verdier må beskrives av API-tilbyder. Se mer om{" "}
              {link(
                "https://docs.digdir.no/docs/Maskinporten/maskinporten_func_audience_restricted_tokens",
                "audience-begrensning",
                true,
              )}
            </li>
          </ol>
          <li>Signer JWT-grant med privatnøkkelen du har opprettet</li>
          <li>
            POST med content-type <code lang={"en"}>application/x-www-form-urlencoded</code>{" "}
            til Maskinporten sitt token-endepunkt* og følgende parametre i body
            <ol>
              <li>
                <code lang={"en"}>grant</code> med verdi{" "}
                <code lang={"en"}>urn:ietf:params:oauth:grant-type:jwt-bearer</code>
              </li>
              <li>
                <code lang={"en"}>assertion</code> med serialisert JWT-grant som verdi
              </li>
            </ol>
          </li>
          <li>
            I POST-responsen vil du motta et JSON. Feltet{" "}
            <code lang={"en"}>access_token</code> vil være autentisering som trengs mot
            tjenestetilbyder. <code lang={"en"}>expiresIn</code> vil beskrive hvor lenge
            tokenet er gyldig, vanligvis 2 minutter.
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
        filter={(client) => !!client.keys}
        filterText={"nøkler"}
      >
        <CodeLanguage
          title={"Java"}
          language={"java"}
          code={keyCode.java}
          dependencies={keyCode.dependencies.java}
        />
        <CodeLanguage
          title={"Python"}
          language={"python"}
          code={keyCode.python}
          dependencies={keyCode.dependencies.python}
        />
        <CodeLanguage
          title={"NodeJs"}
          language={"javascript"}
          code={keyCode.node}
          dependencies={keyCode.dependencies.node}
        />
      </CodeExample>
    </>
  );
}

export default KeySection;
