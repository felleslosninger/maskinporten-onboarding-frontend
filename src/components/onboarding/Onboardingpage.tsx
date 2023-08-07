import React from "react";
import styles from "./styles.module.scss";
import {Accordion, Heading, Label, Paragraph} from "@digdir/design-system-react";
import TabsSection from "./TabsSection/TabsSection";
import {bold, link} from "../util/textTransforms";

function Onboardingpage() {

  return (
      <div className={styles.container}>
          <div className={styles.content}>
              <Heading size={"xlarge"}>
                  Onboardingsguide
              </Heading>

              <Heading className={styles.subheader} size={"large"}>
                  Opprette klient
              </Heading>
              <Paragraph className={styles.paragraph}>
                  Det første du må gjøre for å ta i bruk tilgangen du har fått, er å opprette en klient. Det kan du gjøre
                  fra {link("/dashboard", "oversikten")} over tilganger.
              </Paragraph>

              <Heading className={styles.subheader} size={"large"}>
                  Ta i bruk
              </Heading>
              <Paragraph className={styles.paragraph}>
                  Når du har opprettet en klient har du flere måter du kan ta tilgang i bruk på. Her kan du lese
                  en kort beskrivelse av de ulike metodene og velge den som passer din virksomhet best. Du kan
                  velge forskjellige integrasjonsmetoder i test og prod.
              </Paragraph>
              <Paragraph className={styles.paragraph}>
                  Dersom du {bold("ikke")} har et virksomhetssertifikat i miljøet du skal integrere med er manulelt
                  opplastede nøkler den korteste veien. Det er også mulig å bruke dette i test og virksomhetssertifikat
                  i prod. Signering med virksomhetssertifikat eller med opplastede nøkler vil bli beskrevet stegvis under.
              </Paragraph>
              <Paragraph className={styles.paragraph}>
                  Andre muligheter er å bruke manuelt opplastet virksomhetssertifikat eller via selvbetjening-API.
              </Paragraph>

              <Heading className={styles.subheader} size={"large"}>
                  Velg integrasjonsmetode du vil se guide for
              </Heading>
          </div>
          <TabsSection />
      </div>


  );
}

export default Onboardingpage;