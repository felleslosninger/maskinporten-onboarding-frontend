import React from "react";
import {
  Alert,
  Heading,
  Ingress,
  Paragraph,
  Tag,
} from "@digdir/designsystemet-react";
import styles from "./styles.module.scss";
import ContentContainer from "../common/ContentContainer/ContentContainer";
import { link } from "../util/textTransforms";
import { Navigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useUser } from "../../hooks/auth";

const enkelttjenestenavn =
  "Selvbetjening av integrasjoner i ID-porten/Maskinporten";

function Landingpage() {
  const [params] = useSearchParams();
  const { data: user } = useUser();
  const error = params.get("error");
  const auth = params.get("auth");

  if (user && user.isAuthenticated) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <ContentContainer className={styles.container}>
      <Helmet>
        <title>Forenklet Onboarding</title>
      </Helmet>
      {error && auth && (
        <Alert className={styles.errorMessage} severity={"warning"}>
          <Heading level={2} size={"xsmall"} spacing>
            Oops, det ser ut som du mangler rettighetene som må til
          </Heading>
          {auth === "admin" ? (
            <>
              <Paragraph spacing>
                Din valgte innlogging er kun for personer med{" "}
                {link(
                  "https://www.altinn.no/hjelp/skjema/alle-altinn-roller/",
                  "hovedadministrator-rolle",
                  true,
                )}
                , som er forbeholdt personer som daglig ledere, styreledere og
                innehavere.
              </Paragraph>
              <Paragraph>
                Dersom du ikke kjenner deg igjen i den beskrivelsen, kan du
                prøve å logge inn med enkelttjeneste-tilgang.
              </Paragraph>
            </>
          ) : (
            <>
              <Paragraph spacing>
                Dersom du er person i lederstilling kan du prøve det andre
                innloggingsvalget. Hvis ikke, eller dersom du ikke har tilgang
                til noen av valgene, betyr dette at du mangler rettigheter for å
                administere å API-tilganger for din virksomhet.
              </Paragraph>
            </>
          )}
        </Alert>
      )}

      <Heading size={"large"} className={styles.heading} spacing>
        Forenklet Onboarding avvikles
        <Tag color={"second"}>Beklager</Tag>
      </Heading>

      <Ingress spacing>
        Forenklet onboarding (Forenklet Onboarding ) er erstattet av
        sjolvbetjening.test.samarbeid.digdir.no . Alle klienter som er opprettet
        i forenklet onboarding vil fortsatt fungere, men administrasjon av desse
        må nå utføres på sjolvbetjening.test.samarbeid.digdir.no
      </Ingress>

      <Ingress>
        Selvbetjening finner du på følgende URLer: <br />
        TEST:{" "}
        {link(
          "https://sjolvbetjening.test.samarbeid.digdir.no/",
          "https://sjolvbetjening.test.samarbeid.digdir.no/",
          true,
        )}
        <br />
        PROD:{" "}
        {link(
          "https://sjolvbetjening.samarbeid.digdir.no/",
          "https://sjolvbetjening.samarbeid.digdir.no/",
          true,
        )}
        .
      </Ingress>

      {/*<div className={styles.loginRow}>*/}
      {/*  <Button*/}
      {/*    className={styles.loginButton}*/}
      {/*    onClick={login}*/}
      {/*    size={"large"}*/}
      {/*  >*/}
      {/*    Logg inn*/}
      {/*  </Button>*/}
      {/*</div>*/}

      {/*<Accordion className={styles.faq}>*/}
      {/*  <Accordion.Item>*/}
      {/*    <Accordion.Header>*/}
      {/*      <Paragraph size={"large"}>*/}
      {/*        Hva hvis jeg ikke får logget inn eller mangler rettigheter som må*/}
      {/*        til?*/}
      {/*      </Paragraph>*/}
      {/*    </Accordion.Header>*/}
      {/*    <Accordion.Content>*/}
      {/*      <Paragraph spacing>*/}
      {/*        Da kan det være at du ikke har riktig rolle i Altinn for å kunne*/}
      {/*        se og administrere API-tilganger gitt din virksomhet.*/}
      {/*      </Paragraph>*/}
      {/*      <Paragraph spacing>*/}
      {/*        Tjenesten krever at du har rettighet til enkelttjenesten "*/}
      {/*        {enkelttjenestenavn}" på vegne av virksomheten. Du kan se om du*/}
      {/*        har denne rettigheten ved å logge inn i Altinn, velge rett*/}
      {/*        virksomhet og navigere til Profil. Under fanen "Skjema og*/}
      {/*        tjenester du har rettighet til" vil denne komme opp under "Har*/}
      {/*        tilgang til disse [antall] enkelttjenestene".*/}
      {/*      </Paragraph>*/}
      {/*      <Paragraph>*/}
      {/*        Enkelte selskapsroller fra Enhetsregisteret, for eksempel daglig*/}
      {/*        leder, har forhåndsdefinert tilgang til løsningen , se den fulle*/}
      {/*        listen over disse under fanen{" "}*/}
      {/*        {link(*/}
      {/*          "https://www.altinn.no/hjelp/skjema/alle-altinn-roller/",*/}
      {/*          "Hovedadministrator",*/}
      {/*          true,*/}
      {/*        )}{" "}*/}
      {/*        her.*/}
      {/*      </Paragraph>*/}
      {/*    </Accordion.Content>*/}
      {/*  </Accordion.Item>*/}
      {/*  <Accordion.Item>*/}
      {/*    <Accordion.Header>*/}
      {/*      <Paragraph size={"large"}>*/}
      {/*        Hvem kan jeg kontakte for tilgang?*/}
      {/*      </Paragraph>*/}
      {/*    </Accordion.Header>*/}
      {/*    <Accordion.Content>*/}
      {/*      <Paragraph spacing>*/}
      {/*        Dersom du allerede er tilknyttet din virksomhet gjennom en*/}
      {/*        eksisterende rolle eller tjeneste i Altinn kan du{" "}*/}
      {/*        {link(*/}
      {/*          "https://info.altinn.no/hjelp/profil/be-om-tilgang/",*/}
      {/*          "etterspørre rettigheten",*/}
      {/*          true,*/}
      {/*        )}*/}
      {/*        . Enkelttjenesten som etterspørres er da "{enkelttjenestenavn}".*/}
      {/*      </Paragraph>*/}
      {/*      <Paragraph spacing>*/}
      {/*        Dersom du ikke har tilknytning til virksomheten i dag i Altinn,*/}
      {/*        vil det være daglig leder eller andre som har rollen{" "}*/}
      {/*        {link(*/}
      {/*          "https://www.altinn.no/hjelp/skjema/alle-altinn-roller/",*/}
      {/*          "hovedadministrator",*/}
      {/*          true,*/}
      {/*        )}{" "}*/}
      {/*        i din virksomhet som vil ha høyest rettighet til dele ut*/}
      {/*        tilganger.*/}
      {/*      </Paragraph>*/}
      {/*      <Paragraph spacing>*/}
      {/*        Virksomheten din kan også ha satt opp rollen{" "}*/}
      {/*        {link(*/}
      {/*          "https://info.altinn.no/hjelp/profil/enkelttjenester-og-roller/hvordan-gi-en-enkelttjeneste-og-rolle-til-andre/",*/}
      {/*          "tilgangsstyrer",*/}
      {/*          true,*/}
      {/*        )}{" "}*/}
      {/*        i kombinasjon med enkelttjenesten "{enkelttjenestenavn}". Denne*/}
      {/*        personen vil da kunne delegere enkelttjenesten videre til andre*/}
      {/*        personer.*/}
      {/*      </Paragraph>*/}
      {/*      <Paragraph spacing>*/}
      {/*        Fremgangsmåten for å tildele en enkelttjeneste er beskrevet{" "}*/}
      {/*        {link(*/}
      {/*          "https://info.altinn.no/hjelp/profil/enkelttjenester-og-roller/hvordan-gi-en-enkelttjeneste-og-rolle-til-andre/",*/}
      {/*          "her",*/}
      {/*          true,*/}
      {/*        )}{" "}*/}
      {/*        og vil være lik for hovedadminstrator og tilgangsstyrer.*/}
      {/*      </Paragraph>*/}
      {/*      <Paragraph>*/}
      {/*        Av sikkerhets- og personvernsmessige årsaker kan vi ikke informere*/}
      {/*        om hvem i din bedrift som har disse rollene.*/}
      {/*      </Paragraph>*/}
      {/*    </Accordion.Content>*/}
      {/*  </Accordion.Item>*/}

      {/*  <Accordion.Item>*/}
      {/*    <Accordion.Header>*/}
      {/*      <Paragraph size={"large"}>*/}
      {/*        Hva betyr det at dette er en pilot?*/}
      {/*      </Paragraph>*/}
      {/*    </Accordion.Header>*/}
      {/*    <Accordion.Content>*/}
      {/*      <Paragraph spacing>*/}
      {/*        At denne løsningen er en pilot vil si at vi i Digdir ser*/}
      {/*        potenisialet for at dette skal bli en del av våre nasjonale*/}
      {/*        fellesløsninger. Løsningen bygger på eksisterende*/}
      {/*        Maskinporten-APIer og sikkerhetsvurderinger.*/}
      {/*      </Paragraph>*/}
      {/*      <Paragraph spacing>*/}
      {/*        Piloten er laget slik at alle integrasjoner som administeres i*/}
      {/*        piloten også kan administeres via dagens offisielle løsing,*/}
      {/*        Samarbeidsportalen. Om behovet for forenklet onboarding ikke er*/}
      {/*        til stede, vil integrasjonene fortsatt fungere, men videre*/}
      {/*        administrasjon må skje i Samarbeidsportalen. Det er altså ingen*/}
      {/*        risiko for dobbeltarbeid eller migrering forbundet med bruk av*/}
      {/*        piloten.*/}
      {/*      </Paragraph>*/}
      {/*      <Paragraph>*/}
      {/*        Gi oss gjerne en tilbakemelding om du har ris eller ros. Du kan*/}
      {/*        lage en feedback-sak til oss på{" "}*/}
      {/*        {link(*/}
      {/*          "https://github.com/felleslosninger/maskinporten-onboarding-frontend/issues",*/}
      {/*          "github",*/}
      {/*          true,*/}
      {/*        )}{" "}*/}
      {/*        eller sende en mail til{" "}*/}
      {/*        {link("servicedesk@digdir.no", "servicedesk@digdir.no", true)} med*/}
      {/*        emne Forenklet onboarding.*/}
      {/*      </Paragraph>*/}
      {/*    </Accordion.Content>*/}
      {/*  </Accordion.Item>*/}
      {/*</Accordion>*/}
    </ContentContainer>
  );
}

export default Landingpage;
