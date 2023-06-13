import React from 'react';
import {Heading, Ingress, Label, Paragraph} from "@digdir/design-system-react";
import {Link} from "react-router-dom";
import { Button } from '@digdir/design-system-react';
import styles from './styles.module.scss';

function Landingpage() {
    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <Label size={"medium"}>
                        Kom i gang
                    </Label>
                    <Heading size={"medium"}>
                        Velkommen til Forenklet Onboarding
                    </Heading>
                </div>
                <div className={styles.cardContent}>
                    <Heading size={"large"} className={styles.heading}>
                        Logg inn for å ta i bruk Maskinporten
                    </Heading>
                    <Ingress>
                        For å ta i bruk Maskinporten som konsument må du først logge inn med Ansattporten.
                    </Ingress>
                    <Button size={"medium"} variant={"filled"} content={"primary"}>
                        Logg inn
                    </Button>
                    <div className={styles.loginHelp}>
                        <Paragraph className={styles.boldText}>
                            Hva hvis jeg ikke får logget inn?
                        </Paragraph>
                        <Paragraph>
                            Da kan det være at du ikke har riktig rolle i Altinn for at du skal kunne ta i bruk Maskinporten
                        </Paragraph>
                        <Link to={"/"}>
                            Les mer her
                        </Link>
                    </div>
                    <Paragraph className={styles.boldText}>
                        Noe mer tekst? Hjelp?
                    </Paragraph>
                </div>
            </div>
        </div>
    )
}

export default Landingpage;