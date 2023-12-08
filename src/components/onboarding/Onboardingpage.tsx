import React from "react";
import styles from "./styles.module.scss";
import { Heading, Paragraph } from "@digdir/design-system-react";
import TabsSection from "./TabsSection/TabsSection";
import { bold } from "../util/textTransforms";
import ContentContainer from "../common/ContentContainer/ContentContainer";
import { Helmet } from "react-helmet-async";

function Onboardingpage() {
  return (
    <div className={styles.container}>
      <Helmet>
        <title>Guide | Forenklet Onboarding</title>
      </Helmet>
      <ContentContainer className={styles.content}>
        <Heading size={"xlarge"}>Onboardingsguide</Heading>
        <Heading level={2} className={styles.subheader} size={"large"}>
          Kom i gang
        </Heading>
        <Paragraph className={styles.paragraph}>
          Det finnes forskjellige måter å integrere med Maskinporten på. Her kan
          du lese en kort beskrivelse av de ulike metodene og velge den som
          passer din virksomhet best. Du kan velge forskjellige
          integrasjonsmetoder i forskjellige miljøer.
        </Paragraph>
        <Paragraph className={styles.paragraph}>
          Dersom du {bold("ikke")} har et virksomhetssertifikat i miljøet du
          skal integrere med, er manuelt opplastede nøkler den korteste veien.
          Det er mulig å bruke dette i test og virksomhetssertifikat i prod.
        </Paragraph>
        <Heading level={2} className={styles.subheader} size={"large"}>
          Velg integrasjonsmetode du vil se guide for
        </Heading>
      </ContentContainer>
      <TabsSection />
    </div>
  );
}

export default Onboardingpage;
