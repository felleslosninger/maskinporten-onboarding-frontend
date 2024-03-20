import React, { useEffect, useState } from "react";
import {
  Accordion,
  Heading,
  Ingress,
  ToggleGroup,
  Paragraph,
} from "@digdir/designsystemet-react";
import withAuth, { AuthProps } from "../auth/withAuth";
import { useClients, usePublicScopes, useScopes } from "../../hooks/api";
import styles from "./styles.module.scss";
import ScopeDetails from "./ScopeDetails/ScopeDetails";
import ContentContainer from "../common/ContentContainer/ContentContainer";
import OnboardingCard from "./OnboardingCard/OnboardingCard";
import { useQueryClient } from "@tanstack/react-query";
import ScopeSkeleton from "./ScopeSkeleton";
import PublicScopes from "./PublicScopes/PublicScopes";
import NoScopesImage from "../../assets/noScopes.png";
import { ApiScopes } from "../../types/api";
import { Helmet } from "react-helmet-async";

function Dashboard({ user, config }: AuthProps) {
  const queryClient = useQueryClient();
  const [env, setEnv] = useState(Object.keys(config)[0]);
  const [publicScopeList, setPublicScopeList] = useState<string[]>([]);
  const [renderedScopes, setRenderedScopes] = useState<ApiScopes>([]);
  const { data: publicScopes, isLoading: isPublicScopesLoading } =
    usePublicScopes(env);
  const {
    data: scopesData,
    isLoading: isScopesLoading,
    isError: isScopesError,
  } = useScopes(env);
  const {
    data: clientsData,
    isLoading: isClientsLoading,
    isError: isClientsError,
  } = useClients(env, !!scopesData);
  const isLoading =
    isScopesLoading || isClientsLoading || isPublicScopesLoading;
  const isError = isScopesError || isClientsError;

  useEffect(() => {
    const list: string[] = [];
    !isLoading &&
      !isError &&
      clientsData!!.forEach((client) => {
        client.scopes.forEach((clientScope) => {
          if (!scopesData!!.some((scope) => scope.scope === clientScope)) {
            list.push(clientScope);
          }
        });
        setPublicScopeList(list);
      });
  }, [clientsData, isLoading, scopesData, isError]);

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
        <Helmet>
          <title>Oversikt | Forenklet Onboarding</title>
        </Helmet>
        <div className={styles.infoContainer}>
          <Heading size={"large"}>API-tilganger i Maskinporten</Heading>
          <Ingress>
            Her kan du se API-tilganger gitt til {user.reporteeName}
          </Ingress>
          <OnboardingCard />
        </div>

        <div className={styles.accordionListHeader}>
          <Heading level={2} size={"small"}>
            Mine tilganger
          </Heading>
          <div className={styles.envPicker}>
            <Paragraph>Valgt miljø:</Paragraph>
            <ToggleGroup
              size={"small"}
              onChange={onEnvChanged}
              value={env}
            >
              {Object.keys(config).map((env) => (
                <ToggleGroup.Item value={env} key={env}>
                  {env.toUpperCase()}
                </ToggleGroup.Item>
              ))}
            </ToggleGroup>
          </div>
        </div>
        {!isLoading &&
          ((renderedScopes && renderedScopes.length === 0) || isError) && (
            <div className={styles.noScopesBox}>
              <img
                src={NoScopesImage}
                className={styles.noScopesImage}
                alt={"Ingen tilgjengelige tilganger"}
              />
              <span className={styles.noScopesHeader}>Ingen tilganger her</span>
              <span className={styles.noScopesText}>
                Når organisasjonen din får tilgang til noe i maskinporten,
                dukker det opp her.
              </span>
            </div>
          )}
        {isLoading && (
          <Accordion color={"neutral"} role={"status"}>
            <ScopeSkeleton />
            <ScopeSkeleton />
          </Accordion>
        )}
        {!isLoading && !isError && clientsData && scopesData && (
          <Accordion color={"neutral"}>
            {renderedScopes.map((scope) => (
              <ScopeDetails
                scope={scope}
                clients={clientsData}
                env={env}
                key={scope.scope}
              />
            ))}
          </Accordion>
        )}
        {publicScopes && (
          <PublicScopes scopeList={publicScopes} resultsPerPage={5} env={env} />
        )}
      </ContentContainer>
    </>
  );
}

export default withAuth(Dashboard);
