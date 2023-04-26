import React from "react";
import "./Footer.css";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <>
      <Container fluid  className='footer'>
        <p>Велокат 2023</p>
      </Container>
    </>
  );
};

export default Footer;