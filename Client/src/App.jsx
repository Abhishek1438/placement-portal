// import logo from "./logo.svg";s
import "./App.css";

import Register from "./components/Register";
import AdminDashBoard from "./routes/AdminDashboard";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import JobNotificationForm from "./components/JobNotificationForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />} exact></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/admin/*" element={<AdminDashBoard />}></Route>
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
