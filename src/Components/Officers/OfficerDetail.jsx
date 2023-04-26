import React, { useState } from "react";
import "./OfficerDetail.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export const OfficerDetail = ({ detail, setDetail, info, allOfficers }) => {
  const { id } = useParams();
  let officer = info.find(({ _id }) => _id === id);
  const [editMode, setEdit] = useState(false);
  const [password, setPassword] = useState("");
  const [firstName, setName] = useState(officer.firstName);
  const [lastName, setSurname] = useState(officer.lastName);
  const [approved, setApproved] = useState(officer.approved);

  const handleEdit = (e) => {
    e.preventDefault();
    setEdit(!editMode);
  };
  const handleSave = (e) => {
    e.preventDefault();
    setEdit(!editMode);

    axios
      .put(
        `https://sf-final-project-be.herokuapp.com/api/officers/${officer._id}`,
        {
          firstName: firstName,
          lastName: lastName,
          approved: approved,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        allOfficers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(
        `https://sf-final-project-be.herokuapp.com/api/officers/${officer._id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        allOfficers();
        setDetail(!detail);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="details">
        <div>
          <Link to={`/officers/`}>
            <span className="closeDetail" onClick={() => setDetail(!detail)}>Закрыть</span>
          </Link>
          <form className="formDetail"> 
            <label>Имя</label>
            <input
              onChange={(e) => setName(e.target.value)}
              disabled={!editMode ? true : false}
              type="text"
              value={firstName}
            />
            <label>Фамилия</label>
            <input
              onChange={(e) => setSurname(e.target.value)}
              type="text"
              value={lastName}
              disabled={!editMode ? true : false}
            />
            <label>E-mail</label>
            <input 
              type="email"
              value={officer.email}
              disabled 
            />
            <label>Пароль</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
              disabled
            />
            <label>ID</label>
            <input type="text" value={officer._id} disabled />
            <div className="approved">
              <label>Сотрудник одобрен</label>
              <input
                onChange={() => setApproved(!approved)}
                type="checkbox"
                value={approved}
                disabled={!editMode ? true : false}
                checked={approved}
              />
            </div>
            <div className="buttons">
              {(!editMode && (
                <button className="edit" onClick={handleEdit}>
                  Редактировать
                </button>
              )) || (
                <button className="save" onClick={handleSave}>
                  Сохранить
                </button>
              )}
              <button className="delete" onClick={handleDelete}>
                Удалить
              </button>
            </div>
          </form>              
        </div>            
      </div>
    </>
  );
};