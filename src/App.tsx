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
import Dashboard from "./component/pages/User/Dashboard";
import ForgetPassword from "./component/Auth/ForgetPassword/ForgetPassword";
import AdminRoute from "./component/Routes/AdminRoute";
import AdminDashboard from "./component/pages/Admin/AdminDashboard";
import Users from "./component/pages/Admin/Users";
import Product from "./component/pages/Product/Product";
import Category from "./component/pages/Category/Category";
import Orders from "./component/pages/User/Orders/Orders";
import Profile from "./component/pages/User/Profile";
import { axiosInstance } from "./API/api_url";
import ProductDetails from "./component/Product/Product";

function App() {
  const { token } = useUserStore();
  axios.defaults.headers.common["Authorization"] = token;
  axiosInstance.defaults.headers.common["Authorization"] = token;

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Private />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/product" element={<Product />} />
          <Route path="admin/category" element={<Category />} />
        </Route>
        <Route path="/product/:slug" element={<ProductDetails />} />
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
