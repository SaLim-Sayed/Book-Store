/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import Center from "../../UI/Center";
import { axiosInstance } from "../../../API/api_url";
import { Space, Table, message } from "antd";
import { Button, useDisclosure } from "@nextui-org/react";

import CreateForm from "./CreateForm";
import EditForm from "./EditForm";
import { useCategoryStore } from "../../../store/useCategoryStore";
import { AiFillDelete } from "react-icons/ai";
interface ICategory {
  name: string;
  _id: string;
  slug: string;
}
export default function Category() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { categories, setCategories } = useCategoryStore();
  const [update, setUpdate] = useState(false);
  const deleteCategory = async (id: string) => {
    try {
      const res = await axiosInstance.delete(
        `api/v1/category/delete-category/${id}`
      );
      if (res.data.success) {
        setUpdate(!update);
        message.success(res.data?.message);
      } else {
        message.error(res.data?.message);
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };
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
      render: (_: any, record: ICategory) => (
        <Space size="middle">
          <EditForm
            update={update}
            setUpdate={setUpdate}
            title="Edit"
            record={record}
          />

          <Button
            isIconOnly
            onClick={() => deleteCategory(record._id)}
            color="danger"
          >
            <AiFillDelete size={24} />
          </Button>
        </Space>
      ),
    },
  ];
  const getAllCategory = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/category/get-category");
      if (res.data.success) {
        setCategories(res?.data?.category);
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  useEffect(() => {
    getAllCategory();
  }, [update, isOpen]);

  return (
    <AdminLayout>
      <Center>
        <h1 className=" bg-slate-600 text-white mx-0 p-1  py-4 uppercase text-lg text-center flex items-center gap-2 justify-between">
          Category Dashboard
          <CreateForm
            onOpenChange={onOpenChange}
            onOpen={onOpen}
            isOpen={isOpen}
          />
        </h1>
        <Table
          pagination={{ pageSize: 3 }}
          dataSource={categories} // Use categories directly as the data source
          columns={columns}
        />
      </Center>
    </AdminLayout>
  );
}
