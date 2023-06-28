import React from 'react';
import {Accordion, Heading, Ingress, Label, Paragraph} from "@digdir/design-system-react";
import {Link} from "react-router-dom";
import { Button } from '@digdir/design-system-react';
import { ReactComponent as MpSvg } from '../../../assets/ikoner/SVG/Maskinporten.svg';
import styles from './styles.module.scss';
import {login} from "../../auth/login";

function Landingpage() {
    return (
        <div className={styles.container}>
            <Heading size={"xlarge"} className={styles.heading}>
                Velkommen til Forenklet Onboarding
            </Heading>
            <Ingress>
                Her kan du enkelt ta i bruk API-tilgangene din virksomhet har fått. Du kan se alle dine
                tilganger, opprette klienter og ta disse i bruk.
            </Ingress>
            <Ingress>
                Vi bruker Ansattporten,
                som er en nasjonal løsning fra Digdir, for å bekrefte at du har de nødvendige rettighetene fra din
                virksomhet til å gjøre dette.
            </Ingress>
            <div className={styles.loginRow}>
                <MpSvg className={styles.svg} />
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
                            Da kan det være at du ikke har riktig rolle i Altinn for å kunne se tilganger gitt din
                            virksomhet. Enkelte roller i enhetsregisteret har tilgang
                        </Paragraph>
                        <Link to={"/"}>
                            Les mer her
                        </Link>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>
                        <Label size={"large"}>Hvem kan jeg kontakte for tilgang?</Label>
                    </Accordion.Header>
                    <Accordion.Content>
                        <Paragraph>
                            Daglig leder i din virksomhet vil ha høyest rettighet til å videreføre tilganger innad i
                            din virksomhet. Virksomheten din kan også ha satt opp andre roller, som f.eks
                            Tilgangsstyrer, som også kan bistå med dette. Av personvernsmessige årsaker kan
                            vi ikke si noe spesifikt om hvem i din bedrift som har disse rollene og kan gi deg tilgang.
                        </Paragraph>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default Landingpage;