import React, {useState} from "react";
import {ApiClient} from "../../../types/api";
import styles from '../ClientDescription/styles.module.scss';
import {Button, Paragraph} from "@digdir/design-system-react";
import { CheckmarkIcon } from '@navikt/aksel-icons';
import {useClientDeleteMutation} from "../../../hooks/api";
import ConfirmAlert from "../../common/ConfirmAlert/ConfirmAlert";

interface ClientDescriptionProps {
    client: ApiClient;
    env: string;
}

const ClientDescription = (props: ClientDescriptionProps) => {
    const { mutate: deleteClient } = useClientDeleteMutation(props.env);
    const [copied, setCopied] = useState(false);
    const [ modalOpen, setModalOpen ] = useState(false);

    const onCopyButtonClick = () => {
        navigator.clipboard.writeText(props.client.clientId);
        setCopied(true);
    }

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
                <div className={styles.topRow}>
                    <div>
                        <Paragraph>
                            klient-beskrivelse:
                        </Paragraph>
                        <Paragraph>
                            {props.client.description}
                        </Paragraph>
                    </div>
                    <Button variant={"filled"}
                            color={"danger"}
                            onClick={() => setModalOpen(true)}
                    >
                        Slett
                    </Button>
                </div>
                <div className={styles.bottomRow}>
                    <div>
                        <Paragraph>
                            client-id:
                        </Paragraph>
                        <Paragraph>
                            {props.client.clientId}
                        </Paragraph>
                    </div>
                    <Button variant={"outline"}
                            onClick={onCopyButtonClick}
                            icon={copied ? <CheckmarkIcon /> : null}
                    >
                        { copied ? "Kopiert" : "Kopier" }
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ClientDescription;