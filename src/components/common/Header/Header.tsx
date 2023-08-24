import React from 'react';
import {useUser} from "../../../hooks/auth";
import styles from './styles.module.scss';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import {ReactComponent as BedriftSvg} from '../../../assets/bedrift.svg';
import {ReactComponent as PersonSvg} from '../../../assets/ikoner/SVG/Person.svg';
import {Button, Label} from "@digdir/design-system-react";
import {login} from "../../auth/login";
import StyledLink from "../StyledLink/StyledLink";
import {useLocation} from "react-router-dom";

function Header() {
    const { data, isLoading } = useUser();
    const location = useLocation();
    const isLoggedIn = !isLoading && data!!.isAuthenticated;

    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <Logo className={styles.logo} />
                    <>
                        <div className={styles.headerLinks}>

                            {isLoggedIn ?
                                <StyledLink to={"/dashboard"}
                                            className={location.pathname === "/dashboard" ? styles.active : styles.inactive}>
                                    oversikt
                                </StyledLink>
                                :
                                <StyledLink to={"/"} className={location.pathname === "/" ? styles.active : styles.inactive}>
                                    hjem
                                </StyledLink>
                            }
                            <StyledLink to={"/guide"}
                                        className={location.pathname === "/guide" ? styles.active : styles.inactive}>
                                onboardingsguide
                            </StyledLink>
                            <StyledLink to={"/terms"}
                                        className={location.pathname === "/terms" ? styles.active : styles.inactive}>
                                vilkår
                            </StyledLink>
                        </div>
                        {isLoggedIn ?
                            <div className={styles.userInfo}>
                                <div>
                                    <Label size={"small"}>
                                        {data!!.user!!.name}
                                    </Label>
                                    <Label size={"small"}>
                                        {data!!.user!!.reporteeName}
                                    </Label>
                                </div>
                                <BedriftSvg className={styles.loginSvg} />
                            </div>
                            :
                            <Button className={styles.loginButton} variant={"quiet"} onClick={login}>
                            <Label size={"medium"}>
                                LOGG INN
                            </Label>
                                <PersonSvg className={styles.loginSvg} />
                            </Button>
                        }
                    </>
            </div>
        </header>
    )
}

export default Header;