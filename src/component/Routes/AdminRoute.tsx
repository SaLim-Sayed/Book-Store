import { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import axios from "axios";
import { APP_API } from "../../API/api_url";
import { Outlet } from "react-router-dom"; 
import Spinner from "../UI/Spinner";

export default function AdminRoute() {
  const { token } = useUserStore();
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`${APP_API}api/v1/auth/admin-auth`);
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (token) authCheck();
  }, [token]);
  return ok ? <Outlet /> : <Spinner path="/" />;
}
