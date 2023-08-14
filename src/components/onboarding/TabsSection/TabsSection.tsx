import React, {useState} from "react";
import styles from "./styles.module.scss";
import {Heading, Label, Paragraph} from "@digdir/design-system-react";
import InfoBox from "../InfoBox/InfoBox";
import {bold, link} from "../../util/textTransforms";
import CodeExample from "../CodeExample/CodeExample";
import CodeLanguage from "../CodeExample/CodeLanguage";
import {TasklistIcon, KeyHorizontalIcon, BagdeIcon} from "@navikt/aksel-icons";
import sertificateCode from "../CodeExample/sertificateCode.json";
import keyCode from "../CodeExample/keyCode.json";

function TabsSection() {
    const [selectedTab, setSelectedTab] = useState(1);

    const sertificateSection = () => (
        <>
            <Heading className={styles.largeHeader} size={"large"}>
                Signere direkte med virksomhetssertifikat
            </Heading>
            <Paragraph className={styles.paragraph}>
                Når du signerer direkte med virksomhetssertifikat bruker du test eller prod-virksomhetssertifikatet
                og legger hele inn som en del av JWT-grant før du sender til maskinporten. Du bruker også
                virksomhetssertifikatet til å signere tokenet. Du trenger ikke å laste opp nøkler eller
                virksomhetssertifikat og kan signere med hvilket du vil.
            </Paragraph>
            <InfoBox>
                {bold("Forutsetninger:")}
                <ol className={`${styles.paragraph} ${styles.orderedList}`}>
                    <li>
                        Det finnes et virksomhetssertifikat tilgjengelig for rett miljø. {link("https://docs.digdir.no/docs/Maskinporten/maskinporten_autentisering#hvem-kan-utstede-virksomhetssertifikater", "Hvordan skaffer jeg et virksomhetssertifikat?")}
                    </li>
                    <li>
                        API-tilgangen er gitt til din virksomhet av organisasjonen som tilbyr API'et. Når dette er gjort vil du se tilgangen i {link("/dashboard", "oversikten")}.
                    </li>
                    <li>
                        Det er opprett en {link("/dashboard", "ny klient ")} eller en eksisterende klient som du ønsker å gjenbruke
                    </li>
                </ol>
                <Heading size={"medium"}>
                    Fremgangsmåte
                </Heading>
                <ol className={styles.orderedList}>
                    <li>Lag JWT-grant i henhold til {link("https://docs.digdir.no/docs/Maskinporten/maskinporten_protocol_jwtgrant","standarden")}. Følgende felter er påkrevd</li>
                        <ol>
                            <li>Headerfeltet <code>alg</code>: RS256, RS384 eller RS512 er mulige verdier støttet av Maskinporten</li>
                            <li>Headerfeltet <code>x5c</code>: Virksomhetssertifikat </li>
                            <li>Bodyfeltet <code>aud</code>: __MASKINPORTEN_URL__</li>
                            <li>Bodyfeltet <code>iss</code>: client-id for klienten du ønsker å bruke</li>
                            <li>Bodyfeltet <code>scope</code>: scopet knyttet til apiet du vil aksessere</li>
                            <li>Bodyfeltet <code>ita</code>: Timestamp i UTC-tid</li>
                            <li>Bodyfeltet <code>exp</code>: Timestamp for utgått tilgang i UTC-tid</li>
                        </ol>
                    Anbefalt eller knyttet til APIet som skal benyttes
                    <ol>
                        <li>Bodyfeltet <code>jti</code>: unik uuid</li>
                        <li>Bodyfeltet <code>resource</code>: Dersom API-tilbyder har spesifisert en audience-begrensning på sitt API må den settes her.
                            Gyldige verdier må beskrives av API-tilbyder. Se mer om {link("https://docs.digdir.no/docs/Maskinporten/maskinporten_func_audience_restricted_tokens", "audience-begrensning", true)}</li>
                    </ol>
                    <li>Signer JWT-grant med virksomhetssertifikatet</li>
                    <li>POST med content-type <code>application/x-www-form-urlencoded</code> til Maskinporten sin issuer-url __MASKINPORTEN_URL__
                        <ol>
                            <li>Parameteret <code>grant</code> med verdi <code>urn:ietf:params:oauth:grant-type:jwt-bearer</code></li>
                            <li>Parameteret <code>assertion</code> med serialisert JWT-grant som verdi</li>
                        </ol>
                    </li>
                    <li>I POST-responsen vil du motta et JSON. Feltet <code>access_token</code> vil være autentisering
                        som trengs mot tjenestetilbyder. <code>expiresIn</code> vil beskrive hvor lenge tokenet er gyldig,
                        vanligvis 2 minutter.
                    </li>
                    <li>Gjør en kall til API-tjenesten med innholdet i <code>access_token</code> som en del av http-headeren </li>
                </ol>
            </InfoBox>

            <CodeExample title={"Eksempelkode"}>
                <CodeLanguage title={"Java"} language={"java"} code={sertificateCode.java}/>
            </CodeExample>
        </>
    );

    const keySection = () => (
        <>
            <Heading size={"large"} className={styles.largeHeader}>
                Med manuelt opplastede nøkler
            </Heading>
            <Paragraph className={styles.paragraph}>
                Lag eget nøkkelpar og last opp til klienten. Referer til
                nøkkelen i tokenet of signer med rett sertifikat.
            </Paragraph>

            <InfoBox>
                {bold("Forutsetninger:")}
                <Paragraph className={styles.paragraph}>
                    Nøkkelen må lastes opp samtidig med at klienten opprettes.
                </Paragraph>
                <Heading size={"medium"}>
                    Fremgangsmåte
                </Heading>
                <ol className={styles.orderedList}>
                    <li>Lag klient med med nøkkelpar fra for eksempel {link("https://mkjwk.org", "mkjwk.org", true)}.
                    </li>
                    <li>Lag JWT-grant og referer til kid.</li>
                    <li>Signer med privatnøkkelen opprettet i steg 1.</li>
                    <li>Send til maskinporten.</li>
                    <li>Bruk det returnerte tokenet som bearer-token mot tjenesten.</li>
                </ol>
            </InfoBox>

            <CodeExample title={"Se kode-eksempel JWT-grant"}>
                <CodeLanguage title={"Java"} language={"java"} code={keyCode.java}/>
            </CodeExample>
        </>
    );

    const otherSection = () => (
        <>
            <Heading size={"large"} className={styles.largeHeader}>
                Andre fremgangsmåter
            </Heading>
            <Paragraph className={styles.paragraph}>
                Du kan også automatisere via Maskinportens
                selvbetjenings-API eller bruke et manuelt opplastet virksomhetssertifikat.
            </Paragraph>

            <Heading size={"large"} className={styles.largeHeader}>
                Via selvbetjenings-API
            </Heading>
            <Paragraph className={styles.paragraph}>
                Dersom du har mange servere og ønsker å ha kortlevde, unike nøkler, kan du benytte deg av Maskinportens
                selvbetjenings-API. Dette gir mulighet for å automatisere inn- og utmelding av klienter,
                men kan kreve mer av et platform- eller utviklingsteam.Dersom din virksomhet har et eget
                Kubernets-cluster, har NAV open-sourcet sin cluster operator {link("https://github.com/nais/digdirator", "digdirator", true)} som automatiserer prosessen.
            </Paragraph>
            <Paragraph className={styles.paragraph}>
                Selvbetjenings-API er dokumentert {link("https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_api", "her", true)}.
                Pålogging til APIet er igjen sikret med Maskinporten og krever en egen klient med scope `idporten:scopes.write`.
                Denne løsningen for forenklet onboarding støtter foreløpig ikke prosessen videre for å få tak i denne
                tilgangen og du må sende en forespørsel til servicedesk@digdir.no. Se mer informasjon
                {link("https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_api#tilgang-administrasjon-av-api", "her", true)}.
            </Paragraph>

            <Heading size={"large"} className={styles.largeHeader}>
                Med manuelt opplastet virksomhetssertifikat
            </Heading>
            <Paragraph className={styles.paragraph}>
                Dersom du kun ønsker å ha <strong>ett</strong> gyldig virksomhetssertifikat å signere med for hver klient, støtter vi dessverre ikke
                dette for øyeblikket som en del av forenklet onboarding-løsningen. I dette tilfellet, ta kontakt med servicedesk@digdir.no for å få
                tilgang til Samarbeidsportalen.
            </Paragraph>
        </>
    )

    return (
        <div className={styles.tabsContainer}>
            <div className={styles.tabs}>
                <div className={`${styles.tab} ${selectedTab === 1 ? styles.active : styles.inactive}`}
                     onClick={() => setSelectedTab(1)}>
                    <BagdeIcon/>
                    <Label size={"large"}>Virksomhetssertifikat</Label>
                </div>
                <div className={`${styles.tab} ${selectedTab === 2 ? styles.active : styles.inactive}`}
                     onClick={() => setSelectedTab(2)}>
                    <KeyHorizontalIcon/>
                    <Label size={"large"}>Manuelt opplastede nøkler</Label>
                </div>
                <div className={`${styles.tab} ${selectedTab === 3 ? styles.active : styles.inactive}`}
                     onClick={() => setSelectedTab(3)}>
                    <TasklistIcon/>
                    <Label size={"large"}>Andre fremgangsmåter</Label>
                </div>
            </div>
            <div className={styles.tabsContentContainer}>
                <div className={styles.tabsContent}>
                    {selectedTab === 1 && sertificateSection()}
                    {selectedTab === 2 && keySection()}
                    {selectedTab === 3 && otherSection()}
                </div>
            </div>
        </div>
    );
}

export default TabsSection;