import React, { createRef, ReactNode, useContext, useEffect } from "react";
import { DropdownContext } from "./Dropdown";
import styles from "./styles.module.scss";

interface Props {
  children: ReactNode | ReactNode[];
}

export const DropdownMenu = (props: Props) => {
  const context = useContext(DropdownContext);
  const menuRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (context) {
      const handleOutsideClick = (e: Event) => {
        if (
          context.show &&
          menuRef.current &&
          !menuRef.current.contains(e.target as Node)
        ) {
          context.setShow(false);
        }
      };

      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }
  }, [context, context?.show, menuRef]);

  if (!context) {
    return null;
  }

  if (context.show) {
    return (
      <div className={styles.dropdownMenu} ref={menuRef}>
        {props.children}
      </div>
    );
  }

  return null;
};
