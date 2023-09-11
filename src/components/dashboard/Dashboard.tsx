import React, {useEffect, useState} from "react";
import {
  Accordion,
  Heading,
  Ingress,
  Label, ToggleButtonGroup,
} from "@digdir/design-system-react";
import withAuth, { AuthProps } from "../auth/withAuth";
import {useClients, usePublicScopes, useScopes} from "../../hooks/api";
import styles from "./styles.module.scss";
import ScopeDetails from "./ScopeDetails/ScopeDetails";
import ContentContainer from "../common/ContentContainer/ContentContainer";
import OnboardingCard from "../common/OnboardingCard/OnboardingCard";
import { useQueryClient } from "@tanstack/react-query";
import ScopeSkeleton from "./ScopeSkeleton";
import PublicScopes from "./PublicScopes/PublicScopes";
import {ApiScopes} from "../../types/api";

function Dashboard({ user, config }: AuthProps) {
  const queryClient = useQueryClient();
  const [minLoadtimeOver, setMinLoadtimeOver] = useState(false);
  const [env, setEnv] = useState(Object.keys(config)[0]);
  const [tab, setTab] = useState(1);
  const [publicScopeList, setPublicScopeList] = useState<string[]>([]);
  const [renderedScopes, setRenderedScopes] = useState<ApiScopes>([]);
  const {
    data: publicScopes,
    isLoading: isPublicScopesLoading,
    isError: isPublicScopesError,
  } = usePublicScopes(env);
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
  const isLoading = (tab === 1 ? isScopesLoading : isPublicScopesLoading) || isClientsLoading || !minLoadtimeOver;
  const isError = (tab === 1 ? isScopesError : isPublicScopesError) || isClientsError;

  setTimeout(() => setMinLoadtimeOver(true), 600);

  useEffect(() => {
    const list: string[] = [];
    !isLoading && clientsData!!.forEach(client => {
      client.scopes.forEach(clientScope => {
        if (!scopesData!!.some(scope => scope.scope === clientScope)) {
          list.push(clientScope);
        }
      });
      setPublicScopeList(list);
    });
  }, [clientsData, isLoading, scopesData]);

  useEffect(() => {
    if (isError || isLoading) { return; }
    tab === 1 ? setRenderedScopes(scopesData!!) : setRenderedScopes(publicScopes!!.filter(scope => publicScopeList.includes(scope.scope)));
  }, [isError, isLoading, publicScopes, scopesData, tab, publicScopeList]);


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
          <div className={styles.tabs}>
            <Heading className={tab === 1 ? styles.active : styles.inactive}
                     size={"small"}
                     onClick={() => setTab(1)}
            >
              Mine tilganger
            </Heading>
            <Heading className={tab === 2 ? styles.active : styles.inactive}
                     size={"small"}
                     onClick={() => setTab(2)}
            >
              Offentlige tilganger
            </Heading>
          </div>
          <div className={styles.envPicker}>
            <Label>Valgt miljø:</Label>
            <ToggleButtonGroup
                items={Object.keys(config).map(env => ({
                  label: env.toUpperCase(),
                  value: env
                }))}
                onChange={onEnvChanged}
                selectedValue={env}
            />
          </div>
        </div>
      </ContentContainer>
      <ContentContainer className={styles.tabContent}>
        <Accordion color={"neutral"}>
          {isLoading && (
              <>
                <ScopeSkeleton />
                <ScopeSkeleton />
              </>
          )}
          {((!isLoading && scopesData && scopesData.length === 0) || isError) && (
              <div className={styles.noScopesBox}>Du har ingen scopes</div>
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
        {publicScopes && tab === 2 &&
            <PublicScopes scopeList={publicScopes} resultsPerPage={5} env={env} />
        }
      </ContentContainer>
    </>
  );
}

export default withAuth(Dashboard);
