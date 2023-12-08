import React, { createRef, useEffect, useState } from "react";
import { ApiScope } from "../../../types/api";
import NewClientModal from "../NewClientModal/NewClientModal";
import { Ingress, Paragraph } from "@digdir/design-system-react";
import styles from "./styles.module.scss";
import { KeyHorizontalFillIcon, PlusCircleIcon } from "@navikt/aksel-icons";
import { bold } from "../../util/textTransforms";

interface Props {
  scope: ApiScope;
  env: string;
}

function PublicScopeResult(props: Props) {
  const modalRef = createRef<HTMLDialogElement>();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      modalRef.current?.showModal();
    }
  }, [showModal, modalRef]);

  const onMakeClient = () => {
    if (window.env.WHITELIST.indexOf(props.scope.name) === -1) {
      alert(
        "Denne tilbyderen deltar ikke i forenklet onboarding-piloten, og du kan " +
          "derfor ikke opprette integrasjonen din gjennom denne løsningen. " +
          "Du må bruke Samarbeidsportalen istedenfor.",
      );
      return;
    }
    setShowModal(true);
  };

  return (
    <>
      {showModal && (
        <NewClientModal
          env={props.env}
          scope={props.scope.name}
          closeModal={() => setShowModal(false)}
          ref={modalRef}
        />
      )}
      <button
        className={styles.result}
        onClick={onMakeClient}
        aria-label={`Opprett integrasjon med scope ${props.scope.name}`}
      >
        <div className={styles.resultsInfo}>
          <div>
            <KeyHorizontalFillIcon />
            <Ingress>{bold(props.scope.name)}</Ingress>
          </div>
          <Paragraph>{props.scope.description}</Paragraph>
        </div>
        <PlusCircleIcon className={styles.addIcon} />
      </button>
    </>
  );
}

export default PublicScopeResult;
