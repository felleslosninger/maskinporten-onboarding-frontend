import React, {useState} from "react";
import styles from "./styles.module.scss";
import {Heading, Label, Paragraph} from "@digdir/design-system-react";
import InfoBox from "../InfoBox/InfoBox";
import {bold, link} from "../../util/textTransforms";
import CodeExample from "../CodeExample/CodeExample";
import CodeLanguage from "../CodeExample/CodeLanguage";
import { TasklistIcon, KeyHorizontalIcon, BagdeIcon } from "@navikt/aksel-icons";
import sertificateCode from "../CodeExample/sertificateCode.json";
import keyCode from "../CodeExample/keyCode.json";
import otherCode from "../CodeExample/otherCode.json";



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
                        [TEST-]virksomhetssertifikat. {link("/", "Hvordan skaffer jeg et virksomhetssertifikat?")}
                    </li>
                    <li>
                        Opprettet ny klient eller bruk valgt klient.
                    </li>
                </ol>
                <Heading size={"medium"}>
                    Fremgangsmåte
                </Heading>
                <ol className={styles.orderedList}>
                    <li>Lag JWT-grant som inneholder det fulle virksomhetssertifikatet i headeren.</li>
                    <li>Signer JWT-grant med virksomhetssertifikatet.</li>
                    <li>Send til maskinporten.</li>
                    <li>Bruk det returnerte tokenet som bearer-token mot tjenesten.</li>
                </ol>
            </InfoBox>

            <CodeExample title={"Se kode-eksempel JWT-grant"}>
                <CodeLanguage title={"Node.js"} language={"javascript"} code={sertificateCode.node} />
                <CodeLanguage title={"Java"} language={"java"} code={sertificateCode.java} />
                <CodeLanguage title={"Python"} language={"python"} code={sertificateCode.python} />
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
                    <li>Lag klient med med nøkkelpar fra for eksempel {link("https://mkjwk.org", "mkjwk.org", true)}.</li>
                    <li>Lag JWT-grant og referer til kid.</li>
                    <li>Signer med privatnøkkelen opprettet i steg 1.</li>
                    <li>Send til maskinporten.</li>
                    <li>Bruk det returnerte tokenet som bearer-token mot tjenesten.</li>
                </ol>
            </InfoBox>

            <CodeExample title={"Se kode-eksempel JWT-grant"}>
                <CodeLanguage title={"Node.js"} language={"javascript"} code={keyCode.node} />
                <CodeLanguage title={"Java"} language={"java"} code={keyCode.java} />
                <CodeLanguage title={"Python"} language={"python"} code={keyCode.python} />
            </CodeExample>
        </>
    );

    const otherSection = () => (
        <>
            <Heading size={"large"} className={styles.largeHeader}>
                Andre fremgangsmåter
            </Heading>
            <Paragraph className={styles.paragraph}>
                Du kan også bruke manuelt opplastet virksomhetssertifikat eller selvbetjenings-API.
            </Paragraph>

            <Heading size={"large"} className={styles.largeHeader}>
                Via selvbetjenings-API
            </Heading>
            <Paragraph className={styles.paragraph}>
                Dette er den beste måten for virksomheten som vil implementere inn-og utmelding av klienter
                automatisk og ønsker å opprette unike kortlevende nøkkelpart kan du bruke
                maskinporten sitt eget API. Se feks NAV sin digdirator som gjør dette som en del av
                sin platform https://github.com/nais/digdirator/tree/master.
            </Paragraph>
            <Paragraph className={styles.paragraph}>
                Dette kan du dessverre ikke gjøre via Forenklet onboarding. Ta kontakt
                med servicedesk@digdir.no og be om klient for administrasjon av
                Maskinporten-APIer og ta dette i bruk via Samarbeidsportalen.
            </Paragraph>

            <Heading size={"large"} className={styles.largeHeader}>
                Med manuelt opplastet virksomhetssertifikat
            </Heading>
            <Paragraph className={styles.paragraph}>
                Dersom du kun ønsker å ha ett gyldig virksomhetssertifikat å signere med kan du laste
                dette opp (her eller i samarbeidsportalen). Da referer du til serfifikatet i grant
                og singerer med akkuart det. Se kode-eksempel lengre ned på siden.
            </Paragraph>

            <InfoBox>
                {bold("Forutsetninger:")}
                <Paragraph className={styles.paragraph}>
                    [TEST-]virksomhetssertifikat. {link("/", "Hvordan skaffer jeg et virksomhetssertifikat?")}
                </Paragraph>
                <Heading size={"medium"}>
                    Fremgangsmåte
                </Heading>
                <ol className={styles.orderedList}>
                    <li>Lag klient med virksomhetssertifikat.</li>
                    <li>Lag JWT-grant og referer til kid.</li>
                    <li>Signer med det samme virksomhetssertifikatet som du lastet opp i steg 1.</li>
                    <li>Send til maskinporten.</li>
                    <li>Bruk det returnerte tokenet som bearer-token mot tjenesten.</li>
                </ol>
            </InfoBox>

            <CodeExample title={"Se kode-eksempel JWT-grant"}>
                <CodeLanguage title={"Node.js"} language={"javascript"} code={otherCode.node} />
                <CodeLanguage title={"Java"} language={"java"} code={otherCode.java} />
                <CodeLanguage title={"Python"} language={"python"} code={otherCode.python} />
            </CodeExample>
        </>
    )

    return (
        <div className={styles.tabsContainer}>
            <div className={styles.tabs}>
                <div className={`${styles.tab} ${selectedTab === 1 ? styles.active : styles.inactive}`} onClick={() => setSelectedTab(1)}>
                    <BagdeIcon />
                    <Label size={"large"}>Virksomhetssertifikat</Label>
                </div>
                <div className={`${styles.tab} ${selectedTab === 2 ? styles.active : styles.inactive}`} onClick={() => setSelectedTab(2)}>
                    <KeyHorizontalIcon />
                    <Label size={"large"}>Manuelt opplastede nøkler</Label>
                </div>
                <div className={`${styles.tab} ${selectedTab === 3 ? styles.active : styles.inactive}`} onClick={() => setSelectedTab(3)}>
                    <TasklistIcon />
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