import React, { useState, useEffect } from "react";
import "./Theft.css"
import axios from "axios";


export const Theft = () => {
  const [licenseNumber, setLicenseNumber] = useState("");
  const [ownerFullName, setOwnerFullName] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleNumber = (e) => {
    setLicenseNumber(e.target.value);
  };
  const handleName = (e) => {
    setOwnerFullName(e.target.value);
  };
  const handleType = (e) => {
    setType(e.target.value);
    console.log(type);
  };
  const handleColor = (e) => {
    setColor(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleInfo = (e) => {
    setDescription(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "https://sf-final-project-be.herokuapp.com/api/public/report",
        {
          ownerFullName: ownerFullName,
          licenseNumber: licenseNumber,
          type: type,
          clientId: "c0898eda-a581-4aca-8341-0e321571e895",
          color: color,
          date: date,
          description: description
        }
      )
      .then((res) => {
        setLicenseNumber("");
        setOwnerFullName("");
        setType("");
        setColor("");
        setDate("");
        setDescription("");
        setMessage("Заявление принято");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    console.log(type);
  }, [type]);
  return (
    <>
      <div className="form">
        <form className="formTheft" method="post" onSubmit={handleSubmit}>
          <h1>Украли!</h1>
          <label>Номер лицензии* </label>
          <input onChange={handleNumber} value={licenseNumber} type="text" placeholder="Введите номер лицензии" required />
          <label>ФИО клиента* </label>
          <input onChange={handleName} value={ownerFullName} type="text" placeholder="Введите ФИО" required />
          <label>Тип велосипеда*</label>
          <select onChange={handleType} value={type} required>
            <option value="">Выберите тип велосипеда</option>
            <option value="mountain">Горный</option>
            <option value="city">Городской</option>
            <option value="highway">Шоссейный</option>
            <option value="childrens">Детский</option>
          </select>
          <label>Цвет велосипеда </label>
          <input onChange={handleColor} value={color} type="text" placeholder="Укажите цвет велосипеда" />
          <label>Дата кражи</label>
          <input onChange={handleDate} value={date} type="date" />
          <label>Дополнительная информация</label>
          <input onChange={handleInfo} value={description} type="text" placeholder="Опишите ситуацию" />
          <button>Отправить</button>
          <p>{message}</p>
        </form>
      </div>
    </>
  );
};