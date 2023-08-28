import React, { ReactNode, useContext } from "react";
import { DropdownContext } from "./Dropdown";
import styles from "./styles.module.scss";

interface Props {
  children: ReactNode | ReactNode[];
}

export const DropdownTrigger = (props: Props) => {
  const context = useContext(DropdownContext);

  // Assert dropdown is used in Dropdown component
  if (context === null) {
    return null;
  }

  return (
    <div
      className={styles.dropdownTrigger}
      onClick={() => context.setShow(!context.show)}
    >
      {props.children}
    </div>
  );
};
