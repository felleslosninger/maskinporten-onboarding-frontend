import React, {useState} from "react";
import {ApiClients, ApiScope} from "../../../types/api";
import styles from './styles.module.scss';
import {Accordion, Button, Label} from "@digdir/design-system-react";
import ClientDescription from "../ClientDescription/ClientDescription";
import NewClientModal from "../NewClientModal/NewClientModal";
import {
    Buldings2Icon, InformationSquareIcon, KeyHorizontalFillIcon, TerminalIcon
} from '@navikt/aksel-icons';
import {useEnhet} from "../../../hooks/brreg";

interface ScopeDetailProps {
    scope: ApiScope;
    clients: ApiClients;
    env: string;
}

function ScopeDetails(props: ScopeDetailProps) {
    const { data: enhet, isLoading, isError } = useEnhet(props.scope.owner_orgno);
    const [showModal, setShowModal] = useState(false);
    const currentClients = props.clients.filter(client => client.scopes.includes(props.scope.scope));


    const renderNoClientBox = () => {
        return (
            <div className={styles.noClientBox}>
                <Label>
                    Dette APIet er tildelt din organisasjon, men har ingen integrasjon registrert.
                </Label>
                <Label>
                    Opprett en ny integrasjon via knappen nedenfor.
                </Label>
            </div>
        );
    }

    return (
        <Accordion.Item>
            {showModal &&
                <NewClientModal env={props.env}
                                scope={props.scope.scope}
                                open={showModal}
                                closeModal={() => setShowModal(false)}
                />
            }
            <Accordion.Header level={4} className={styles.headerRow}>
                <div className={styles.scopeInfo}>
                    <div className={styles.scopeInfoTop}>
                        <Label>
                            <Buldings2Icon />
                            {isError && props.scope.owner_orgno}
                            {isLoading && <span className={styles.placeholderText}>{props.scope.owner_orgno}</span>}
                            {enhet && enhet.navn}
                        </Label>
                        <Label>
                            <KeyHorizontalFillIcon />
                            {props.scope.scope}
                        </Label>
                    </div>
                    <Label>
                        <InformationSquareIcon />
                        <div className={styles.desc}>
                            {props.scope.description}
                        </div>
                    </Label>
                </div>
                <div className={styles.statusIcon}>
                    <TerminalIcon />
                    <Label>
                        {currentClients.length} {currentClients.length === 1 ? "integrasjon" : "integrasjoner"}
                    </Label>
                </div>
            </Accordion.Header>
            <Accordion.Content>
                {
                    currentClients.length > 0
                    ? props.clients.map((client) => client.scopes.includes(props.scope.scope) ? <ClientDescription client={client} env={props.env} key={client.clientId} /> : null)
                    : renderNoClientBox()
                }
                <div className={styles.buttonRow}>
                    <Button className={styles.opprettButton} onClick={() => setShowModal(true)}>
                        Opprett integrasjon
                    </Button>
                </div>
            </Accordion.Content>
        </Accordion.Item>
    );
}

export default ScopeDetails;