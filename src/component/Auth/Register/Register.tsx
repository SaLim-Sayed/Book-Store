import { Card } from "@nextui-org/react";
import Layout from "../../Layouts/Layout";
import Center from "../../UI/Center";
import RegisterForm from "./RegisterForm";
import Title from "../../UI/Title";

export default function Register() {
  return (
    <Layout title="Register" description="Register page">
      <Center>
        <Title exSt="mt-4" title="Register" />
        <div className="flex justify-center mb-4 ">
          <Card className="flex w-full lg:w-[50%]    p-4 items-center flex-col  gap-[40px]">
            <RegisterForm />
          </Card>
        </div>
      </Center>
    </Layout>
  );
}
