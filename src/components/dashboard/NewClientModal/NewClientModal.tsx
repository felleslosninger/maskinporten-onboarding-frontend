import React, {createContext, createRef, ReactNode, useEffect, useState} from "react";
import styles from "./styles.module.scss";
import {Button, Paragraph, Spinner} from "@digdir/design-system-react";
import Modal from "../../common/Modal/Modal";
import { useClientMutation } from "../../../hooks/api";
import { ApiClient, RequestApiClientBody } from "../../../types/api";
import { CSSTransition } from "react-transition-group";
import { exportJWK, importSPKI } from "jose";
import { XMarkOctagonFillIcon, ExclamationmarkTriangleFillIcon } from "@navikt/aksel-icons";
import Step1 from "./Step1";
import Step3 from "./Step3";
import Step2 from "./Step2";
import { AxiosResponse } from "axios";
import VisuallyHidden from "../../common/VisuallyHidden/VisuallyHidden";

export interface FeedbackMessage {
  message: ReactNode;
  level: "err" | "warn";
}

export type NewClientContextProps = {
  requestResponse: AxiosResponse<ApiClient, any> | undefined;
  message: {
    get: FeedbackMessage | undefined;
    set: (err: FeedbackMessage | undefined) => void;
  };
  scopes: {
    get: string[];
    set: (scopes: string[]) => void;
  };
  description: {
    get: string;
    set: (desc: string) => void;
  };
  kid: {
    get: string;
    set: (kid: string) => void;
  };
  isKeys: {
    get: boolean;
    set: (isKeys: boolean) => void;
  };
  key: {
    get: string;
    set: (key: string) => void;
  };
  isIntegrationChosen: {
    get: boolean;
    set: (isChosen: boolean) => void;
  };
};

export const NewClientContext = createContext<NewClientContextProps | null>(
  null,
);

interface NewClientProps {
  env: string;
  scope: string;
  open: boolean;
  closeModal: () => void;
}

function NewClientModal(props: NewClientProps) {
  const {
    mutate: addClient,
    isSuccess,
    isError,
    isIdle,
    data,
  } = useClientMutation(props.env);
  const isLoading = !isIdle && !isError && !isSuccess;
  const [useKeys, setUseKeys] = useState(false);
  const [step, setStep] = useState(1);
  const [description, setDescription] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [isNext, setIsNext] = useState(true);
  const [chosenIntegration, setChosenIntegration] = useState(false);
  const [kid, setKid] = useState("");
  const [message, setMessage] = useState<FeedbackMessage>();
  const [scopes, setScopes] = useState<string[]>([]);

  // Go to success step on client POST success
  useEffect(() => {
    if (isSuccess) {
      setStep(3);
    }
  }, [data]);

  // Show error on client POST error
  useEffect(() => {
    if (isError) {
      setMessage({message: "Ukjent feil under opprettelse", level: "err"})
    }
  }, [isError]);

  const handleSubmit = async () => {
    setMessage(undefined);
    const requestBody: RequestApiClientBody = {
      description: description,
      scopes: [props.scope].concat(scopes),
    };

    if (useKeys) {
      try {
        const key = await importSPKI(publicKey, "RS256", { extractable: true });
        const jwk = await exportJWK(key);
        jwk.alg = "RS256";
        jwk.kid = kid;
        jwk.use = "sig";
        requestBody.keys = [jwk];
      } catch (e) {
        setMessage({message: "Du har lastet opp en ugyldig RSA public key", level: "err"});
        return;
      }
    }

    addClient(requestBody);
  };

  const nextClassNames = {
    enter: styles.rightToLeftEnter,
    enterActive: styles.rightToLeftEnterActive,
    exit: styles.rightToLeftExit,
    exitActive: styles.rightToLeftExitActive,
  };

  const prevClassNames = {
    enter: styles.leftToRightEnter,
    enterActive: styles.leftToRightEnterActive,
    exit: styles.leftToRightExit,
    exitActive: styles.leftToRightExitActive,
  };

  const onForrige = () => {
    setUseKeys(false);
    setChosenIntegration(false);
    setMessage(undefined);
    setIsNext(false);
    setStep(1);
  };

  const onNeste = () => {
    setIsNext(true);
    setStep(2);
  };

  const steps = [
    () => <Step1 scope={props.scope} env={props.env} />,
    () => <Step2 />,
    () => <Step3 scope={props.scope} env={props.env} />,
  ];

  return (
    <NewClientContext.Provider
      value={{
        requestResponse: data,
        message: {
          get: message,
          set: setMessage,
        },
        scopes: {
          get: scopes,
          set: setScopes,
        },
        description: {
          get: description,
          set: setDescription,
        },
        kid: {
          get: kid,
          set: setKid,
        },
        isKeys: {
          get: useKeys,
          set: setUseKeys,
        },
        key: {
          get: publicKey,
          set: setPublicKey,
        },
        isIntegrationChosen: {
          get: chosenIntegration,
          set: setChosenIntegration,
        },
      }}
    >
      <Modal
        open={props.open}
        closeModal={props.closeModal}
        title={
          step === 3
            ? "Integrasjonen er opprettet"
            : `Opprett ny integrasjon (${step} / ${steps.length - 1})`
        }
        className={styles.modal}
      >
        <>
          {steps.map((render, index) => {
            const ref = createRef<HTMLDivElement>();
            return (
              <CSSTransition
                in={step === index + 1}
                key={index}
                timeout={1000}
                classNames={isNext ? nextClassNames : prevClassNames}
                nodeRef={ref}
                mountOnEnter
                unmountOnExit
              >
                <div
                  className={`${styles.form} ${
                    isNext ? styles.rightToLeft : styles.leftToRight
                  }`}
                  ref={ref}
                >
                  {render()}
                </div>
              </CSSTransition>
            );
          })}

          <div className={styles.modalButtons}>
            {step === 1 && (
              <>
                <Button variant={"secondary"} onClick={props.closeModal}>
                  Avbryt
                  <VisuallyHidden>
                    oppretting
                  </VisuallyHidden>
                </Button>
                <Button onClick={onNeste} disabled={description.length === 0}>
                  Neste
                  <VisuallyHidden>
                    side
                  </VisuallyHidden>
                </Button>
              </>
            )}
            {step === 2 && (
              <>
                <Button variant={"secondary"} onClick={onForrige}>
                  Forrige
                  <VisuallyHidden>
                    side
                  </VisuallyHidden>
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={
                    !chosenIntegration || (useKeys && (message?.level === "err" || publicKey.length === 0))
                  }
                >
                  {isLoading && (
                    <Spinner size={"small"} variant={"interaction"} title={"Oppretter integrasjon"} />
                  )}
                  {isLoading ? "Oppretter integrasjon" : "Opprett integrasjon"}
                </Button>
                {message && (
                  <div
                    className={`${styles.alert} ${message.level === "err" ? styles.err : styles.warn}`}
                    role={"alert"}
                  >
                    {message.level === "err" ? <XMarkOctagonFillIcon /> : <ExclamationmarkTriangleFillIcon />}
                    <Paragraph>{message.message}</Paragraph>
                  </div>
                )}
              </>
            )}
            {step === 3 && (
              <Button variant={"secondary"} onClick={props.closeModal}>
                Tilbake til oversikten
              </Button>
            )}
          </div>
        </>
      </Modal>
    </NewClientContext.Provider>
  );
}

export default NewClientModal;
