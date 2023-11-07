import React, { useState } from "react";
import Modal from "../Modal/Modal";
import { Button, Textfield } from "@digdir/design-system-react";
import styles from "./styles.module.scss";

interface Props {
  title: string;
  open: boolean;
  confirmText: string;
  closeModal: () => void;
  onConfirm: () => void;
}

function ConfirmAlert(props: Props) {
  const [text, setText] = useState<string>();
  const [error, setError] = useState(false);

  const validateAndConfirm = () => {
    if (!text || !(text === props.confirmText)) {
      setError(true);
      return;
    }

    props.onConfirm();
    props.closeModal();
  };

  return (
    <Modal title={props.title} open={props.open} closeModal={props.closeModal}>
      <Textfield
        label={"Fyll ut boksen under for å bekrefte"}
        type={"text"}
        value={text}
        onChange={(e) => setText(e.target.value)}
        error={error}
        placeholder={props.confirmText}
      />
      <div className={styles.buttonRow}>
        <Button color={"danger"} onClick={validateAndConfirm}>
          Bekreft
        </Button>
        <Button variant={"tertiary"} onClick={props.closeModal}>
          Avbryt
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmAlert;
