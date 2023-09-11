import React, { createRef, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import {
  Alert,
  Button,
  Label,
  Paragraph,
  Spinner,
  TextArea,
  TextField,
  Radio,
  HelpText,
  Chip, Select,
} from "@digdir/design-system-react";
import Modal from "../../common/Modal/Modal";
import {useClientMutation, usePublicScopes, useScopes} from "../../../hooks/api";
import StyledLink from "../../common/StyledLink/StyledLink";
import { bold, link } from "../../util/textTransforms";
import { RequestApiClientBody } from "../../../types/api";
import { CSSTransition } from "react-transition-group";
import { customAlphabet } from "nanoid";
import { exportJWK, importSPKI } from "jose";
import { XMarkOctagonFillIcon } from "@navikt/aksel-icons";
import { Link } from "react-router-dom";

interface Props {
  env: string;
  scope: string;
  open: boolean;
  closeModal: () => void;
}

function NewClientModal(props: Props) {
  const {
    mutate: addClient,
    isSuccess,
    isError,
    isIdle,
    data,
  } = useClientMutation(props.env);
  const { data: publicScopes } = usePublicScopes(props.env);
  const { data: privateScopes } = useScopes(props.env);
  const isLoading = !isIdle && !isError && !isSuccess;
  const [useKeys, setUseKeys] = useState(false);
  const [step, setStep] = useState(1);
  const [description, setDescription] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [isNext, setIsNext] = useState(true);
  const [chosenIntegration, setChosenIntegration] = useState(false);
  const [kid, setKid] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>();
  const [scopes, setScopes] = useState<string[]>([props.scope])
  const nanoid = customAlphabet(
    "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    10,
  );

  useEffect(() => {
    if (isSuccess) {
      setStep(3);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      setErrorMessage("Ukjent feil under opprettelse");
    }
  }, [isError]);

  const handleSubmit = async () => {
    setErrorMessage(undefined);
    const requestBody: RequestApiClientBody = {
      description: description,
      scopes: scopes,
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
        setErrorMessage("Du har lastet opp en ugyldig public key");
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
    setErrorMessage(undefined);
    setIsNext(false);
    setStep(1);
  };

  const onNeste = () => {
    setIsNext(true);
    setStep(2);
  };

  const onChangeIntegration = (val: string | undefined) => {
    if (val === "true") {
      setUseKeys(true);
      setKid(nanoid(10));
    } else {
      setUseKeys(false);
    }
    setErrorMessage(undefined);
    setChosenIntegration(true);
  };

  const renderInputScreenTwo = () => (
    <>
      <div className={styles.integrationSelect}>
        <div className={styles.radioButtons}>
          <Radio.Group
            onChange={onChangeIntegration}
            legend={
              <div className={styles.radioButtonLabel}>
                Hvordan vil du integrere med tjenesten
                <HelpText
                  className={styles.helpText}
                  title={"Mer info om integrasjoner"}
                >
                  Det finnes flere måter å integrere mot Maskinporten.
                  Bruk av nøkkel og virkomshetssertifikate er tilgjengelig
                  via forenklet onboarding og flere via Samarbeidsportalen.
                  <br />
                  {link("/guide", "Se beskrivelse av de forskjellige metodene her", true)}
                </HelpText>
              </div>
            }
          >
            <Radio value={"true"}>Med manuelt opplastet nøkkel</Radio>
            <Radio value={"false"}>
              Signere direkte med virksomhetssertifikat
            </Radio>
          </Radio.Group>
        </div>
        <div className={styles.integrationInfo}>
          {useKeys && (
            <>
              <Label size={"large"}>
                Nøkkelen din får følgende key-id (kid):
              </Label>
              <Label size={"large"} className={styles.kid}>
                {kid}
              </Label>
              <Label size={"small"}>Vi støtter kun RSA256 nøkler.</Label>
            </>
          )}
        </div>
      </div>

      {useKeys && (
        <div className={styles.keyTextArea}>
          <TextArea
            label={"Legg til public-delen av nøkkelen du vil bruke"}
            required
            value={publicKey}
            placeholder={
              "-----BEGIN RSA PUBLIC KEY-----\n" +
              "MIIBCgKCAQEA+xGZ/wcz9ugFpP07Nspo6U17l0YhFiFpxxU4pTk3Lifz9R3zsIsu\n" +
              "ERwta7+fWIfxOo208ett/jhskiVodSEt3QBGh4XBipyWopKwZ93HHaDVZAALi/2A\n" +
              "+xTBtWdEo7XGUujKDvC2/aZKukfjpOiUI8AhLAfjmlcD/UZ1QPh0mHsglRNCmpCw\n" +
              "mwSXA9VNmhz+PiB+Dml4WWnKW/VHo2ujTXxq7+efMU4H2fny3Se3KYOsFPFGZ1TN\n" +
              "QSYlFuShWrHPtiLmUdPoP6CV2mML1tk+l7DIIqXrQhLUKDACeM5roMx0kLhUWB8P\n" +
              "+0uj1CNlNN4JRZlC7xFfqiMbFRU9Z4N6YwIDAQAB\n" +
              "-----END RSA PUBLIC KEY-----"
            }
            onChange={(e) => setPublicKey(e.target.value)}
          />
        </div>
      )}
    </>
  );

  const selectableScopes = () => {
    if (!publicScopes || !privateScopes) {
      return [{value: props.scope, label: props.scope}];
    }

    return privateScopes.concat(publicScopes).map(scope => ({value: scope.scope, label: scope.scope}))
  }

  const renderInputScreenOne = () => (
    <>
      <TextField
        label={"Valgt miljø:"}
        value={props.env}
        readOnly={"readonlyInfo"}
      />
      <div className={styles.multiSelect}>
        <Select options={selectableScopes()}
                multiple
                onChange={scope => setScopes(scope)}
                label={"Valgte API-tilganger"}
                value={scopes}
        />
      </div>
      <TextField
        label={"Hva skal du bruke integrasjonen til?"}
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </>
  );

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
              <Label>Integrasjonsbeskrivelse:</Label>
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
        <Label>{bold("Ta i bruk integrasjon?")}</Label>
        <Paragraph>
          Følg var onboardingsguide for informasjon om hvordan du kan ta i bruk
          integrasjonen din
        </Paragraph>
        <div className={styles.usageButtons}>
          <StyledLink to={"/guide"}>Gå til Onboardingsguiden</StyledLink>
        </div>
      </div>
    </div>
  );

  const steps = [
    renderInputScreenOne,
    renderInputScreenTwo,
    renderSuccessScreen,
  ];

  return (
    <Modal
      open={props.open}
      closeModal={props.closeModal}
      title={
        isSuccess
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
              <Button variant={"outline"} onClick={props.closeModal}>
                Avbryt
              </Button>
              <Button onClick={onNeste} disabled={description.length === 0}>
                Neste
              </Button>
            </>
          )}
          {step === 2 && (
            <>
              <Button variant={"outline"} onClick={onForrige}>
                Forrige
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={
                  !chosenIntegration || (useKeys && publicKey.length === 0)
                }
              >
                {isLoading && (
                  <Spinner variant={"interaction"} title={"laster"} />
                )}
                {isLoading ? "Oppretter integrasjon" : "Opprett integrasjon"}
              </Button>
              {errorMessage && (
                <div className={styles.alert}>
                  <XMarkOctagonFillIcon />
                  <Label>{errorMessage}</Label>
                </div>
              )}
            </>
          )}
          {step === 3 && (
            <Button variant={"outline"} onClick={props.closeModal}>
              Tilbake til oversikten
            </Button>
          )}
        </div>
      </>
    </Modal>
  );
}

export default NewClientModal;
