import React from 'react';
import {Accordion, Heading, Ingress, Label, Paragraph} from "@digdir/design-system-react";
import {Link} from "react-router-dom";
import {Button} from '@digdir/design-system-react';
import {ReactComponent as MpSvg} from '../../../assets/ikoner/SVG/Maskinporten.svg';
import styles from './styles.module.scss';
import {login} from "../../auth/login";

const enkelttjenestenavn = "Selvbetjening av integrasjoner i ID-porten/Maskinporten";

function Landingpage() {
    return (
        <div className={styles.container}>
            <Heading size={"xlarge"} className={styles.heading}>
                Velkommen til Forenklet Onboarding
            </Heading>
            <Ingress>
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
                <MpSvg className={styles.svg}/>
                <Button className={styles.loginButton} onClick={login}>
                    <Label size={"large"}>
                        Logg inn med Ansattporten
                    </Label>
                </Button>
            </div>

            <Accordion className={styles.faq}>
                <Accordion.Item>
                    <Accordion.Header>
                        <Label size={"large"}>Hva hvis jeg ikke får logget inn?</Label>
                    </Accordion.Header>
                    <Accordion.Content>
                        <Paragraph>
                            Da kan det være at du ikke har riktig rolle i Altinn for å kunne se og administrere
                            API-tilganger gitt din virksomhet.
                        </Paragraph>
                        <Paragraph>
                            Tjenesten krever at du har rettighet til enkelttjenesten "{enkelttjenestenavn}" på vegne av virksomheten.
                            Du kan se om du har denne rettigheten ved å logge inn i Altinn, velge rett virksomhet og navigere til Profil.
                            Under fanen "Skjema og tjenester du har rettighet til" vil denne komme opp under "Har tilgang til disse N enkelttjenestene".
                        </Paragraph>

                        <Paragraph>
                        Enkelte selskapsrollerroller fra Enhetsregisteret, for eksempel daglig leder, har forhåndsdefinert tilgang til løsningen , se
                        den fulle listen over disse under fanen
                        <Link
                            to={"https://www.altinn.no/hjelp/skjema/alle-altinn-roller/"}> Hovedadministrator</Link> her.
                    </Paragraph>
                </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
                <Accordion.Header>
                    <Label size={"large"}>Hvem kan jeg kontakte for tilgang?</Label>
                </Accordion.Header>
                <Accordion.Content>
                    <Paragraph>
                        Dersom du allerede er tilknyttet din virksomhet gjennom en eksisterende rolle eller tjeneste i Altinn kan du <Link
                        to={"https://www.altinn.no/hjelp/profil/sporre-om-rettighet/slik-spor-du-om-rettighet/"}>etterspørre rettigheten</Link>.
                        Enkelttjenesten som etterspørres er da "{enkelttjenestenavn}".
                    </Paragraph>
                    <Paragraph>
                        Dersom du ikke har tilknytning til virksomheten i dag i Altinn, vil det være daglig leder eller andre som har rollen <Link
                        to={"https://www.altinn.no/hjelp/skjema/alle-altinn-roller/"}>hovedadministrator</Link> i
                        din virksomhet som vil ha høyest rettighet til dele ut tilganger.
                    </Paragraph>
                    <Paragraph>Virksomheten din kan også ha satt opp rollen <Link
                            to={"https://www.altinn.no/hjelp/profil/roller-og-rettigheter/hvordan-gi-rettigheter-til-andre/"}>tilgangsstyrer</Link> som
                        også kan bistå med dette.
                    </Paragraph>
                    <Paragraph>Fremgangsmåten for å tildele en enkelttjeneste er beskrevet <Link
                            to={"https://www.altinn.no/hjelp/profil/roller-og-rettigheter/hvordan-gi-rettigheter-til-andre/"}>her</Link> og
                        vil være lik for hovedadminstrator og tilgangsstyrer.
                    </Paragraph>
                    <Paragraph>Av sikkerhets- og personvernsmessige årsaker kan vi ikke informere om hvem i din bedrift som har disse rollene.</Paragraph>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
</div>
)
}

export default Landingpage;