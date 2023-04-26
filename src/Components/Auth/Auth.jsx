import React, { useState, useEffect } from "react";
import "./Auth.css";
import axios from "axios";

export const Auth = ({
  newMessage,
  setNewMessage,
  approved,
  setApproved,
}) => {
  const [licenseNumber, setLicenseNumber] = useState("");
  const [ownerFullName, setOwnerFullName] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [officer, setOfficer] = useState("");

  let listApproved = approved.filter((officer) => officer.approved === true);
  
  const handleNumber = (e) => {
    setLicenseNumber(e.target.value);
  };

  const handleName = (e) => {
    setOwnerFullName(e.target.value);
  };

  const handleType = (e) => {
    setType(e.target.value);
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

  const handleOfficer = (e) => {
    const selectId = e.target.value;
    const selectPerson = approved.filter((p) => p._id === selectId)[0];
    setOfficer(selectPerson._id);
  };

  useEffect(() => {
    setType(type);
  }, [type]);

  useEffect(() => {
    setOfficer(officer);
  }, [officer]);

  useEffect(() => {
    allOfficers();
  }, [newMessage]);

  const allOfficers = async () => {
    const result = await axios.get(
      "https://sf-final-project-be.herokuapp.com/api/officers/",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setApproved(result.data.officers);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "https://sf-final-project-be.herokuapp.com/api/cases/",
        {
          licenseNumber,
          ownerFullName,
          type,
          color,
          date,
          description,
          officer
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
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
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="form" method="post" onSubmit={handleSubmit}>
        <form className="formAuth">
          <span className="closeForm" onClick={() => setNewMessage(!newMessage)}>Закрыть</span>
          <h1>Кража</h1>
          <div>
            <label>Ответственный сотрудник </label>
            <select onChange={handleOfficer} value={officer}>
              <option>Выберите сотрудника</option>
              {listApproved.map((officer) => (
                <option key={officer._id} value={officer._id}>
                  {officer.firstName} {officer.lastName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Номер лицензии</label>
            <input onChange={handleNumber} value={licenseNumber} type="text" required />
            <label>ФИО клиента</label>
            <input onChange={handleName} value={ownerFullName} type="text" required />
          </div>
          <div>
            <label>Тип велосипеда </label>
            <select onChange={handleType} value={type} required>
              <option value="">Выберите тип велосипеда</option>
              <option value="mountain">Горный</option>
              <option value="city">Городской</option>
              <option value="highway">Шоссейный</option>
              <option value="childrens">Детский</option>
            </select>
            <label>Цвет велосипеда </label>
            <input onChange={handleColor} value={color} type="text" />
          </div>
          <div>
            <label>Дата кражи</label>
            <input onChange={handleDate} value={date} type="date" />
            <label>Дополнительная информация</label>
            <input onChange={handleInfo} value={description} type="text" />
          </div>
          <button type="submit">Отправить</button>
          <p>{message}</p>
        </form>
      </div>
    </>
  );
};