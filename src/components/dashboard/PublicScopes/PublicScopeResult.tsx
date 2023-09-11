import React, {useState} from "react";
import {ApiPublicScope} from "../../../types/api";
import NewClientModal from "../NewClientModal/NewClientModal";
import {Button} from "@digdir/design-system-react";
import styles from "./styles.module.scss";
import {PlusIcon} from "@navikt/aksel-icons";

interface Props {
    scope: ApiPublicScope;
    env: string;
}

function PublicScopeResult(props: Props) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <NewClientModal env={props.env}
                            scope={props.scope.name}
                            open={showModal}
                            closeModal={() => setShowModal(false)}
            />
            <div className={styles.result}>
                <div className={styles.resultsInfo}>
                    <strong>{props.scope.name}</strong>
                    <span>{props.scope.description}</span>
                </div>
                <Button onClick={() => setShowModal(true)}>
                    <PlusIcon />
                    Ny integrasjon
                </Button>
            </div>
        </>
    );
}

export default PublicScopeResult;