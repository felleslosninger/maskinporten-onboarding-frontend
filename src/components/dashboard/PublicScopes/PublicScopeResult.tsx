import React, { useState } from "react";
import { ApiPublicScope } from "../../../types/api";
import NewClientModal from "../NewClientModal/NewClientModal";
import { Button, Ingress, Label, Paragraph } from "@digdir/design-system-react";
import styles from "./styles.module.scss";
import {
  KeyHorizontalFillIcon,
  PlusCircleIcon,
  PlusIcon,
} from "@navikt/aksel-icons";
import { bold } from "../../util/textTransforms";

interface Props {
  scope: ApiPublicScope;
  env: string;
}

function PublicScopeResult(props: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <NewClientModal
        env={props.env}
        scope={props.scope.name}
        open={showModal}
        closeModal={() => setShowModal(false)}
      />
      <button className={styles.result} onClick={() => setShowModal(true)}>
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
