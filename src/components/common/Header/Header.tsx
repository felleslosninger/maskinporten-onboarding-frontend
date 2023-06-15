import React, {useEffect, useState} from 'react';
import {useUser} from "../../../hooks/auth";
import styles from './styles.module.scss';
import Logo from '../../../assets/logo.svg';
import {Link} from "react-router-dom";
import {ReactComponent as BedriftSvg} from '../../../assets/ikoner/SVG/Næringsliv.svg';
import {ReactComponent as PersonSvg} from '../../../assets/ikoner/SVG/Person.svg';
import {getCookie} from "typescript-cookie";
import jwt_decode from "jwt-decode";
import {IdToken} from "../../../types/tokens";
import {Button, Label} from "@digdir/design-system-react";
import {login} from "../../auth/login";

function Header() {
    const { data, isLoading } = useUser();

    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <img src={Logo} alt={"Logo"} className={styles.logo} />
                {!isLoading && data!!.isAuthenticated ?
                    <div className={styles.userInfo}>
                        <Label>
                            {data!!.user!!.name} for {data!!.user!!.authorization_details[0].reportees[0].Name}
                        </Label>
                        <BedriftSvg className={styles.loginSvg} />
                    </div>
                    :
                    <Button onClick={login}>
                        <Label size={"medium"}>
                            LOGG INN
                        </Label>
                        <PersonSvg className={styles.loginSvg} />
                    </Button>
                }
            </div>
        </header>
    )
}

export default Header;