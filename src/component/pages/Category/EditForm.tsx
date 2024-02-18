/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Drawer, Space, message } from "antd";
import { Button, Input } from "@nextui-org/react";
import { BiEdit } from "react-icons/bi";
import { axiosInstance } from "../../../API/api_url";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface ICategory {
  name: string;
  _id: string;
  slug: string;
}

const EditForm = ({
  title,
  record,
  setUpdate,
  update,
}: {
  update: boolean;
  title: string;
  record: ICategory;
  setUpdate: (update: boolean) => void;
}) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const [isLoading, setIsLoading] = useState(false);

  const CategorySchema = z.object({
    name: z
      .string()
      .min(3, { message: "Name is too short" })
      .max(50, { message: "Name is too long" }),
  });

  type Category = z.infer<typeof CategorySchema>;
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Category>({
    resolver: zodResolver(CategorySchema),
  });

  const onSubmit: SubmitHandler<Category> = async (data) => {
    const form = new FormData();

    for (const [key, value] of Object.entries(data)) {
      form.append(key, value);
    }
    try {
      setIsLoading(true);
      const res = await axiosInstance.put(
        `api/v1/category/update-category/${record._id}`,
        data
      );
      setIsLoading(false);
      if (res?.data.success) {
        setUpdate(!update);
        message.success(res.data?.messsage);
        setOpen(false);
      } else {
        message.error(res.data.messsage);
      }
    } catch (error) {
      setIsLoading(false);
      message.error("  Faild");
    }
  };
  return (
    <>
      <Space>
        <Button color="success" isIconOnly onClick={showDrawer}>
          <BiEdit size={24} className="text-white" />
        </Button>
      </Space>
      <Drawer
        title={title}
        placement="bottom"
        width={200}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <div className="flex justify-center">
          <form
            className="w-full md:w-[50%] flex justify-center  flex-col gap-[20px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Input
                {...register("name")}
                type="text"
                label="name"
                defaultValue={record.name}
                variant="bordered"
                className="w-full"
                isInvalid={errors.name ? true : false}
                errorMessage={errors.name?.message}
                classNames={{
                  input: "text-[1.2rem]",
                }}
              />
            </div>
            <Button
              isLoading={isLoading}
              type="submit"
              className="bg-cyan-700   text-lg text-white "
            >
              Edit
            </Button>
          </form>
        </div>
      </Drawer>
    </>
  );
};

export default EditForm;
