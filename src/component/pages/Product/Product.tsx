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
import { IProduct } from "../../../types/Product";
import { useProductStore } from "../../../store/useProductStore";

 
export default function Product() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { setCategories } = useCategoryStore();
  const [update, setUpdate] = useState(false);
  const {products,setProducts}=useProductStore()
  const getAllProducts = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/product/get-product");
      if (res.data.success) {
        setProducts(res?.data?.products);
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };
  const deleteProduct = async (id: string) => {
    try {
      const res = await axiosInstance.delete(
        `api/v1/product/delete-product/${id}`
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
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (_: any, record: IProduct) => (
        <img
          src={`https://ecommerce-api-v1.vercel.app/api/v1/product/product-photo/${record._id}`}
          className="w-16 h-16"
        />
      ),
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: IProduct) => (
        <Space size="middle">
          <EditForm
            update={update}
            setUpdate={setUpdate}
            title="Edit"
            record={record}
          />

          <Button
            isIconOnly
            onClick={() => deleteProduct(record._id)}
            color="danger"
          >
            <AiFillDelete size={24} />
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getAllProducts();
  }, []);
  useEffect(() => {
    getAllProducts();
    getAllCategory();
  }, [update, isOpen]);

  return (
    <AdminLayout>
      <Center>
        <h1 className=" bg-slate-600 text-white mx-0 p-1  py-4 uppercase text-lg text-center flex items-center gap-2 justify-between">
          Product Dashboard
          <CreateForm
            onOpenChange={onOpenChange}
            onOpen={onOpen}
            isOpen={isOpen}
          />
        </h1>
        <Table
          pagination={{ pageSize: 3 }}
          dataSource={products} // Use categories directly as the data source
          columns={columns}
        />
      </Center>
    </AdminLayout>
  );
}
