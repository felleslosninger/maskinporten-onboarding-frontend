import React, {RefObject, useState} from "react";
import {Button, Textfield, Modal} from "@digdir/design-system-react";
import styles from "./styles.module.scss";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";

interface Props {
  title: string;
  confirmText: string;
  onConfirm: () => void;
}

const ConfirmAlert = React.forwardRef<HTMLDialogElement, Props>((props, ref) => {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string>();
  const modalRef = ref as RefObject<HTMLDialogElement>;

  if (!ref) {
    return null;
  }

  const validateAndConfirm = () => {
    if (text !== props.confirmText) {
      setError("Inntastet tekst er ikke korrekt");
      return;
    }

    props.onConfirm();
    modalRef.current?.close();
  };

  return (
    <Modal ref={ref} onInteractOutside={() => modalRef.current?.close()}>
      <Modal.Header>{props.title}</Modal.Header>
      <Modal.Content className={styles.modalContent}>
        <Textfield
          label={`Fyll ut '${props.confirmText}' i boksen under for å bekrefte`}
          type={"text"}
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          error={error}
          placeholder={props.confirmText}
        />
      </Modal.Content>
      <Modal.Footer>
        <div className={styles.buttonRow}>
          <Button color={"danger"} onClick={validateAndConfirm}>
            Bekreft
            <VisuallyHidden>
              sletting
            </VisuallyHidden>
          </Button>
          <Button variant={"secondary"} onClick={() => modalRef.current?.close()}>
            Avbryt
            <VisuallyHidden>
              sletting
            </VisuallyHidden>
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
});

export default ConfirmAlert;
