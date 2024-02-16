import { Card } from "@nextui-org/react";
import Layout from "../../Layouts/Layout";
import Center from "../../UI/Center";
import LoginForm from "./LoginForm";
import Title from "../../UI/Title";

export default function Login() {
  return (
    <Layout title="Login" description="Login page">
      <Center>
        <Title exSt="mt-4" title="Login" />
        <div className="flex justify-center  mb-4 ">
          <Card className="flex w-full lg:w-[50%]    p-4 items-center flex-col  gap-[40px]">
            <LoginForm />
          </Card>
        </div>
      </Center>
    </Layout>
  );
}
