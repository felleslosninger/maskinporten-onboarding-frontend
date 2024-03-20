import React, { createRef, useEffect, useState } from "react";
import { ApiScope } from "../../../types/api";
import NewClientModal from "../NewClientModal/NewClientModal";
import { Ingress, Paragraph } from "@digdir/designsystemet-react";
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
        onClick={() => setShowModal(true)}
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
