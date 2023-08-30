import React, { useState } from "react";
import Modal from "../Modal/Modal";
import { Button, TextField } from "@digdir/design-system-react";
import styles from "./styles.module.scss";

interface Props {
  title: string;
  open: boolean;
  confirmText: string;
  closeModal: () => void;
  onConfirm: () => void;
}

function ConfirmAlert(props: Props) {
  const textRef = React.createRef<HTMLInputElement>();
  const [inputError, setInputError] = useState(false);

  const validateAndConfirm = () => {
    if (!textRef.current || !(textRef.current.value === props.confirmText)) {
      setInputError(true);
      return;
    }

    props.onConfirm();
    props.closeModal();
  };

  return (
    <Modal title={props.title} open={props.open} closeModal={props.closeModal}>
      <TextField
        label={"Fyll ut boksen under for å bekrefte"}
        ref={textRef}
        isValid={!inputError}
        placeholder={props.confirmText}
      />
      <div className={styles.buttonRow}>
        <Button color={"danger"} onClick={validateAndConfirm}>
          Bekreft
        </Button>
        <Button variant={"outline"} onClick={props.closeModal}>
          Avbryt
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmAlert;
