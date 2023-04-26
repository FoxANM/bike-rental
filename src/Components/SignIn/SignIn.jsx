import React from "react";
import "./SignIn.css";
import { Main } from "../Main/Main";

export const SignIn = ({
  admin,
  email,
  setEmail,
  password,
  setPassword,
  message,
  handleSubmit,
  loading,
}) => {
  return (
    <>
      {(loading && (
        <div className="loading">
          Загрузка...
        </div>
      )) ||
        (!admin && (
          <div className="form">
            <form className="formIn" onSubmit={handleSubmit}>
              <h1>Вход</h1>
              <label>E-mail</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                value={email}
                placeholder="Введите e-mail"
                required                        
              />
              <label>Пароль</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="пароль"
                value={password}
                placeholder="Введите пароль"
                required                
              />
              <button>
                Войти
              </button>
              <p>{message}</p>
            </form>
          </div>
        )) || <Main />
      }
    </>
  );
};
