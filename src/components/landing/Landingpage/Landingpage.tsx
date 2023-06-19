import React from 'react';
import {Heading, Ingress, Label, Paragraph} from "@digdir/design-system-react";
import {Link} from "react-router-dom";
import { Button } from '@digdir/design-system-react';
import { ReactComponent as MpSvg } from '../../../assets/ikoner/SVG/Maskinporten.svg';
import styles from './styles.module.scss';
import {login} from "../../auth/login";
import SkjemaContainer from "../../common/SkjemaContainer/SkjemaContainer";

function Landingpage() {

    return (
        <SkjemaContainer header={"Velkommen til Forenklet Onboarding"} category={"Kom i gang"}>
            <Heading size={"large"} className={styles.heading}>
                Logg inn for å ta i bruk Maskinporten
            </Heading>
            <Ingress>
                For å ta i bruk Maskinporten som konsument må du først logge inn med Ansattporten.
            </Ingress>
            <MpSvg className={styles.svg} />
            <Button className={styles.loginButton} onClick={login}>
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
        </SkjemaContainer>
    )
}

export default Landingpage;