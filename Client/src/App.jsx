// import logo from "./logo.svg";s
import "./App.css";

import Register from "./components/Register";
import AdminDashBoard from "./pages/AdminDashboard";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import JobNotificationForm from "./components/JobNotificationForm";
import axios from "axios";
import { useEffect } from "react";
import StudentLogin from "./components/Student/Login";
import AdminLogin from "./components/Admin/Login";
import HomePage from "./components/HomePage";
import { useNavigate } from "react-router-dom";
import StudentDashBoard from "./components/Student/StudentDashboard";

function App() {
  let navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:3000/check", {
        withCredentials: true,
      });

      const user = await res.data.user;
      //save user

      if (res.data.role == "admin") {
        navigate("/admin");
      } else {
        navigate("/student");
      }
    };

    fetchUser();
  }, []);

  // axios
  // .get("http://localhost:3000/check", { withCredentials: true })
  // .then((res) => console.log(res));

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} exact></Route>
        <Route path="/student-login" element={<StudentLogin />}></Route>
        <Route path="/admin-login" element={<AdminLogin />}></Route>
        <Route path="/student-register" element={<Register />}></Route>
        <Route path="/admin/*" element={<AdminDashBoard />}></Route>
        <Route path="/student/*" element={<StudentDashBoard />}></Route>
        <Route
          path="/job-notification-form"
          element={<JobNotificationForm />}
        ></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
