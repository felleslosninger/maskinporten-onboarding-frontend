import React, { createContext, ReactNode, useState } from "react";
import styles from "./styles.module.scss";

interface Props {
  children: ReactNode | ReactNode[];
}

export type DropdownContextProps = {
  show: boolean;
  setShow: (val: boolean) => void;
};

export const DropdownContext = createContext<DropdownContextProps | null>(null);

export const Dropdown = ({ children }: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <DropdownContext.Provider
      value={{
        show: showDropdown,
        setShow: (val) => setShowDropdown(val),
      }}
    >
      <div className={styles.dropdown}>{children}</div>
    </DropdownContext.Provider>
  );
};
