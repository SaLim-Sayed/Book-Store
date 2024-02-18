/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import Center from "../../UI/Center";
import { axiosInstance } from "../../../API/api_url";
import { Space, Table } from "antd";
import { Button, useDisclosure } from "@nextui-org/react";

import CreateForm from "./CreateForm";

export default function Category() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [categories, setCategories] = useState<any[]>();
  const dataSource = [
    {
      key: "1",
      name: "Mike",

      action: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",

      action: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button color="primary">Edit</Button>
          <Button color="danger">Delete</Button>
        </Space>
      ),
    },
  ];
  const getAllCategory = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/category/get-category");
      if (res.data.success) {
        setCategories(res?.data?.category);
        console.log(res.data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  useEffect(() => {
    getAllCategory();
  }, [isOpen]);
  return (
    <AdminLayout>
      <Center>
        <h1 className=" bg-slate-600 text-white mx-0 p-4 uppercase text-2xl text-center flex justify-between">
          Category Dashboard
          <CreateForm
            onOpenChange={onOpenChange}
            onOpen={onOpen}
            isOpen={isOpen}
          />
        </h1>
        <Table
          pagination={{ pageSize: 3 }}
          dataSource={categories ? categories : dataSource}
          columns={columns}
        />
        ;
      </Center>
    </AdminLayout>
  );
}
