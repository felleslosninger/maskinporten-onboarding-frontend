import React from "react";
import SkjemaContainer from "../common/SkjemaContainer/SkjemaContainer";
import {Heading, Ingress} from "@digdir/design-system-react";
import withAuth, {AuthProps} from "../auth/withAuth";
import {useClients, useScopes} from "../../hooks/api";
import styles from './styles.module.scss';
import ScopeDetails from "./ScopeDetails/ScopeDetails";

function Dashboard({ id }: AuthProps) {
    const { data: scopesData, isLoading: isScopesLoading } = useScopes();
    const { data: clientsData, isLoading: isClientsLoading } = useClients();

    return (
        <SkjemaContainer header={"Tilgjengelige Scopes i Maskinporten"} category={"Oversikt"}>
            <Heading size={"medium"}>
                Scopes tildelt {id.authorization_details[0].reportees[0].Name}
            </Heading>
            <Ingress>
                Her kan du se alle scopes som er tildelt {id.authorization_details[0].reportees[0].Name}
            </Ingress>

            <div className={styles.accordionListHeader}>
                <Heading size={"medium"}>
                    APIer
                </Heading>
            </div>
            {
                clientsData &&
                scopesData &&
                scopesData.map(scope => <ScopeDetails scope={scope} clients={clientsData} />)
            }
        </SkjemaContainer>
    )
}

export default withAuth(Dashboard);