import React, {createRef, useEffect, useState} from "react";
import styles from "./styles.module.scss";
import {
    Button,
    Label,
    Paragraph, RadioGroup,
    Spinner,
    TextArea,
    TextField
} from "@digdir/design-system-react";
import Modal from "../../common/Modal/Modal";
import {useClientMutation} from "../../../hooks/api";
import StyledLink from "../../common/StyledLink/StyledLink";
import {bold} from "../../util/textTransforms";
import {RequestApiClientBody} from "../../../types/api";
import {CSSTransition} from 'react-transition-group';

interface Props {
    env: string;
    scope: string;
    open: boolean;
    closeModal: () => void;
}

function NewClientModal(props: Props) {
    const { mutate: addClient, isSuccess, isError, isIdle, data } = useClientMutation(props.env);
    const isLoading = !isIdle && !isError && !isSuccess;
    const [useKeys, setUseKeys] = useState(false);
    const [step, setStep] = useState(1);
    const [description, setDescription] = useState("");
    const [publicKey, setPublicKey] = useState("");
    const [isNext, setIsNext] = useState(true);
    const [chosenIntegration, setChosenIntegration] = useState(false)

    useEffect(() => {
        if (isSuccess) {
            setStep(3);
        }
    }, [isSuccess]);

    const handleSubmit = () => {
        const requestBody: RequestApiClientBody = {
            description: description,
            scopes: [props.scope]
        }

        if (useKeys) {
            requestBody.keys = publicKey;
        }

        addClient(requestBody);
    }

    const errorClassNames = {
        enter: styles.errorMessageEnter,
        enterActive: styles.errorMessageEnterActive,
        exit: styles.errorMessageExit,
        exitActive: styles.errorMessageExitActive
    };

    const nextClassNames = {
        enter: styles.rightToLeftEnter,
        enterActive: styles.rightToLeftEnterActive,
        exit: styles.rightToLeftExit,
        exitActive: styles.rightToLeftExitActive
    };

    const prevClassNames = {
        enter: styles.leftToRightEnter,
        enterActive: styles.leftToRightEnterActive,
        exit: styles.leftToRightExit,
        exitActive: styles.leftToRightExitActive
    };

    const onForrige = () => {
        setUseKeys(false);
        setChosenIntegration(false);
        setIsNext(false);
        setStep(1);
    }

    const onNeste = () => {
        setIsNext(true);
        setStep(2);
    }

    const onChangeIntegration = (val: string | undefined) => {
        val === "true" ? setUseKeys(true) : setUseKeys(false);
        setChosenIntegration(true);
    }

    const renderInputScreenTwo = () => (
        <>
            <div>
                <div className={styles.radioButtons}>
                    <RadioGroup items={[
                                    {value: "true", label: "Bruk JWK nøkler"},
                                    {value: "false", label: "Jeg bruker virksomhetssertifikat"}
                                ]}
                                name={"keys"}
                                description={"Hvordan vil du integrere med tjenesten?"}
                                onChange={onChangeIntegration}
                    />
                </div>
            </div>

            {useKeys &&
                <TextArea label={"Legg til JWK nøkkel"}
                          required
                          className={styles.keyTextArea}
                          value={publicKey}
                          onChange={(e) => setPublicKey(e.target.value)}
                />
            }
        </>
    );

    const renderInputScreenOne = () => (
        <>
            <TextField label={"Valgt miljø:"}
                       value={props.env}
                       readOnly={"readonlyInfo"}
            />
            <TextField value={props.scope}
                       label={"Valgt API:"}
                       readOnly={"readonlyInfo"}
            />
            <TextField label={"Hva skal du bruke klienten til?"}
                       required
                       value={description}
                       onChange={e => setDescription(e.target.value)}
            />
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
                            <Paragraph>{data?.data.description}</Paragraph>
                        </div>
                        <div>
                            <Label>Client-id:</Label>
                            <Paragraph>{data?.data.clientId}</Paragraph>
                        </div>
                    </div>
                </div>
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

    const steps = [renderInputScreenOne, renderInputScreenTwo, renderSuccessScreen];

    return (
        <Modal open={props.open}
               closeModal={props.closeModal}
               title={isSuccess ? "Klienten er opprettet" : `Opprett ny klient (${step} / ${steps.length - 1})`}
               className={styles.modal}
        >
            <>
                {steps.map((render, index) => {
                    const ref = createRef<HTMLDivElement>();
                    return (
                        <CSSTransition in={step === index + 1}
                                       key={index}
                                       timeout={1000}
                                       classNames={isNext ? nextClassNames : prevClassNames}
                                       nodeRef={ref}
                                       mountOnEnter
                                       unmountOnExit
                        >
                            <div className={`${styles.form} ${isNext ? styles.rightToLeft : styles.leftToRight}`}
                                 ref={ref}
                            >
                                {render()}
                            </div>
                        </CSSTransition>
                    );
                })}

                <div className={styles.modalButtons}>
                    {step === 1 &&
                        <>
                            <Button variant={"outline"} onClick={props.closeModal}>
                                Avbryt
                            </Button>
                            <Button onClick={onNeste} disabled={description.length === 0}>
                                Neste
                            </Button>
                        </>
                    }
                    {step === 2 &&
                        <>
                            <Button variant={"outline"} onClick={onForrige}>
                                Forrige
                            </Button>
                            <Button onClick={handleSubmit}
                                    disabled={!chosenIntegration || (useKeys && publicKey.length === 0)}
                            >
                                {isLoading && <Spinner variant={"interaction"} title={"laster"} />}
                                {isLoading ? "Oppretter klient" : "Opprett klient"}
                            </Button>
                        </>
                    }
                    {step === 3 &&
                        <Button variant={"outline"} onClick={props.closeModal}>
                            Tilbake til oversikten
                        </Button>
                    }
                </div>
            </>
        </Modal>
    );
}

export default NewClientModal;