import { Route, Routes } from "react-router-dom";
import HomePage from "./component/pages/HomePage";
import About from "./component/pages/About";
import Contact from "./component/pages/Contact";
import NotFount from "./component/pages/NotFount";
import Policy from "./component/pages/Policy";
import Login from "./component/Auth/Login/Login";
import Register from "./component/Auth/Register/Register";
import axios from "axios";
import Private from "./component/Routes/Private";
import { useUserStore } from "./store/userStore";
import Dashboard from "./component/pages/Dashboard";
import ForgetPassword from "./component/Auth/ForgetPassword/ForgetPassword";

function App() {
  const { token } = useUserStore();
  axios.defaults.headers.common["Authorization"] = token;
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Private />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFount />} />
      </Routes>
    </div>
  );
}

export default App;
