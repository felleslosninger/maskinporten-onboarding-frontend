import React, { useState } from "react";
import { useUser } from "../../../hooks/auth";
import styles from "./styles.module.scss";
import { ReactComponent as Logo } from "../../../assets/logo.svg";
import { ReactComponent as BedriftSvg } from "../../../assets/bedrift.svg";
import { ReactComponent as PersonSvg } from "../../../assets/ikoner/SVG/Person.svg";
import {
  Button,
  DropdownMenu,
  Label,
  Paragraph,
} from "@digdir/designsystemet-react";
import { login, logout } from "../../auth/login";
import StyledLink from "../StyledLink/StyledLink";
import { useLocation } from "react-router-dom";
import {
  ChevronRightIcon, EnterIcon,
  LeaveIcon,
  MenuHamburgerIcon,
  XMarkIcon,
} from "@navikt/aksel-icons";
import { useMediaQuery } from "react-responsive";

function Header() {
  const { data, isLoading } = useUser();
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });
  const location = useLocation();
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

          {!isLoggedIn && (
            <Button
              className={styles.userInfo}
              variant={"tertiary"}
              onClick={login}
            >

            </Button>
          )}

          <DropdownMenu
            placement={"bottom-end"}
            open={open}
            onClose={() => setOpen(false)}
          >
            <DropdownMenu.Trigger
              className={styles.userInfo}
              variant={"tertiary"}
              onClick={(isLoggedIn || isSmallScreen) ? () => setOpen(!open) : login}
            >
              {!isSmallScreen && !isLoggedIn && (
                <>
                  <Paragraph size={"medium"}>LOGG INN</Paragraph>
                  <PersonSvg className={styles.svg} />
                </>
              )}

              {!isSmallScreen && isLoggedIn && (
                <>
                  <div>
                    <Paragraph size={"small"}>{data!!.user!!.name}</Paragraph>
                    <Paragraph size={"small"}>
                      {data!!.user!!.reporteeName}
                    </Paragraph>
                  </div>
                  <BedriftSvg className={styles.svg} />
                </>
              )}

              {isSmallScreen && (
                <div className={styles.smallMenuButton}>
                  {open ? <XMarkIcon /> : <MenuHamburgerIcon />}
                  <Label>Meny</Label>
                </div>
              )}
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              {isSmallScreen && (
                <>
                  <DropdownMenu.Item asChild className={styles.dropdownItem}>
                    <a href={isLoggedIn ? "/dashboard" : "/"}>
                      {isLoggedIn ? "oversikt" : "hjem"}
                      <ChevronRightIcon />
                    </a>
                  </DropdownMenu.Item>

                  <DropdownMenu.Item asChild className={styles.dropdownItem}>
                    <a href={"/guide"}>
                      onboardingsguide
                      <ChevronRightIcon />
                    </a>
                  </DropdownMenu.Item>

                  <DropdownMenu.Item asChild className={styles.dropdownItem}>
                    <a href={"/terms"}>
                      vilkår
                      <ChevronRightIcon />
                    </a>
                  </DropdownMenu.Item>
                </>
              )}

              {isLoggedIn && (
                <DropdownMenu.Item
                  className={styles.logoutLabel}
                  onClick={logout}
                >
                  Logg ut
                  <LeaveIcon className={styles.svg} />
              </DropdownMenu.Item>
              )}

              {!isLoggedIn && (
                <DropdownMenu.Item onClick={login} className={styles.dropdownItem}>
                  Logg inn
                  <EnterIcon className={styles.svg} />
                </DropdownMenu.Item>
              )}
            </DropdownMenu.Content>
          </DropdownMenu>
        </>
      </div>
    </header>
  );
}

export default Header;
