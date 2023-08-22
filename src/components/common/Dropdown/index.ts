import { Dropdown as DropdownParent } from "./Dropdown";
import { DropdownItem } from "./DropdownItem";

type DropdownComponent =  typeof DropdownParent & {
    Item: typeof DropdownItem;
};

const Dropdown = DropdownParent as DropdownComponent;

Dropdown.Item = DropdownItem;

export { Dropdown };