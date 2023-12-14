import React, { createRef, useEffect, useState } from "react";
import { ApiClients, ApiScope } from "../../../types/api";
import styles from "./styles.module.scss";
import {
  Accordion,
  Button,
  Label,
  Paragraph,
  Tag,
} from "@digdir/design-system-react";
import ClientDescription from "../ClientDescription/ClientDescription";
import NewClientModal from "../NewClientModal/NewClientModal";
import {
  Buldings2Icon,
  InformationSquareIcon,
  KeyHorizontalFillIcon,
  TerminalIcon,
} from "@navikt/aksel-icons";
import { useEnhet } from "../../../hooks/brreg";
import { useMediaQuery } from "react-responsive";

interface ScopeDetailProps {
  scope: ApiScope;
  clients: ApiClients;
  env: string;
}

function ScopeDetails(props: ScopeDetailProps) {
  const modalRef = createRef<HTMLDialogElement>();
  const { data: enhet, isLoading, isError } = useEnhet(props.scope.owner_orgno);
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1300px)" });
  const [showModal, setShowModal] = useState(false);
  const currentClients = props.clients.filter((client) =>
    client.scopes.includes(props.scope.scope),
  );

  useEffect(() => {
    if (showModal && !modalRef.current?.open) {
      modalRef.current?.showModal();
    }
  }, [showModal, modalRef]);

  const onMakeClient = () => {
    if (window.env.WHITELIST.indexOf(props.scope.scope) === -1) {
      alert(
        "Denne tilbyderen deltar ikke i forenklet onboarding-piloten, og du kan derfor ikke opprette integrasjonen din gjennom denne løsningen. Du må bruke Samarbeidsportalen istedenfor.",
      );
      return;
    }
    setShowModal(true);
  };

  const renderNoClientBox = () => {
    return (
      <div className={styles.noClientBox}>
        <Paragraph>
          Dette APIet er tildelt din organisasjon, men har ingen integrasjon
          registrert.
        </Paragraph>
        <Paragraph>Opprett en ny integrasjon via knappen nedenfor.</Paragraph>
      </div>
    );
  };

  return (
    <Accordion.Item>
      {showModal && (
        <NewClientModal
          env={props.env}
          scope={props.scope.scope}
          closeModal={() => setShowModal(false)}
          ref={modalRef}
        />
      )}
      <Accordion.Header level={3} className={styles.headerRow}>
        <div className={styles.scopeInfo}>
          <div className={styles.scopeInfoTop}>
            <Paragraph size={"large"}>
              <Buldings2Icon />
              {isError && props.scope.owner_orgno}
              {isLoading && (
                <span className={styles.placeholderText}>
                  {props.scope.owner_orgno}
                </span>
              )}
              {enhet && enhet.navn}
            </Paragraph>
            <Paragraph size={"large"}>
              <KeyHorizontalFillIcon />
              {props.scope.scope}
              {props.scope.accessible_for_all && (
                <Tag
                  color={"second"}
                  variant={"secondary"}
                  size={"small"}
                  className={styles.publicTag}
                >
                  Public
                </Tag>
              )}
            </Paragraph>
          </div>
          <Label>
            <InformationSquareIcon />
            <div className={styles.desc}>{props.scope.description}</div>
          </Label>
        </div>
        <div className={styles.statusIcon}>
          <TerminalIcon />
          <Paragraph>
            {currentClients.length}{" "}
            {isLargeScreen &&
              (currentClients.length === 1 ? "integrasjon" : "integrasjoner")}
          </Paragraph>
        </div>
      </Accordion.Header>
      <Accordion.Content>
        {currentClients.length > 0
          ? props.clients.map((client) =>
              client.scopes.includes(props.scope.scope) ? (
                <ClientDescription
                  client={client}
                  env={props.env}
                  key={client.clientId}
                />
              ) : null,
            )
          : renderNoClientBox()}
        <div className={styles.buttonRow}>
          <Button className={styles.opprettButton} onClick={onMakeClient}>
            Opprett integrasjon
          </Button>
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
}

export default ScopeDetails;
