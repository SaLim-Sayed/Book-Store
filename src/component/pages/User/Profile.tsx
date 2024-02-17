import { Card } from "@nextui-org/react";
import UserLayout from "../../Layouts/UserLayout";
import Center from "../../UI/Center";

import RegisterForm from "./ProfileForm";

export default function Profile() {
  return (
    <UserLayout>
      <h1 className=" bg-slate-600 text-white mx-8 p-4 uppercase text-2xl text-center">
        User Profile
      </h1>
      <Center>
        <div className="flex justify-center mb-4 ">
          <Card className="flex w-full    p-4 items-center flex-col  gap-[40px]">
            <RegisterForm />
          </Card>
        </div>
      </Center>
    </UserLayout>
  );
}
