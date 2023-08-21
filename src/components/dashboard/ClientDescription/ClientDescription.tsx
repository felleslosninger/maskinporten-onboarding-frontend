import React, {useState} from "react";
import {ApiClient} from "../../../types/api";
import styles from '../ClientDescription/styles.module.scss';
import {Button, Paragraph} from "@digdir/design-system-react";
import {CheckmarkIcon, TrashIcon} from '@navikt/aksel-icons';
import {useClientDeleteMutation} from "../../../hooks/api";
import ConfirmAlert from "../../common/ConfirmAlert/ConfirmAlert";

interface ClientDescriptionProps {
    client: ApiClient;
    env: string;
}

const ClientDescription = (props: ClientDescriptionProps) => {
    const { mutate: deleteClient } = useClientDeleteMutation(props.env);
    const [ modalOpen, setModalOpen ] = useState(false);


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
                            integrasjonsbeskrivelse:
                        </Paragraph>
                        <Paragraph>
                            {props.client.description}
                        </Paragraph>
                    </div>
                    <Button variant={"quiet"}
                            color={"danger"}
                            onClick={() => setModalOpen(true)}
                            title={"Slett integrasjon"}
                    >
                        <TrashIcon />
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
                </div>
            </div>
        </div>
    );
};

export default ClientDescription;