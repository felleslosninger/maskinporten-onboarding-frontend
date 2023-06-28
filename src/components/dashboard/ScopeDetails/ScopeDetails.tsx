import React, {useState} from "react";
import {ApiClients, ApiScope} from "../../../types/api";
import styles from './styles.module.scss';
import {Accordion, Button, Heading, Label, Paragraph, Popover, Select, TextField} from "@digdir/design-system-react";
import KlientSVG from "../../../assets/klient_opprettet.svg";
import TilgangSvg from "../../../assets/tilgang_gitt.svg";
import ClientDescription from "../ClientDescription/ClientDescription";
import Modal from "../../common/Modal/Modal";
import NewClientModal from "../NewClientModal/NewClientModal";

interface ScopeDetailProps {
    scope: ApiScope;
    clients: ApiClients;
    env: string;
}

function ScopeDetails(props: ScopeDetailProps) {
    const [showPopover, setShowPopover] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const hasClient = props.clients.some(client => client.scopes.includes(props.scope.name));

    const renderNoClientBox = () => {
        return (
            <div className={styles.noClientBox}>
                <Label>
                    Dette APIet er tildelt din organisasjon, men har ingen klient registrert.
                </Label>
                <Label>
                    Opprett en ny klient via knappen nedenfor.
                </Label>
            </div>
        );
    }

    return (
        <Accordion.Item>
            <NewClientModal env={props.env}
                            scope={props.scope.name}
                            open={showModal}
                            closeModal={() => setShowModal(false)}
            />
            <Accordion.Header level={4} className={styles.headerRow}>
                <div>
                    <Heading size={"xsmall"}>
                        {props.scope.name}
                    </Heading>
                    <Paragraph>
                        {props.scope.description}
                    </Paragraph>
                </div>
                <Popover
                    trigger={
                        <img src={hasClient ? KlientSVG : TilgangSvg}
                             alt={""}
                             className={styles.statusIcon}
                             onMouseEnter={() => setShowPopover(true)}
                             onMouseLeave={() => setShowPopover(false)}
                        />
                    }
                    variant={"info"}
                    open={showPopover}
                    className={styles.statusbox}
                    placement={"top"}
                >
                    {hasClient ? "Klient opprettet" : "Tilgang er gitt, men klient er ikke opprettet"}
                </Popover>
            </Accordion.Header>
            <Accordion.Content>
                {
                    hasClient
                    ? props.clients.map((client) => client.scopes.includes(props.scope.name) ? <ClientDescription client={client} key={client.client_id} /> : null)
                    : renderNoClientBox()
                }
                <div className={styles.buttonRow}>
                    <Button className={styles.opprettButton} onClick={() => setShowModal(true)}>
                        Opprett Klient
                    </Button>
                    {
                        hasClient &&
                        <>
                            <Button variant={"outline"}>Kom i gang med virksomhetssertifikat</Button>
                            <Button variant={"outline"}>Kom i gang med nøkler</Button>
                        </>
                    }
                </div>
            </Accordion.Content>
        </Accordion.Item>
    );
}

export default ScopeDetails;