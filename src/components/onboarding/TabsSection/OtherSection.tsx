import React from "react";
import { Heading, Paragraph } from "@digdir/design-system-react";
import { link } from "../../util/textTransforms";

function OtherSection() {
  return (
    <>
      <Heading level={2} size={"large"} spacing>
        Andre fremgangsmåter
      </Heading>
      <Paragraph spacing>
        Du kan også automatisere via Maskinportens selvbetjenings-API eller
        bruke et manuelt opplastet virksomhetssertifikat.
      </Paragraph>

      <Heading level={3} size={"large"} spacing>
        Via selvbetjenings-API
      </Heading>
      <Paragraph spacing>
        Dersom du har mange servere og ønsker å ha kortlevde, unike nøkler, kan
        du benytte deg av Maskinportens selvbetjenings-API. Dette gir mulighet
        for å automatisere inn- og utmelding av integrasjoner, men kan kreve mer
        av et platform- eller utviklingsteam. Dersom din virksomhet har et eget
        Kubernetes-cluster, har NAV open-sourcet sin cluster operator{" "}
        {link("https://github.com/nais/digdirator", "digdirator", true)} som
        automatiserer prosessen.
      </Paragraph>
      <Paragraph spacing>
        Selvbetjenings-API er dokumentert{" "}
        {link(
          "https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_api",
          "her",
          true,
        )}
        . Pålogging til APIet er igjen sikret med Maskinporten og krever en egen
        klient med scope `<span lang={"en"}>idporten:scopes.write</span>`. Denne løsningen for forenklet
        onboarding støtter foreløpig ikke prosessen videre for å få tak i denne
        tilgangen og du må sende en forespørsel til servicedesk@digdir.no. Se
        mer informasjon {" "}
        {link(
          "https://docs.digdir.no/docs/Maskinporten/maskinporten_sjolvbetjening_api#tilgang-administrasjon-av-api",
          "her",
          true,
        )}
        .
      </Paragraph>

      <Heading level={3} size={"large"} spacing>
        Med manuelt opplastet virksomhetssertifikat
      </Heading>
      <Paragraph spacing>
        Dersom du kun ønsker å ha <strong>ett</strong> gyldig
        virksomhetssertifikat å signere med for hver integrasjon, støtter vi
        dessverre ikke dette for øyeblikket som en del av forenklet
        onboarding-løsningen. I dette tilfellet, ta kontakt med
        servicedesk@digdir.no for å få tilgang til Samarbeidsportalen.
      </Paragraph>
    </>
  );
}

export default OtherSection;
