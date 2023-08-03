import React, {useState} from "react";
import styles from "./styles.module.scss";
import {Alert, Button, Label, Paragraph, Spinner, TextField} from "@digdir/design-system-react";
import Modal from "../../common/Modal/Modal";
import {useClientMutation} from "../../../hooks/api";
import StyledLink from "../../common/StyledLink/StyledLink";
import {bold} from "../../util/textTransforms";

interface Props {
    env: string;
    scope: string;
    open: boolean;
    closeModal: () => void;
}

function NewClientModal(props: Props) {
    const { mutate: addClient, isSuccess, isError, isIdle, data } = useClientMutation(props.env);
    const isLoading = !isIdle && !isError && !isSuccess;
    const ref = React.createRef<HTMLInputElement>();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addClient({ description: ref.current?.value || "", scopes: [props.scope] });
    }

    const renderInputScreen = () => (
        <>
            {
                isError &&
                <Alert severity={"danger"}>
                    Noe gikk galt under innsendingen, vennligst prøv igjen senere
                </Alert>
            }
            <form onSubmit={handleSubmit}>
                <TextField label={"Valgt miljø:"}
                           value={props.env}
                           readOnly={"readonlyInfo"}
                />
                <TextField value={props.scope}
                           label={"Valgt API:"}
                           readOnly={"readonlyInfo"}
                />
                <TextField label={"Hva skal du bruke klienten til?"} required ref={ref} />
                <div className={styles.modalButtons}>
                    <Button variant={"outline"} onClick={props.closeModal}>
                        Avbryt
                    </Button>
                    <Button type={"submit"}>
                        {isLoading && <Spinner variant={"interaction"} title={"laster"} />}
                        {isLoading ? "Oppretter klient" : "Opprett klient"}
                    </Button>
                </div>
            </form>
        </>
    )

    const renderSuccessScreen = () => (
        <div className={styles.successContainer}>
            <div>
                <div className={styles.responseInfo}>
                    <div className={styles.responseInfoContent}>
                        <div>
                            <Label>Miljø:</Label>
                            <Paragraph>{props.env}</Paragraph>
                        </div>
                        <div>
                            <Label>API tilgang:</Label>
                            <Paragraph>{props.scope}</Paragraph>
                        </div>
                        <div>
                            <Label>Klient beskrivelse:</Label>
                            <Paragraph>{data!!.data.description}</Paragraph>
                        </div>
                        <div>
                            <Label>Client-id:</Label>
                            <Paragraph>{data!!.data.clientId}</Paragraph>
                        </div>
                    </div>
                </div>
                <Button className={styles.closeModalButton} variant={"outline"} onClick={props.closeModal}>
                    Tilbake til oversikten
                </Button>
            </div>
            <div className={styles.usageInfo}>
                <Label>{bold("Ta i bruk klient?")}</Label>
                <Paragraph>
                    Følg var onboardingsguide for informasjon om hvordan du kan ta i bruk klienten din
                </Paragraph>
                <div className={styles.usageButtons}>
                    <StyledLink to={"/guide"}>Gå til Onboardingsguiden</StyledLink>
                </div>
            </div>
        </div>
    );

    return (
        <Modal open={props.open}
               closeModal={props.closeModal}
               title={isSuccess ? "Klienten er opprettet" : "Opprett ny klient"}
               className={styles.modal}
        >
            {isSuccess ? renderSuccessScreen() : renderInputScreen()}
        </Modal>
    );



}

export default NewClientModal;