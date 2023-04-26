import React, { useState, useEffect } from "react";
import "./Cases.css";
import { Link } from "react-router-dom";
import { CaseDetail } from "./CaseDetail";
import { Auth } from "../Auth/Auth";
import axios from "axios";

export const Cases = ({ approved, setApproved }) => {
  const [cases, setCases] = useState([]);
  const [detail, setDetail] = useState(false);
  const [newMessage, setNewMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDetail = () => {
    setDetail(!detail);
  };

  const allCases = async () => {
    setLoading(true);

    const result = await axios.get(
      "https://sf-final-project-be.herokuapp.com/api/cases/",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setLoading(false);
    setCases(result.data.data);
  };

  useEffect(() => {
    allCases();
  }, [detail, newMessage]);

  return (
    <>
      <div>
        <h1 className="title">Все кражи</h1>
        <div className="cases">
          <button className="addCase" onClick={() => setNewMessage(!newMessage)}>Добавить сообщение</button>
          {(loading && (
            <div className="loading">
              Загрузка...
            </div>
          )) ||
            (cases.length === 0 && <div></div>) ||
            (newMessage && (
              <Auth
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                approved={approved}
                setApproved={setApproved}
              />
            ))}
          <div className="caseBox">
            {cases.map((item) => (
              <div key={item._id} className="case">
                <span
                  className="newCase"
                  style={{
                    textAlign: "center",
                    borderRadius: "10px",
                    minWidth: "90px",
                    backgroundColor:
                      (item.status === "new" && "blue") ||
                      (item.status === "in_progress" && "orange") ||
                      (item.status === "completed" && "red"),
                  }}
                >
                  {item.status}
                </span>
                <Link
                  onClick={handleDetail}
                  className="link"
                  to={`/cases/${item._id}`}
                >
                  <li>{item.ownerFullName}</li>
                </Link>
              </div>
            ))}
          </div>
          {detail && (
            <CaseDetail
              case={cases}
              detail={detail}
              setDetail={setDetail}
              approved={approved}
              setApproved={setApproved}
            />
          )}
        </div>
      </div>
    </> 
  );
};