import React, {ReactNode} from "react";

interface Props {
    show: boolean;
    children: ReactNode | ReactNode[];
}

export const Dropdown = ({children, show}: Props) => {
    if (show) {
        return (
            <div>
                {children}
            </div>
        );
    }

    return null;
};

