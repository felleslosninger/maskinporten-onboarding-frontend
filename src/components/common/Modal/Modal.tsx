import React, {ReactNode} from "react";
import styles from './styles.module.scss';
import SkjemaContainer from "../SkjemaContainer/SkjemaContainer";

interface ModalProps {
    title: string;
    open: boolean;
    closeModal: () => void;
    children: ReactNode | ReactNode[];
}

function Modal(props: ModalProps) {

    return (
        <div className={`${props.open ? styles.open : styles.closed}`}>
            <SkjemaContainer header={props.title} category={""}>
                {props.children}
            </SkjemaContainer>
        </div>
    );
}

export default Modal;