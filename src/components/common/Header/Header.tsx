import React, {createRef, useRef, useState} from "react";
import { useUser } from "../../../hooks/auth";
import styles from "./styles.module.scss";
import { ReactComponent as Logo } from "../../../assets/logo.svg";
import { ReactComponent as BedriftSvg } from "../../../assets/bedrift.svg";
import { ReactComponent as PersonSvg } from "../../../assets/ikoner/SVG/Person.svg";
import {Button, DropdownMenu, Label, Paragraph} from "@digdir/design-system-react";
import { login, logout } from "../../auth/login";
import StyledLink from "../StyledLink/StyledLink";
import {useLocation, useNavigate} from "react-router-dom";
import { Dropdown } from "../Dropdown";
import {ChevronRightIcon, LeaveIcon, MenuHamburgerIcon, XMarkIcon} from "@navikt/aksel-icons";
import {useMediaQuery} from "react-responsive";

function Header() {
  const menuRef = useRef(null);
  const { data, isLoading } = useUser();
  const [open, setOpen] = useState(false);
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

          <Button
            ref={menuRef}
            className={styles.userInfo}
            variant={"tertiary"}
            aria-haspopup='menu'
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {!isSmallScreen && isLoggedIn && (
              <>
                <div>
                  <Paragraph size={"small"}>{data!!.user!!.name}</Paragraph>
                  <Paragraph size={"small"}>{data!!.user!!.reporteeName}</Paragraph>
                </div>
                <BedriftSvg className={styles.svg} />
              </>
            )}

            {!isSmallScreen && !isLoggedIn && (
              <>
                <Paragraph size={"medium"}>LOGG INN</Paragraph>
                <PersonSvg className={styles.svg} />
              </>
            )}

            {isSmallScreen && (
              <div className={styles.smallMenuButton}>
                {open ? <XMarkIcon /> : <MenuHamburgerIcon />}
                <Label>Meny</Label>
              </div>

            )}
          </Button>

          <DropdownMenu
            anchorEl={menuRef.current}
            placement={"bottom-end"}
            open={open}
            onClose={() => setOpen(false)}
          >
              {isSmallScreen && (
                <>
                  <DropdownMenu.Item
                    as={"a"}
                    href={isLoggedIn ? "/dashboard" : "/"}
                    icon={<ChevronRightIcon />}
                  >
                    {isLoggedIn ? "oversikt" : "hjem"}
                  </DropdownMenu.Item>

                  <DropdownMenu.Item
                    as={"a"}
                    href={"/guide"}
                    icon={<ChevronRightIcon />}
                  >
                    onboardingsguide
                  </DropdownMenu.Item>

                  <DropdownMenu.Item
                    as={"a"}
                    href={"/terms"}
                    icon={<ChevronRightIcon />}
                  >
                    vilkår
                  </DropdownMenu.Item>
                </>
              )}

              {isLoggedIn && (
                <DropdownMenu.Item className={styles.logoutLabel} onClick={logout}>
                  Logg ut
                  <LeaveIcon className={styles.svg} />
                </DropdownMenu.Item>
              )}

              {!isLoggedIn && (
                <>
                  <DropdownMenu.Item className={styles.loginLabel} onClick={() => login(true)}>
                    <Paragraph size={"medium"}>{isSmallScreen ? "Logg inn" : "..."} som daglig leder</Paragraph>
                    <ChevronRightIcon className={styles.svg} />
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className={styles.loginLabel} onClick={() => login(false)}>
                    <Paragraph size={"medium"}>{isSmallScreen ? "Logg inn" : "..."} med enkelttjeneste-tilgang</Paragraph>
                    <ChevronRightIcon className={styles.svg} />
                  </DropdownMenu.Item>
                </>
              )}
          </DropdownMenu>
        </>
      </div>
    </header>
  );
}

export default Header;
