import React, { createRef } from "react";
import { ApiClient } from "../../../types/api";
import styles from "../ClientDescription/styles.module.scss";
import { Button, Heading, Tooltip } from "@digdir/designsystemet-react";
import { BagdeIcon, KeyHorizontalIcon, TrashIcon } from "@navikt/aksel-icons";
import { useClientDeleteMutation } from "../../../hooks/api";
import ConfirmAlert from "../../common/ConfirmAlert/ConfirmAlert";
import { bold } from "../../util/textTransforms";
import CopyField from "../../common/CopyField/CopyField";

interface ClientDescriptionProps {
  client: ApiClient;
  env: string;
}

const ClientDescription = (props: ClientDescriptionProps) => {
  const modalRef = createRef<HTMLDialogElement>();
  const { mutate: deleteClient } = useClientDeleteMutation(props.env);

  return (
    <div className={styles.container}>
      <ConfirmAlert
        ref={modalRef}
        title={"Ekstra bekreftelse er påkrevet for denne handlingen"}
        confirmText={"SLETT"}
        onConfirm={() => deleteClient(props.client.clientId)}
      />
      <div className={styles.content}>
        <div className={styles.icon}>
          <Tooltip
            content={`Denne integrasjonen bruker ${
              props.client.keys ? "nøkkel" : "virksomhetssertifikat"
            }`}
            placement={"top"}
          >
            {props.client.keys ? <KeyHorizontalIcon /> : <BagdeIcon />}
          </Tooltip>
        </div>
        <div className={styles.info}>
          <Heading size={"xsmall"}>{props.client.description}</Heading>
          <div>
            {bold("IntegrasjonsId:")}
            <CopyField copyValue={props.client.clientId}>
              {props.client.clientId}
            </CopyField>
          </div>
          {props.client.keys && (
            <div>
              {bold("Key-id (kid):")}
              <CopyField copyValue={props.client.keys[0].kid!!}>
                {props.client.keys[0].kid}
              </CopyField>
            </div>
          )}
          {props.client.scopes.length > 1 && (
            <div>
              {bold("Inkluderte scopes:")}
              <div className={styles.scopeFields}>
                {props.client.scopes.map((scope, index) => (
                  <CopyField copyValue={scope} key={index}>
                    {scope}
                  </CopyField>
                ))}
              </div>
            </div>
          )}
        </div>

        <Button
          variant={"tertiary"}
          color={"danger"}
          className={styles.deleteButton}
          onClick={() => modalRef.current?.showModal()}
          title={"Slett integrasjon"}
        >
          <TrashIcon />
        </Button>
      </div>
    </div>
  );
};

export default ClientDescription;
