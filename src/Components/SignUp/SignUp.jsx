import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [clientId, setClientId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios
      .post(
        "https://sf-final-project-be.herokuapp.com/api/auth/sign_up",
        { email, password, firstName, lastName, clientId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(
        (response) => {
          setEmail("");
          setPassword("");
          setFirstName("");
          setLastName("");
          setClientId("");
          setMessage("Пользователь зарегистрирован");
          console.log(response);
        },
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
      )
      .catch((error) => {
        setMessage(error.response);
      });
  };

  const changeMail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const changeName = (e) => {
    setFirstName(e.target.value);
  };
  const changeSurname = (e) => {
    setLastName(e.target.value);
  };
  const changeId = (e) => {
    setClientId(e.target.value);
  };

  return (
    <>
      <div className="form">
        <form className="formUp" method="post" onSubmit={handleSubmit}>
          <h1>Регистрация</h1>
          <label>
            E-mail* <br />
            <input
              onChange={changeMail}
              type="email"
              name="email"
              value={email}
              placeholder="Введите e-mail"
              required
            />
          </label>
          <label>
            Пароль* <br />
            <input
              onChange={changePassword}
              type="password"
              name="пароль"
              value={password}
              placeholder="Введите пароль"
              required
            />
          </label>
          <label>
            Имя <br />
            <input
              onChange={changeName}
              type="text"
              name="имя"
              value={firstName}
              placeholder="Введите имя"
            />
          </label>
          <label>
            Фамилия <br />
            <input
              onChange={changeSurname}
              type="text"
              name="фамилия"
              value={lastName}
              placeholder="Введите фамилию"
            />
          </label>
          <label>
            Client ID* <br />
            <input
              onChange={changeId}
              type="text"
              name="client id"
              value={clientId}
              placeholder="Введите ClientID"
              required
            />
          </label>
          <button>
            Зарегистрироваться
          </button>
          <p style={{ textAlign: "center", marginTop: "20p" }}>{message}</p>
        </form>
      </div>
    </>
  );
};