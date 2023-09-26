import React, { useEffect, useState } from "react";
import {
  Accordion,
  Heading,
  Ingress,
  Label,
  ToggleButtonGroup,
} from "@digdir/design-system-react";
import withAuth, { AuthProps } from "../auth/withAuth";
import { useClients, usePublicScopes, useScopes } from "../../hooks/api";
import styles from "./styles.module.scss";
import ScopeDetails from "./ScopeDetails/ScopeDetails";
import ContentContainer from "../common/ContentContainer/ContentContainer";
import OnboardingCard from "../common/OnboardingCard/OnboardingCard";
import { useQueryClient } from "@tanstack/react-query";
import ScopeSkeleton from "./ScopeSkeleton";
import PublicScopes from "./PublicScopes/PublicScopes";
import NoScopesImage from "../../assets/noScopes.png";
import { ApiScopes } from "../../types/api";

function Dashboard({ user, config }: AuthProps) {
  const queryClient = useQueryClient();
  const [minLoadtimeOver, setMinLoadtimeOver] = useState(false);
  const [env, setEnv] = useState(Object.keys(config)[0]);
  const [publicScopeList, setPublicScopeList] = useState<string[]>([]);
  const [renderedScopes, setRenderedScopes] = useState<ApiScopes>([]);
  const { data: publicScopes, isLoading: isPublicScopesLoading } = usePublicScopes(env);
  const {
    data: scopesData,
    isLoading: isScopesLoading,
    isError: isScopesError,
  } = useScopes(env);
  const {
    data: clientsData,
    isLoading: isClientsLoading,
    isError: isClientsError,
  } = useClients(env);
  const isLoading = isScopesLoading || isClientsLoading || isPublicScopesLoading || !minLoadtimeOver;
  const isError = isScopesError || isClientsError;

  setTimeout(() => setMinLoadtimeOver(true), 600);

  useEffect(() => {
    const list: string[] = [];
    !isLoading && !isError &&
      clientsData!!.forEach((client) => {
        client.scopes.forEach((clientScope) => {
          if (!scopesData!!.some((scope) => scope.scope === clientScope)) {
            list.push(clientScope);
          }
        });
        setPublicScopeList(list);
      });
  }, [clientsData, isLoading, scopesData]);

  useEffect(() => {
    const publicScopess =
      publicScopes?.filter((scope) => publicScopeList.includes(scope.scope)) ||
      [];
    const privateScopes = scopesData || [];
    setRenderedScopes(privateScopes.concat(publicScopess));
  }, [publicScopes, scopesData, publicScopeList]);

  const onEnvChanged = (env: string) => {
    setEnv(env);
    queryClient.clear();
  };

  return (
    <>
      <ContentContainer>
        <div className={styles.infoContainer}>
          <Heading size={"large"}>API-tilganger i Maskinporten</Heading>
          <Ingress>
            Her kan du se API-tilganger gitt til {user.reporteeName}
          </Ingress>
          <OnboardingCard />
        </div>

        <div className={styles.accordionListHeader}>
          <Heading size={"small"}>Mine tilganger</Heading>
          <div className={styles.envPicker}>
            <Label>Valgt miljø:</Label>
            <ToggleButtonGroup
              items={Object.keys(config).map((env) => ({
                label: env.toUpperCase(),
                value: env,
              }))}
              onChange={onEnvChanged}
              selectedValue={env}
            />
          </div>
        </div>
        <Accordion color={"neutral"}>
          {isLoading && (
            <>
              <ScopeSkeleton />
              <ScopeSkeleton />
            </>
          )}
          {!isLoading &&
            ((renderedScopes && renderedScopes.length === 0) || isError) && (
              <div className={styles.noScopesBox}>
                <img src={NoScopesImage} className={styles.noScopesImage} alt={"Ingen tilgjengelige tilganger"}/>
                <span className={styles.noScopesHeader}>
                  Ingen tilganger her
                </span>
                <span className={styles.noScopesText}>
                    Når organisasjonen din får tilgang til noe i maskinporten, dukker det opp her.
                </span>
              </div>
            )}
          {!isLoading &&
            clientsData &&
            scopesData &&
            renderedScopes.map((scope) => (
              <ScopeDetails
                scope={scope}
                clients={clientsData}
                env={env}
                key={scope.scope}
              />
            ))}
        </Accordion>
        {publicScopes && (
          <PublicScopes scopeList={publicScopes} resultsPerPage={5} env={env} />
        )}
      </ContentContainer>
    </>
  );
}

export default withAuth(Dashboard);
