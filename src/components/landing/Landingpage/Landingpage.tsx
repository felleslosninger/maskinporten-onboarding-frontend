import React from 'react';
import {Accordion, Alert, Heading, Ingress, Label, Paragraph} from "@digdir/design-system-react";
import {Button, Tag} from '@digdir/design-system-react';
import {ReactComponent as MpSvg} from '../../../assets/ikoner/SVG/Maskinporten.svg';
import styles from './styles.module.scss';
import {login} from "../../auth/login";
import ContentContainer from "../../common/ContentContainer/ContentContainer";
import {link} from "../../util/textTransforms";
import {useSearchParams} from "react-router-dom";

const enkelttjenestenavn = "Selvbetjening av integrasjoner i ID-porten/Maskinporten";

function Landingpage() {
    const [params] = useSearchParams();
    const error = params.get("error");
    const auth = params.get("auth");

    return (
        <ContentContainer className={styles.container}>
            {error && auth &&
                <Alert className={styles.errorMessage} severity={"warning"}>
                    <Heading level={2} size={"xsmall"} spacing>
                        Oops, det ser ut som du mangler rettigheter til innlogging
                    </Heading>
                    {auth === "admin" ?
                        <>
                            <Paragraph spacing>
                                Din valgte innlogging er kun for personer med {" "}
                                {link("https://www.altinn.no/hjelp/skjema/alle-altinn-roller/", "hovedadministrator-rolle", true)}
                                , som er forbeholdt personer som daglig ledere, styreledere og innehavere.
                            </Paragraph>
                            <Paragraph>
                                Dersom du ikke passer inn under denne beskrivelsen kan du prøve å logge inn med
                                andre tilganger.
                            </Paragraph>
                        </>
                        :
                        <>
                            <Paragraph spacing>
                                Dersom du er person i lederstilling kan du prøve det andre innloggingsvalget.
                                Hvis ikke, eller dersom du ikke har tilgang til noen av valgene, betyr dette at du
                                mangler rettigheter til å kunne betjene API-tilganger for din oragnisasjon.
                            </Paragraph>
                            <Paragraph>
                                Dersom du likevel ønsker å benytte deg av denne tjenesten kan du {" "}
                                {link("https://www.altinn.no/hjelp/profil/sporre-om-rettighet/slik-spor-du-om-rettighet/", "etterspørre rettigheten", true)}
                                {" "} hos din organisasjon for få tilgang.
                            </Paragraph>
                        </>
                    }
                </Alert>
            }

            <Heading size={"xlarge"} className={styles.heading} spacing>
                Velkommen til Forenklet Onboarding
                <Tag color={"secondary"} variant={"outlined"}>Pilot</Tag>
            </Heading>

            <Ingress spacing>
                Her kan du enkelt ta i bruk API-tilgangene din virksomhet har fått i Maskinporten.
                Som konsument av et Maskinporten-beskyttet API, kan du her se alle dine tilganger, opprette klienter
                og få hjelp til å ta disse i bruk.
            </Ingress>
            <Ingress>
                Vi bruker Ansattporten,
                som er en nasjonal løsning fra Digdir, for å bekrefte at du har de nødvendige rettighetene i din
                virksomhet til å gjøre dette.
            </Ingress>

            <div className={styles.loginRow}>
                <Button className={styles.loginButton} onClick={() =>login(true)} size={"large"}>
                    Logg inn som daglig leder
                </Button>
                <Button className={styles.loginButton} onClick={() =>login(false)} size={"large"}>
                    Logg inn med annen tilgang
                </Button>
            </div>

            <Accordion className={styles.faq}>
                <Accordion.Item>
                    <Accordion.Header>
                        <Label size={"large"}>Hva hvis jeg ikke får logget inn?</Label>
                    </Accordion.Header>
                    <Accordion.Content>
                        <Paragraph spacing>
                            Da kan det være at du ikke har riktig rolle i Altinn for å kunne se og administrere
                            API-tilganger gitt din virksomhet.
                        </Paragraph>
                        <Paragraph spacing>
                            Tjenesten krever at du har rettighet til enkelttjenesten "{enkelttjenestenavn}" på vegne av virksomheten.
                            Du kan se om du har denne rettigheten ved å logge inn i Altinn, velge rett virksomhet og navigere til Profil.
                            Under fanen "Skjema og tjenester du har rettighet til" vil denne komme opp under "Har tilgang til disse N enkelttjenestene".
                        </Paragraph>
                        <Paragraph>
                            Enkelte selskapsroller fra Enhetsregisteret, for eksempel daglig leder, har forhåndsdefinert tilgang til løsningen , se
                            den fulle listen over disse under fanen {" "}
                            {link("https://www.altinn.no/hjelp/skjema/alle-altinn-roller/", "Hovedadministrator", true)}
                            her.
                        </Paragraph>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>
                        <Label size={"large"}>Hvem kan jeg kontakte for tilgang?</Label>
                    </Accordion.Header>
                    <Accordion.Content>
                        <Paragraph spacing>
                            Dersom du allerede er tilknyttet din virksomhet gjennom en eksisterende rolle
                            eller tjeneste i Altinn kan du {" "}
                            {link("https://www.altinn.no/hjelp/profil/sporre-om-rettighet/slik-spor-du-om-rettighet/", "etterspørre rettigheten", true)}
                            . Enkelttjenesten som etterspørres er da "{enkelttjenestenavn}".
                        </Paragraph>
                        <Paragraph spacing>
                            Dersom du ikke har tilknytning til virksomheten i dag i Altinn, vil det være
                            daglig leder eller andre som har rollen {" "}
                            {link("https://www.altinn.no/hjelp/skjema/alle-altinn-roller/", "hovedadministrator", true)}
                            {" "} i din virksomhet som vil ha høyest rettighet til dele ut tilganger.
                        </Paragraph>
                        <Paragraph spacing>Virksomheten din kan også ha satt opp rollen {" "}
                            {link("https://www.altinn.no/hjelp/profil/roller-og-rettigheter/hvordan-gi-rettigheter-til-andre/", "tilgangsstyrer", true)}
                            {" "} som også kan bistå med dette.
                        </Paragraph>
                        <Paragraph spacing>Fremgangsmåten for å tildele en enkelttjeneste er beskrevet {" "}
                            {link("https://www.altinn.no/hjelp/profil/roller-og-rettigheter/hvordan-gi-rettigheter-til-andre/", "her", true)}
                            {" "} og vil være lik for hovedadminstrator og tilgangsstyrer.
                        </Paragraph>
                        <Paragraph>Av sikkerhets- og personvernsmessige årsaker kan vi ikke informere om hvem i din bedrift som har disse rollene.</Paragraph>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>
                        <Label size={"large"}>Hva betyr det at dette er en pilot?</Label>
                    </Accordion.Header>
                    <Accordion.Content>
                        <Paragraph spacing>
                            At denne løsningen er en pilot vil si at vi i Digdir ser potenisialet for at dette skal bli en del av våre
                            nasjonale fellesløsninger. Løsningen bygger på eksisterende Maskinporten-APIer og sikkerhetsvurderinger.
                        </Paragraph>
                        <Paragraph spacing>
                            Piloten er laget slik at alle klienter som administeres i piloten også kan administeres via dagens offisielle løsing,
                            Samarbeidsportalen. Om behovet for forenklet onboarding ikke er tilstede, vil klientene fortsatt fungere,
                            men videre administrasjon må skje i Samarbeidsportalen. Det er altså ingen risiko for dobbeltarbeid eller
                            migrering forbundet med bruk av piloten.
                        </Paragraph>
                        <Paragraph>
                            Gi oss gjerne en tilbakemelding om du har ris eller ros. Du kan
                            lage en feedback-sak til oss på {" "}
                            {link("https://github.com/fellesdatakatalog/api-access-request-gui/issues", "github", true)}
                            {" "} eller sende en mail til servicedesk@digdir.no med emne Forenklet onboarding.
                        </Paragraph>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </ContentContainer>
    );
}

export default Landingpage;