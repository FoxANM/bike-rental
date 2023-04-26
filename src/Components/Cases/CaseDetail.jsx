import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export const CaseDetail = ({ cases, detail, setDetail, approved, setApproved}) => {
  const { id } = useParams();
  let report = cases.find(({ _id }) => _id === id);
  const [editMode, setEdit] = useState(false);
  const [status, setStatus] = useState(report.status);
  const [licenseNumber, setLicenseNumber] = useState(report.licenseNumber);
  const [ownerFullName, setOwnerFullName] = useState(report.ownerFullName);
  const [type, setType] = useState(report.type);
  const [color, setColor] = useState(report.color);
  const [date, setDate] = useState(report.date);
  const [officer, setOfficer] = useState(report.officer);
  const [description, setDescription] = useState(report.description);
  const [resolution, setResolution] = useState(report.resolution);
  let listApproved = approved.filter((officer) => officer.approved === true);

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

  useEffect(() => {
    allOfficers();
  }, [editMode]);

  useEffect(() => {
    console.log(detail);
  }, [detail]);

  const handleOfficer = (e) => {
    const selectId = e.target.value;
    const selectPerson = approved.filter((p) => p._id === selectId)[0];
    setOfficer(selectPerson._id);
  };

  useEffect(() => {
    console.log(officer);
  }, [officer]);
  useEffect(() => {
    console.log(type);
  }, [type]);
  useEffect(() => {
    console.log(status);
  }, [status]);

  const handleSave = (e) => {
    e.preventDefault();
    setEdit(!editMode);

    axios
      .put(
        `https://sf-final-project-be.herokuapp.com/api/cases/${report._id}`,
        {
          status,
          licenseNumber,
          ownerFullName,
          type,
          color,
          date,
          officer,
          description,
          resolution
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(
        `https://sf-final-project-be.herokuapp.com/api/cases/${report._id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setDetail(!detail);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <>
      <div className="caselDetail">
        <Link to={`/cases/`}>
          <span className="closeDetail" onClick={() => setDetail(!detail)}>Закрыть</span>
        </Link>
        <form className="caseFormDetail">
          <h1>Обстоятельства кражи</h1>
          <div>
            <label>
              Номер сообщения <br />
              <input type="text" value={report._id} disabled />
            </label>
            <label>
              Цвет
              <br />
              <input
                type="text"
                onChange={(e) => setColor(e.target.value)}
                value={color}
                disabled={!editMode ? true : false}
                style={{
                  color: editMode && "white",
                  backgroundColor: editMode && "black",
                }}
              />
            </label>
            <label>
              Создано
              <br />
              <input type="text" value={report.createdAt} disabled />
            </label>
            <label>
              Дата кражи
              <br />
              <input
                onChange={(e) => setDate(e.target.value)}
                value={date}
                style={{
                  color: editMode && "white",
                  backgroundColor: editMode && "black",
                }}
                disabled={!editMode ? true : false}
              />
            </label>
          </div>
          <div>
            <label>
              Описание
              <br />
              <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                style={{
                  color: editMode && "white",
                  backgroundColor: editMode && "black",
                }}
                disabled={!editMode ? true : false}
              />
            </label>
            <label>
              Номер велосипеда
              <br />
              <input
                type="text"
                onChange={(e) => setLicenseNumber(e.target.value)}
                value={licenseNumber}
                style={{
                  color: editMode && "white",
                  backgroundColor: editMode && "black",
                }}
                disabled={!editMode ? true : false}
              />
            </label>
            <label>
              Сотрудник
              <br />
              <select
                value={officer}
                onChange={handleOfficer}
                style={{
                  color: editMode && "white",
                  backgroundColor: editMode && "black",
                }}
                disabled={!editMode ? true : false}
              >
                <option value="">{officer}</option>
                {listApproved.map((officer) => (
                  <option key={officer._id} value={officer._id}>
                    {officer.firstName} {officer.lastName}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Имя владельца
              <br />
              <input
                type="text"
                onChange={(e) => setOwnerFullName(e.target.value)}
                value={ownerFullName}
                style={{
                  color: editMode && "white",
                  backgroundColor: editMode && "black",
                }}
                disabled={!editMode ? true : false}
              />
            </label>
          </div>
          <div>
            {status === "completed" && (
              <label>
                Решение
                <br />
                <input
                  onChange={(e) => setResolution(e.target.value)}
                  type="text"
                  value={resolution}
                  style={{
                    color: editMode && "white",
                    backgroundColor: editMode && "black",
                  }}
                  disabled={!editMode ? true : false}
                  required
                />
              </label>
            )}
            <label>
              Статус
              <br />
              <select
                onChange={(e) => setStatus(e.target.value)}
                defaultValue={"default"}
                value={status}
                style={{
                  color: editMode && "white",
                  backgroundColor: editMode && "black",
                }}
                disabled={!editMode ? true : false}
              >
                <option value="new">Новое</option>
                <option value="in_progress">В процессе</option>
                <option value="completed">Завершено</option>
              </select>
            </label>
            <label>
              Тип
              <br />
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={{
                  color: editMode && "white",
                  backgroundColor: editMode && "black",
                }}
                disabled={!editMode ? true : false}
              >
                <option value="mountain">Горный</option>
                <option value="city">Городской</option>
                <option value="highway">Шоссейный</option>
                <option value="childrens">Детский</option>
              </select>
            </label>
            <label>
              Обновление
              <br />
              <input type="text" value={report.updatedAt} disabled />
            </label>
          </div>
          <div className="buttons">
          {(!editMode && (
            <div onClick={() => setEdit(!editMode)} className="edit" role="button">
              Изменить
            </div>
          )) || (
            <div onClick={handleSave} className="save" role="button">
              Сохранить
            </div>
          )}
          <Link to={`/cases/`}>
            <div onClick={handleDelete} className="delete" role="button">
              Удалить
            </div>
          </Link>
          </div>
        </form>
      </div>
    </>
  );
};