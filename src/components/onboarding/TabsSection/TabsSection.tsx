import React, {useState} from "react";
import styles from "./styles.module.scss";
import {Heading, Label, Paragraph} from "@digdir/design-system-react";
import InfoBox from "../InfoBox/InfoBox";
import {bold, link} from "../../util/textTransforms";
import {useUser} from "../../../hooks/auth";
import CodeExample from "../CodeExample/CodeExample";
import CodeLanguage from "../CodeExample/CodeLanguage";
import {ReactComponent as Nokler} from "../../../assets/nokler.svg";
import {ReactComponent as Sertifikat} from "../../../assets/sertifikat.svg";
import serificateCode from "../CodeExample/sertificateCode.json";


function TabsSection() {
    const [selectedTab, setSelectedTab] = useState(1);

    const sertificateSection = () => (
        <>
            <Heading className={styles.largeHeader} size={"large"}>
                1. Signere direkte med virksomhetssertifikat
            </Heading>
            <Paragraph className={styles.paragraph}>
                Når du signerer direkte med virksomhetssertifikat bruker du test eller prod-virksomhetssertifikatet
                og legger hele inn som en del av JWT-grant før du sender til maskinporten. Du bruker også
                virksomhetssertifikatet til å signere tokenet. Du trenger ikke å laste opp nøkler eller
                virksomhetssertifikat og kan signere med hvilket du vil.
            </Paragraph>
            <InfoBox>
                {bold("Forutsetninger:")}
                <Paragraph className={styles.paragraph}>
                    [TEST-]virksomhetssertifikat. {link("/", "Hvordan skaffer jeg et virksomhetssertifikat?")}
                </Paragraph>
                <Heading size={"medium"}>
                    Fremgangsmåte
                </Heading>
                <ol>
                    <li>Lag klient med virksomhetssertifikat.</li>
                    <li>Lag JWT-grant og referer til kid.</li>
                    <li>Signer med det samme virksomhetssertifikatet som du lastet opp i steg 1.</li>
                    <li>Send til maskinporten.</li>
                    <li>Bruk det returnerte tokenet til bearer-token mot tjenesten.</li>
                </ol>
            </InfoBox>

            <Heading size={"large"}>
                Se kode-eksempel JWT-grant
            </Heading>
            <Paragraph>
                Ved å legge inn hvilken tilgang du skal ta i bruk kan vi gi deg kodeeksempler som du kan bruke.
            </Paragraph>

            <CodeExample>
                <CodeLanguage title={"Node.js"} language={"javascript"} code={serificateCode["1"].node} />
                <CodeLanguage title={"Java"} language={"java"} code={serificateCode["1"].java} />
                <CodeLanguage title={"Python"} language={"python"} code={serificateCode["1"].python} />
            </CodeExample>


        </>
    );

    const keySection = () => (
        <>
            <Heading size={"large"}>
                Med manuelt opplastede nøkler
            </Heading>
        </>
    );

    return (
        <div className={styles.tabsContainer}>
            <div className={styles.tabs}>
                <div className={`${styles.tab} ${selectedTab === 1 ? styles.active : styles.inactive}`} onClick={() => setSelectedTab(1)}>
                    <Sertifikat />
                    <Label size={"large"}>Signere med virksomhetssertifikat</Label>
                </div>
                <div className={`${styles.tab} ${selectedTab === 2 ? styles.active : styles.inactive}`} onClick={() => setSelectedTab(2)}>
                    <Nokler />
                    <Label size={"large"}>Med manuelt opplastede nøkler</Label>
                </div>
            </div>
            <div className={styles.tabsContentContainer}>
                <div className={styles.tabsContent}>
                    {selectedTab === 1 && sertificateSection()}
                    {selectedTab === 2 && keySection()}
                </div>
            </div>
        </div>
    );
}

export default TabsSection;