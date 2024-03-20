import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { Combobox, Textfield } from "@digdir/designsystemet-react";
import { usePublicScopes, useScopes } from "../../../hooks/api";
import { NewClientContext } from "./NewClientModal";

interface Props {
  env: string;
  scope: string;
}

const Step1 = (props: Props) => {
  const context = useContext(NewClientContext);
  const { data: publicScopes } = usePublicScopes(props.env);
  const { data: privateScopes } = useScopes(props.env);

  if (!context) {
    return null;
  }

  const selectableScopes = () => {
    if (!publicScopes || !privateScopes) {
      return [{ value: props.scope, label: props.scope, public: false }];
    }

    return privateScopes
      .concat(publicScopes)
      .filter((scope) => scope.scope !== props.scope)
      .map((scope) => ({ value: scope.scope, label: scope.scope, public: scope.accessible_for_all }));
  };

  return (
    <>
      <div className={styles.infoFields}>
        <div className={styles.required}>
          <Textfield label={"Valgt miljø:"} value={props.env} readOnly />
        </div>
        <div className={styles.required}>
          <Textfield label={"Valgt tilgang:"} value={props.scope} readOnly />
        </div>
      </div>

      <div>
        <Combobox
          value={context.scopes.get}
          multiple
          portal={false}
          onValueChange={(scope) => context.scopes.set(scope)}
          label={"Legg til flere API-tilganger (frivillig)"}
        >
          <Combobox.Empty>
            Fant ingen scopes
          </Combobox.Empty>
          {selectableScopes().map((scope) => (
            <Combobox.Option
              value={scope.value}
              key={scope.value}
              description={scope.public ? "Offentlig tilgang" : ""}
            >
              {scope.label}
            </Combobox.Option>
          ))}
        </Combobox>
      </div>

      <div className={styles.required}>
        <Textfield
          label={"Hva skal du bruke integrasjonen til?"}
          required
          value={context.description.get}
          placeholder={"Beskrivelse"}
          onChange={(e) => context.description.set(e.target.value)}
        />
      </div>
    </>
  );
};

export default Step1;
