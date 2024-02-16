import { NavLink } from "react-router-dom";
import Layout from "../Layouts/Layout";

export default function NotFount() {
  return (
    <Layout title=" NotFound" description="Page Not Found">
      <div className="flex flex-col items-center justify-center gap-4 min-h-[65vh]">
        <h1 className="text-[100px] font-[800] ">404</h1>
        <h2 className="text-xl">Oops ! Page Not Found</h2>
        <NavLink
          to="/"
          className=" border  hover:bg-black hover:text-white rounded-md p-1"
        >
          Go Back
        </NavLink>
      </div>
    </Layout>
  );
}
