import React, { ReactNode, useContext } from "react";
import styles from "./styles.module.scss";
import { DropdownContext } from "./Dropdown";

interface Props {
  children: ReactNode | ReactNode[];
  className?: string;
  onSelect: () => void;
}
export const DropdownItem = (props: Props) => {
  const context = useContext(DropdownContext);

  if (!context) {
    return null;
  }

  const handleClicked = () => {
    props.onSelect();
    context.setShow(false);
  };

  return (
    <div
      className={`${props.className} ${styles.dropdownItem}`}
      onClick={handleClicked}
    >
      {props.children}
    </div>
  );
};
