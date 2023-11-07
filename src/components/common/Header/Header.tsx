import React from "react";
import { useUser } from "../../../hooks/auth";
import styles from "./styles.module.scss";
import { ReactComponent as Logo } from "../../../assets/logo.svg";
import { ReactComponent as BedriftSvg } from "../../../assets/bedrift.svg";
import { ReactComponent as PersonSvg } from "../../../assets/ikoner/SVG/Person.svg";
import { Button, Label } from "@digdir/design-system-react";
import { login, logout } from "../../auth/login";
import StyledLink from "../StyledLink/StyledLink";
import {useLocation, useNavigate} from "react-router-dom";
import { Dropdown } from "../Dropdown";
import {ChevronRightIcon, LeaveIcon, MenuHamburgerIcon} from "@navikt/aksel-icons";
import {useMediaQuery} from "react-responsive";

function Header() {
  const { data, isLoading } = useUser();
  const isSmallScreen = useMediaQuery({query: '(max-width: 767px)'});
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !isLoading && data!!.isAuthenticated;

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Logo className={styles.logo} />
        <>
          <div className={styles.headerLinks}>
            {isLoggedIn ? (
              <StyledLink
                to={"/dashboard"}
                className={
                  location.pathname === "/dashboard"
                    ? styles.active
                    : styles.inactive
                }
                ariaLabel={"Gå til oversikt"}
              >
                oversikt
              </StyledLink>
            ) : (
              <StyledLink
                to={"/"}
                className={
                  location.pathname === "/" ? styles.active : styles.inactive
                }
                ariaLabel={"Gå til hjemside"}
              >
                hjem
              </StyledLink>
            )}
            <StyledLink
              to={"/guide"}
              className={
                location.pathname === "/guide" ? styles.active : styles.inactive
              }
              ariaLabel={"Gå til Guiden"}
            >
              onboardingsguide
            </StyledLink>
            <StyledLink
              to={"/terms"}
              className={
                location.pathname === "/terms" ? styles.active : styles.inactive
              }
            >
              vilkår
            </StyledLink>
          </div>
          <Dropdown>
            <Dropdown.Trigger>
              <Button className={styles.userInfo} variant={"tertiary"}>
                {!isSmallScreen && isLoggedIn && (
                  <>
                    <div>
                      <Label size={"small"}>{data!!.user!!.name}</Label>
                      <Label size={"small"}>{data!!.user!!.reporteeName}</Label>
                    </div>
                    <BedriftSvg className={styles.svg} />
                  </>
                )}

                {!isSmallScreen && !isLoggedIn && (
                  <>
                    <Label size={"medium"}>LOGG INN</Label>
                    <PersonSvg className={styles.svg} />
                  </>
                )}

                {isSmallScreen && (
                  <MenuHamburgerIcon className={styles.svg} />
                )}
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              {isSmallScreen && (
                <>
                  {isLoggedIn && (
                    <Dropdown.Item onSelect={() => navigate("/dashboard")}>
                      oversikt
                      <ChevronRightIcon className={styles.svg} />
                    </Dropdown.Item>
                  )}

                  {!isLoggedIn && (
                    <Dropdown.Item onSelect={() => navigate("/")}>
                      hjem
                      <ChevronRightIcon className={styles.svg} />
                    </Dropdown.Item>
                  )}

                  <Dropdown.Item onSelect={() => navigate("/guide")}>
                    onboardingsguide
                    <ChevronRightIcon className={styles.svg} />
                  </Dropdown.Item>
                  <Dropdown.Item className={styles.menuLink} onSelect={() => navigate("/terms")}>
                    vilkår
                    <ChevronRightIcon className={styles.svg} />
                  </Dropdown.Item>
                </>
              )}

              {isLoggedIn && (
                <Dropdown.Item className={styles.logoutLabel} onSelect={logout}>
                  Logg ut
                  <LeaveIcon className={styles.svg} />
                </Dropdown.Item>
              )}

              {!isLoggedIn && (
                <>
                  <Dropdown.Item className={styles.loginLabel} onSelect={() => login(true)}>
                    <Label size={"medium"}>{isSmallScreen ? "Logg inn" : "..."} som daglig leder</Label>
                    <ChevronRightIcon className={styles.svg} />
                  </Dropdown.Item>
                  <Dropdown.Item className={styles.loginLabel} onSelect={() => login(false)}>
                    <Label size={"medium"}>{isSmallScreen ? "Logg inn" : "..."} med enkelttjeneste-tilgang</Label>
                    <ChevronRightIcon className={styles.svg} />
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </>
      </div>
    </header>
  );
}

export default Header;
