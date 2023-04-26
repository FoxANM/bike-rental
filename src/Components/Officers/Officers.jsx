import React, { useState, useEffect } from "react";
import "./Officers.css";
import { OfficerDetail } from "./OfficerDetail";
import { Link } from "react-router-dom";
import axios from "axios";

export const Officers = ({ setApproved }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [firstName, setName] = useState("");
  const [lastName, setSurname] = useState("");
  const [info, setInfo] = useState([]);
  const [newOfficer, setNewOfficer] = useState(false);
  const [detail, setDetail] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const allOfficers = async () => {
    setLoading(true);
    const result = await axios.get(
      "https://sf-final-project-be.herokuapp.com/api/officers/",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setLoading(false);
    setInfo(result.data.officers);
    setApproved(result.data.officers);
  };
  
  useEffect(() => {
    allOfficers();
  }, [newOfficer]);

  const changeMail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeSurname = (e) => {
    setSurname(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios
      .post(
        "https://sf-final-project-be.herokuapp.com/api/officers",
        { email, password, firstName, lastName },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setEmail("");
        setPassword("");
        setName("");
        setSurname("");
        setMessage("Сотрудник добавлен");
        allOfficers();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleAdd = () => {
    setNewOfficer(!newOfficer);
  };
  const handleClose = () => {
    setNewOfficer(!newOfficer);
    setMessage("");
  };

  return (
    <>
      <div>
        <h1 className="title">Все сотрудники</h1>
        <div className="officers">
          <ol className="list">
            {(loading && <div className="loading">Загрузка...</div>) ||
              info.map((worker) => (
                <div key={worker._id} className="officer">
                  <Link onClick={() => setDetail(!detail)} className="link" to={`/officers/${worker._id}`}>
                    <li>{worker.email}</li>
                  </Link>
                </div>
              ))}
          </ol>
          {(info.length === 0 && <div></div>) || (
            <button className="add" onClick={handleAdd}>
              Добавить сотрудника
            </button>
          )}
          {(newOfficer && (
            <form method="post" className="newOfficer" onSubmit={handleSubmit}>
              <div className="newOfficerForm">
                <label>Имя</label>
                <input onChange={changeName} type="text" name="имя" value={firstName} />
                <label>Фамилия</label>
                <input onChange={changeSurname} type="text" name="фамилия" value={lastName} />
                <label>E-mail* </label>
                <input onChange={changeMail} type="email" name="email" value={email} required />
                <label>Пароль*</label>
                <input onChange={changePassword} type="password" name="пароль" value={password} required />
                <span onClick={handleClose} className="close">Закрыть</span>
                <button>Добавить</button>
                <span style={{ color: "white", textAlign: "center", marginTop: "20px" }}>
                  {message}
                </span>
              </div>
            </form>
          )) ||
            (detail && (
              <OfficerDetail
                detail={detail}
                setDetail={setDetail}
                info={info}
                allOfficers={allOfficers}
              />
            )) ||
            null}
        </div>
      </div>
    </>
  );
};