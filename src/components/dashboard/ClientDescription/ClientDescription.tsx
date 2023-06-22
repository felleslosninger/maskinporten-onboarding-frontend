import React, {useState} from "react";
import {ApiClient} from "../../../types/api";
import styles from '../ClientDescription/styles.module.scss';
import { Paragraph } from "@digdir/design-system-react";
import InvertedButton from "../../common/Button/InvertedButton";

interface ClientDescriptionProps {
    client: ApiClient;
}

const ClientDescription = (props: ClientDescriptionProps) => {
    const [copied, setCopied] = useState(false);

    const onCopyButtonClick = () => {
        navigator.clipboard.writeText(props.client.client_id);
        setCopied(true);
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.topRow}>
                    <Paragraph>
                        klient-beskrivelse:
                    </Paragraph>
                    <Paragraph>
                        {props.client.description}
                    </Paragraph>
                </div>
                <div className={styles.bottomRow}>
                    <div>
                        <Paragraph>
                            client-id:
                        </Paragraph>
                        <Paragraph>
                            {props.client.client_id}
                        </Paragraph>
                    </div>
                    <InvertedButton onClick={onCopyButtonClick}>
                        { copied ? "Kopiert" : "Kopier" }
                    </InvertedButton>
                </div>
            </div>
        </div>
    );
};

export default ClientDescription;