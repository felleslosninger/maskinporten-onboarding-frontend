import React from "react";


interface Props {
    onSelect: () => void;
}
export const DropdownItem = (props: Props) => {

    return (
        <div onClick={props.onSelect}>

        </div>
    )
};