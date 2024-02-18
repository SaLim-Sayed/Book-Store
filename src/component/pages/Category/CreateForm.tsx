import { zodResolver } from "@hookform/resolvers/zod";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
} from "@nextui-org/react";
import { message } from "antd";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiPlus } from "react-icons/bi";
import { z } from "zod";
import { axiosInstance } from "../../../API/api_url";

export default function CreateForm({
  isOpen,
  onOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (isOpen: boolean) => void;
}) {
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
      const res = await axiosInstance.post(
        `api/v1/category/create-category`,
        data
      );
      setIsLoading(false);
      if (res?.data.success) {
        message.success(res.data.message);
        onOpenChange(false);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      message.error("Register Faild");
    }
  };
  return (
    <>
  <Button color="warning" endContent={<BiPlus size={24} />} onPress={onOpen}>
        {" "}
        Create{" "}
      </Button>
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Create Category
            </ModalHeader>
            <ModalBody>
              <form
                className="w-full flex  flex-col gap-[20px]"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <Input
                    {...register("name")}
                    type="text"
                    label="name"
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
                  Create
                </Button>
              </form>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
