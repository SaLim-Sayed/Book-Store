import { Card } from "@nextui-org/react";
import Layout from "../../Layouts/Layout";
import Center from "../../UI/Center";
import ForgetPasswordForm from "./ForgetPasswordForm";
import Title from "../../UI/Title";

export default function ForgetPassword() {
  return (
    <Layout title="ForgetPassword" description="ForgetPassword page">
      <Center>
        <Title exSt="mt-4" title="ForgetPassword" />
        <div className="flex justify-center mb-4 ">
          <Card className="flex w-full lg:w-[50%]    p-4 items-center flex-col  gap-[40px]">
            <ForgetPasswordForm />
          </Card>
        </div>
      </Center>
    </Layout>
  );
}
