import React, { ReactNode, useEffect } from "react";
import styles from "./styles.module.scss";
import { Button, Heading } from "@digdir/design-system-react";
import { XMarkIcon } from "@navikt/aksel-icons";

interface ModalProps {
  title: string;
  open: boolean;
  closeModal: () => void;
  children: ReactNode | ReactNode[];
  className?: string;
}

function Modal(props: ModalProps) {
  useEffect(() => {
    if (props.open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [props.open]);

  // Enable scroll if modal is closed unexpectedly
  useEffect(
    () => () => {
      document.body.style.overflow = "unset";
    },
    [],
  );

  if (props.open) {
    return (
      <div className={styles.modalOverlay} tabIndex={-1} role={"dialog"} onClick={props.closeModal} aria-hidden={true}>
        <div className={styles.modal}>
          <div className={styles.card} onClick={(e) => e.stopPropagation()}>
            <Button
              variant={"quiet"}
              onClick={props.closeModal}
              icon={<XMarkIcon />}
              className={styles.closeButton}
            />
            <div className={styles.cardHeader}>
              <Heading size={"medium"}>{props.title}</Heading>
            </div>
            <div className={`${styles.cardContent} ${props.className}`}>
              {props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default Modal;
