import React, { useEffect } from "react";
import "./Header.css";
import logo from "./bike.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = ({ admin, setAdmin }) => {
  useEffect(() => {
    const loggedIn = localStorage.getItem("admin");
    if (loggedIn) {
      setAdmin(loggedIn);
    }
  }, [setAdmin]);
  
  const handleClick = () => {
    setAdmin(!admin);
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="prime" variant="light">
        <Container>
          <Link className="logoLink" to={"/"}>
            <div className="size">
              <img width={60} height={30} src={logo} alt="bike" />
              ВЕЛОкат
            </div>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              {admin && (
                <>
                  <Link className="link" to={"/cases"}>
                    <li>Все кражи</li>
                  </Link>
                  <Link className="link" to={"/officers"}>
                    <li>Все сотрудники</li>
                  </Link>
                </>
              )}
              {(!admin && (
                <>
                  <Link className="link" to={"/public/report"}>
                    <li>Сообщить о краже</li>
                  </Link>
                  <Link className="link" to={"/auth/sign_up"}>
                    <li>Зарегистрироваться</li>
                  </Link>
                  <Link className="link" to={"/auth/sign_in"}>
                    <li>Войти</li>
                  </Link>
                </>
              )) || (
                <>
                  <Link className="link" to={"/"}>
                    <li onClick={handleClick}>Выйти</li>
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;