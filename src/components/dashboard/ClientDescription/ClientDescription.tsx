import React, {useState} from "react";
import {ApiClient} from "../../../types/api";
import styles from '../ClientDescription/styles.module.scss';
import {Button, Heading, Ingress, Paragraph, Popover} from "@digdir/design-system-react";
import {BagdeIcon, KeyHorizontalIcon, TrashIcon} from '@navikt/aksel-icons';
import {useClientDeleteMutation} from "../../../hooks/api";
import ConfirmAlert from "../../common/ConfirmAlert/ConfirmAlert";
import {bold} from "../../util/textTransforms";
import CopyField from "../../common/CopyField/CopyField";

interface ClientDescriptionProps {
    client: ApiClient;
    env: string;
}

const ClientDescription = (props: ClientDescriptionProps) => {
    const { mutate: deleteClient } = useClientDeleteMutation(props.env);
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ showPopover, setShowPopover] = useState(false);

    return (
        <div className={styles.container}>
            {modalOpen &&
                <ConfirmAlert title={"Ekstra bekreftelse er påkrevet for denne handlingen"}
                              open={modalOpen}
                              confirmText={"SLETT"}
                              closeModal={() => setModalOpen(false)}
                              onConfirm={() => deleteClient(props.client.clientId)}
                />
            }
            <div className={styles.content}>
                <div className={styles.icon}
                     onMouseOver={() => setShowPopover(true)}
                     onMouseLeave={() => setShowPopover(false)}
                >
                    <Popover
                        placement={"top"}
                        variant={"info"}
                        trigger={props.client.keys ? <KeyHorizontalIcon /> : <BagdeIcon />}
                        open={showPopover}
                    >
                        Denne integrasjonen bruker {props.client.keys ? "nøkkel" : "virksomhetssertifikat"}
                    </Popover>
                </div>
                <div className={styles.info}>
                    <Heading size={"xsmall"}>{props.client.description}</Heading>
                    <div>
                        {bold("KlientId:")}
                        <CopyField copyValue={props.client.clientId}>{props.client.clientId}</CopyField>
                    </div>
                    {props.client.keys &&
                        <div>
                            {bold("Key-id (kid):")}
                            <CopyField copyValue={props.client.keys[0].kid!!}>{props.client.keys[0].kid}</CopyField>
                        </div>
                    }
                </div>

                <Button variant={"quiet"}
                        color={"danger"}
                        className={styles.deleteButton}
                        onClick={() => setModalOpen(true)}
                        title={"Slett integrasjon"}
                >
                    <TrashIcon />
                </Button>
            </div>
        </div>
    );
};

export default ClientDescription;