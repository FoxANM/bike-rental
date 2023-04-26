import "./App.css";
import Header from "./Components/Header/Header";
import { Main } from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer";
import { SignUp } from "./Components/SignUp/SignUp";
import { SignIn } from "./Components/SignIn/SignIn";
import { Theft } from "./Components/Theft/Theft";
import { Cases } from "./Components/Cases/Cases";
import { Officers } from "./Components/Officers/Officers";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";



function App() {
  const [data, setData] = useState([]);
  const [approved, setApproved] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [admin, setAdmin] = useState(
    localStorage.getItem(localStorage.getItem("admin") || false)
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        "https://sf-final-project-be.herokuapp.com/api/auth/sign_in",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )

      .then((response) => {
        setLoading(false);
        setData(response.data);
        localStorage.setItem("token", response.data.data.token);
        console.log(response);
        if (response.data.data.user.approved === true) {
          setAdmin(!admin);
          localStorage.setItem("admin", true);
        }
        setMessage("");
      })
      .catch((error) => {
        setMessage("Вы ввели неверный логин или пароль");
      });
  };

  return (
    <div className="App">
      <Router>
        <Header admin={admin} setAdmin={setAdmin} />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="auth/sign_up" element={<SignUp />}></Route>
          <Route
            path="auth/sign_in"
            element={
              <SignIn  
              admin={admin}
              setAdmin={setAdmin}
              data={data}
              setData={setData}
              password={password}
              setPassword={setPassword}
              setEmail={setEmail}
              message={message}
              email={email}
              handleSubmit={handleSubmit}
              loading={loading}
              />
            }
          ></Route>
          <Route
            path="public/report"
            element={<Theft admin={admin} />}
          ></Route>
          <Route
            path="/cases"
            element={<Cases approved={approved} setApproved={setApproved} />}
          ></Route>
          <Route
            path="/officers"
            element={<Officers approved={approved} setApproved={setApproved} />}
          ></Route>
          <Route
            path="/cases/:id"
            element={<Cases approved={approved} setApproved={setApproved} />}
          ></Route>
          <Route
            path="/officers/:id"
            element={<Officers approved={approved} setApproved={setApproved} />}
          ></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;