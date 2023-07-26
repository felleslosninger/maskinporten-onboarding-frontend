import React, {useState} from "react";
import {Accordion, Heading, Ingress, Label} from "@digdir/design-system-react";
import withAuth, {AuthProps} from "../auth/withAuth";
import {useClients, useScopes} from "../../hooks/api";
import styles from './styles.module.scss';
import ScopeDetails from "./ScopeDetails/ScopeDetails";
import ContentContainer from "../common/ContentContainer/ContentContainer";
import OnboardingCard from "./OnboardingCard/OnboardingCard";

function Dashboard({ id }: AuthProps) {
    const { data: scopesData, isLoading: isScopesLoading } = useScopes();
    const { data: clientsData, isLoading: isClientsLoading } = useClients();
    const [minLoadtimeOver, setMinLoadtimeOver] = useState(false);
    const [env, setEnv] = useState("test");
    const isLoading = isScopesLoading || isClientsLoading || !minLoadtimeOver;

    setTimeout(() => setMinLoadtimeOver(true), 1000);

    return (
        <ContentContainer>
            <div className={styles.infoContainer} >
                <Heading size={"large"}>
                    API tilganger i Maskinporten
                </Heading>
                <Ingress>
                    Her kan du se alle tilganger gitt til {id.authorization_details[0].reportees[0].Name}
                </Ingress>
                <OnboardingCard />
            </div>

            <div className={styles.accordionListHeader}>
                <Heading size={"small"}>
                    API tilganger
                </Heading>
                <div className={styles.envPicker}>
                    <Label>
                        Valgt miljø:
                    </Label>
                    <div className={styles.picker}>
                        <button className={`${env === "test" ? styles.active : ""}`} onClick={() => setEnv("test")}>
                            TEST
                        </button>
                        <button className={`${env === "prod" ? styles.active : ""}`} onClick={() => setEnv("prod")}>
                            PROD
                        </button>
                    </div>
                </div>
            </div>
            <Accordion color={"neutral"}>
                {
                    isLoading &&
                    <>
                        <span className={styles.skeleton} />
                        <span className={styles.skeleton} />
                    </>

                }
                {
                    !isLoading &&
                    clientsData &&
                    scopesData &&
                    scopesData.map(scope => <ScopeDetails scope={scope} clients={clientsData} env={env} key={scope.scope} />)
                }
            </Accordion>
        </ContentContainer>
    )
}

export default withAuth(Dashboard);