import { Card } from "@nextui-org/react";
import AdminLayout from "../../Layouts/AdminLayout";
import Center from "../../UI/Center";

import RegisterForm from "./RegisterForm";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <h1 className=" bg-slate-600 text-white mx-0 md:mx-8 p-4 uppercase text-2xl text-center">
        Admin Profile
      </h1>
      <Center>
        <div className="flex justify-center mb-4 ">
          <Card className="flex w-full    p-4 items-center flex-col  gap-[40px]">
            <RegisterForm />
          </Card>
        </div>
      </Center>
    </AdminLayout>
  );
}
