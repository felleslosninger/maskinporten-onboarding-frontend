import React, {useContext} from "react";
import styles from "./styles.module.scss";
import {Select, TextField} from "@digdir/design-system-react";
import {usePublicScopes, useScopes} from "../../../hooks/api";
import {NewClientContext} from "./NewClientModal";

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
      return [{ value: props.scope, label: props.scope }];
    }

    return privateScopes
      .concat(publicScopes)
      .filter((scope) => scope.scope !== props.scope)
      .filter(scope => window.env.WHITELIST.includes(scope.scope))
      .map((scope) => ({ value: scope.scope, label: scope.scope }));
  };

  return (
    <>
      <div className={styles.infoFields}>
        <div className={styles.required}>
          <TextField
            label={"Valgt miljø:"}
            value={props.env}
            readOnly={"readonlyInfo"}
          />
        </div>
        <div className={styles.required}>
          <TextField
            label={"Valgt tilgang:"}
            value={props.scope}
            readOnly={"readonlyInfo"}
          />
        </div>
      </div>
      <div>
        <Select
          options={selectableScopes()}
          multiple
          onChange={(scope) => context.scopes.set(scope)}
          label={"Legg til flere API-tilganger (frivillig)"}
          value={context.scopes.get}
        />
      </div>

      <div className={styles.required}>
        <TextField
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