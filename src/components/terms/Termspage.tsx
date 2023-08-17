import React from "react";
import styles from "./styles.module.scss";
import {Heading, Paragraph} from "@digdir/design-system-react";

function Termspage() {

  return (
      <div className={styles.container}>
          <div className={styles.content}>
              <Heading className={styles.subheader} size={"large"}>
                  Vilkår for bruk av Maskinporten som konsument gjennom forenklet onboarding
              </Heading>
              <Paragraph className={styles.paragraph}>
                  API-konsument plikter å holde Digdir skadefri for forhold som gjelder manglende oppfyllelse av avtaler
                  og regelverk. Konsument av data skal håndtere sertifikat og nøkler på en måte som sikrer at uvedkommende
                  ikke kan misbruke disse. Digdir kan ved berettiget grunn til mistanke om misbruk eller etter varsel fra
                  tilbyder av data fjerne en tilgang.
              </Paragraph>
              <Paragraph className={styles.paragraph}>
                  Maskinporten logger utstedelser av token. Digdir lagrer logger i 13 måneder.
              </Paragraph>
          </div>
      </div>


  );
}

export default Termspage;