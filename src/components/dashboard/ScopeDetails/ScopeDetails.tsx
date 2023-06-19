import React, {useState} from "react";
import {ApiClients, ApiScope} from "../../../types/api";
import styles from './styles.module.scss';
import {Heading, HelpText, Ingress} from "@digdir/design-system-react";
import chevron from '../../../assets/chevronD.svg';

interface ScopeDetailProps {
    scope: ApiScope;
    clients: ApiClients;
}

function ScopeDetails(props: ScopeDetailProps) {
    const [expanded, setExpanded] = useState(false);
    const hasClient = props.clients.some(client => client.scopes.includes(props.scope.name));

    return (
        <div className={styles.container} onClick={() => setExpanded(!expanded)}>
            <div className={styles.headerRow}>
                <div>
                    <Heading size={"small"}>
                        {props.scope.name}
                    </Heading>
                    <Ingress>
                        {props.scope.description}
                    </Ingress>
                </div>
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