import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Spinner() {
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setCount] = useState(5);
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => c - 1);
    }, 1000);
    if (count === 0) {
      navigate("/login", { state: location.pathname });
    }
    return () => clearInterval(timer);
  }, [count, navigate,location]);
  return (
    <div>
      <div className="flex justify-center flex-col gap-2 items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-4 border-gray-900 border-t-gray-200" />
        <div>Loading.....</div>
        <div className="text-2xl text-teal-700 text-center">
          you will be redirected in {count} seconds
        </div>
      </div>
    </div>
  );
}
