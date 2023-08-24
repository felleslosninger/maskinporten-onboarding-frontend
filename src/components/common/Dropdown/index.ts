import { Dropdown as DropdownParent } from "./Dropdown";
import { DropdownItem } from "./DropdownItem";
import { DropdownTrigger } from "./DropdownTrigger";
import { DropdownMenu } from "./DropdownMenu";

type DropdownComponent =  typeof DropdownParent & {
    Item: typeof DropdownItem;
    Trigger: typeof DropdownTrigger;
    Menu: typeof DropdownMenu;
};

const Dropdown = DropdownParent as DropdownComponent;

Dropdown.Item = DropdownItem;
Dropdown.Trigger = DropdownTrigger;
Dropdown.Menu = DropdownMenu;

export { Dropdown };