import React, {createRef, ReactNode, useEffect} from "react";
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
  const modalRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (props.open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    }
  }, [props.open]);

  // Very ugly code to trap focus within Modal for accesibility
  useEffect(() => {
    if (props.open) {
      const modalElement = modalRef.current;

      if (!modalElement) {
        return;
      }

      const focusableElements = modalElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0] as HTMLElement;
      const secondLastElement = focusableElements[focusableElements.length - 2] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      firstElement.focus();

      const handleKeyPress = (event: KeyboardEvent) => {
        switch (event.key) {
          case "Tab":
            if (event.shiftKey && document.activeElement === firstElement) {
              event.preventDefault();
              lastElement instanceof HTMLButtonElement && lastElement.disabled
                ? secondLastElement.focus()
                : lastElement.focus();
            } else if (
              !event.shiftKey &&
              (document.activeElement === lastElement || (document.activeElement === secondLastElement && lastElement instanceof HTMLButtonElement && lastElement.disabled))
            ) {
              event.preventDefault();
              firstElement.focus();
            }
            break;
          case "Escape":
            props.closeModal();
            break;
        }
      };
      modalElement.addEventListener("keydown", handleKeyPress);

      return () => {
        modalElement.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, [props.open, props.title]);

  if (props.open) {
    return (
      <div className={styles.modalOverlay} role={"dialog"} onClick={props.closeModal} aria-hidden={true}>
        <div className={styles.modal} ref={modalRef}>
          <div className={styles.card} onClick={(e) => e.stopPropagation()}>
            <Button
              variant={"tertiary"}
              onClick={props.closeModal}
              icon={<XMarkIcon />}
              title={"Lukk modal"}
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
