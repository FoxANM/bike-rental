import React from "react";
import "./Main.css";
import detskiy from "./images/detskiy.jpg";
import gorniy from "./images/gorniy.jpg";
import gorodskoy from "./images/city.jpg";
import shosseiniy from "./images/shosse.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Carousel } from "react-bootstrap";

export const Main = () => {

  return (
    <>
      <Container>
        <h1>Велокат</h1>
        <p>Велосипед это простой способ перемещаться по городу. Велосипед идеален для поездок на короткие расстояния и хорошо комбинируется с другими видами транспорта. Например, можно доехать до центра города на трамвае или автомобиле, а на арендном велосипеде добраться до работы. Или совершить вечернюю велопрогулку до кафе. Вы не застрянете в пробке, будете дышать свежим воздухом и наслаждаться видами города. А двадцатиминутная поездка удовлетворит потребность организма в ежедневной физической нагрузке.</p>
        <Carousel variant="dark" style={{ marginBottom: "20px" }}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={gorniy}
              alt="gorniy"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={gorodskoy}
              alt="gorodskoi"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={shosseiniy}
              alt="shosseiiniy"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={detskiy}
              alt="detskiy"
            />
          </Carousel.Item>
        </Carousel>
      </Container>
    </>    
  );
};