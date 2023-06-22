import React, {useState} from "react";
import {ApiClients, ApiScope} from "../../../types/api";
import styles from './styles.module.scss';
import {Accordion, Button, Heading, Label, Paragraph, Popover, TextField} from "@digdir/design-system-react";
import KlientSVG from "../../../assets/klient_opprettet.svg";
import TilgangSvg from "../../../assets/tilgang_gitt.svg";
import ClientDescription from "../ClientDescription/ClientDescription";
import InvertedButton from "../../common/Button/InvertedButton";
import Modal from "../../common/Modal/Modal";

interface ScopeDetailProps {
    scope: ApiScope;
    clients: ApiClients;
    env: string;
}

function ScopeDetails(props: ScopeDetailProps) {
    const [showPopover, setShowPopover] = useState(false);
    const hasClient = props.clients.some(client => client.scopes.includes(props.scope.name));
    const [showModal, setShowModal] = useState(false);

    const renderNoClientBox = () => {
        return (
            <div className={styles.noClientBox}>
                <Label>
                    Dette APIet er tildelt din organisasjon, men har ikke ingen klient registrert.
                </Label>
                <Label>
                    Opprett en ny klient via knappen nedenfor.
                </Label>
            </div>
        );
    }

    return (
        <Accordion.Item>
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
                    ? props.clients.map((client) => client.scopes.includes(props.scope.name) ? <ClientDescription client={client} /> : null)
                    : renderNoClientBox()
                }
                <Button className={styles.opprettButton} onClick={() => setShowModal(true)}>
                    Opprett Klient
                </Button>
            </Accordion.Content>
            <Modal open={showModal} closeModal={() => setShowModal(false)} title={"Opprett ny klient"}>
                <TextField value={props.env} disabled />
                <TextField value={props.scope.name} disabled />
                <TextField />
                <div>
                    <InvertedButton onClick={() => setShowModal(false)}>
                        Avbryt
                    </InvertedButton>
                    <Button>
                        Opprett klient
                    </Button>
                </div>
            </Modal>
        </Accordion.Item>
    );
}

export default ScopeDetails;