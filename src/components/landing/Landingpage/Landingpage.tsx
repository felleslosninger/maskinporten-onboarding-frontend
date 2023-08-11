import React from 'react';
import {Accordion, Heading, Ingress, Label, Paragraph} from "@digdir/design-system-react";
import {Link} from "react-router-dom";
import {Button} from '@digdir/design-system-react';
import {ReactComponent as MpSvg} from '../../../assets/ikoner/SVG/Maskinporten.svg';
import styles from './styles.module.scss';
import {login} from "../../auth/login";

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
                            Tjenesten krever at du har rettighet til enkelttjenesten "Selvbetjening av integrasjoner i
                            ID-porten/Maskinporten" på vegne av virksomheten.
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
                        Daglig leder eller andre som har rollen <Link
                        to={"https://www.altinn.no/hjelp/skjema/alle-altinn-roller/"}>hovedadministrator</Link> i
                        din virksomhet vil ha høyest rettighet til dele ut tilganger.
                        Virksomheten din kan også ha satt opp rollen
                        <Link
                            to={"https://www.altinn.no/hjelp/skjema/alle-altinn-roller/"}> Tilgangsstyrer</Link> som
                        også kan bistå med dette gitt at personen også innehar "Eksplisitt
                        tjenestedelegering"-rollen. https://www.altinn.no/hjelp/profil/roller-og-rettigheter/hvordan-gi-rettigheter-til-andre/

                    </Paragraph>
                    <Paragraph>Av personvernsmessige årsaker kan
                        vi ikke si noe spesifikt om hvem i din bedrift som har disse rollene og kan gi deg
                        tilgang.</Paragraph>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
</div>
)
}

export default Landingpage;