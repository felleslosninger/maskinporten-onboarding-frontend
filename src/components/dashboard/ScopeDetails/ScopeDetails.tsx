import React, {useState} from "react";
import {ApiClients} from "../../../types/api";
import styles from './styles.module.scss';
import {Heading, HelpText} from "@digdir/design-system-react";
import chevron from '../../../assets/chevronD.svg';

interface ScopeDetailProps {
    scope: string;
    clients: ApiClients;
}

function ScopeDetails(props: ScopeDetailProps) {
    const [expanded, setExpanded] = useState(false);
    const hasClient = props.clients.some(client => client.scopes.includes(props.scope));

    return (
        <div className={styles.container} onClick={() => setExpanded(!expanded)}>
            <div className={styles.headerRow}>
                <Heading size={"small"}>
                    {props.scope}
                </Heading>
                <HelpText placement={"top"} title={"test"} >
                    {hasClient ? "Klient Opprettet" : "Har tilgang"}
                </HelpText>
                <img src={chevron} className={styles.chevron} alt={""} />
            </div>
            {
                expanded &&
                <div className={styles.contentRow}>
                    sdsds
                </div>
            }
        </div>
    );
}

export default ScopeDetails;