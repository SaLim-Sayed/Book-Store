import { zodResolver } from "@hookform/resolvers/zod";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Autocomplete,
  AutocompleteItem,
  Image,
} from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiCamera, BiPlus } from "react-icons/bi";
import { z } from "zod";
import { useCategoryStore } from "../../../store/useCategoryStore";
import { ICategory } from "../../../types/Category";
import { message } from "antd";
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

  const { categories } = useCategoryStore();
  const ProductSchema = z.object({
    name: z
      .string()
      .min(3, { message: "Name is too short" })
      .max(50, { message: "Name is too long" }),
    description: z.string().max(500, { message: "Description is too long" }),
    price: z.string(),
    category: z.string(),
    quantity: z.string(),
  });

  const [photo, setPhoto] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  };

  type Product = z.infer<typeof ProductSchema>;
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(ProductSchema),
  });

  const onSubmit: SubmitHandler<Product> = async (data) => {
    console.log(data);
    try {
      const productData = new FormData();
      productData.append("name", data.name);
      productData.append("description", data.description);
      productData.append("price", data.price);
      productData.append("quantity", data.quantity);
      productData.append("photo", photo as Blob);
      productData.append("category", data.category);
      setIsLoading(true);
      const res = await axiosInstance.post(
        `api/v1/product/create-product`,
        productData
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
      <Button
        color="warning"
        endContent={<BiPlus size={24} />}
        onPress={onOpen}
      >
        Create
      </Button>
      <Modal
        className="z-[30000] max-h-[80vh] overflow-auto"
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Create Product
            </ModalHeader>
            <ModalBody>
              <form
                className="w-full flex  flex-col gap-[20px]"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className=" flex justify-between">
                  <div className="mb-3">
                    <label className="">
                      {photo ? (
                        <div className="flex flex-col">
                          <BiCamera size={60} /> {photo.name}
                        </div>
                      ) : (
                        <BiCamera size={60} />
                      )}
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={handleFileChange}
                        hidden
                      />
                    </label>
                  </div>
                  {photo && (
                    <div className="mb-3">
                      <div className="text-center">
                        <Image
                          src={URL.createObjectURL(photo)}
                          alt="product_photo"
                          height={50}
                          width={60}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>
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
                <div>
                  <Input
                    {...register("description")}
                    type="text"
                    label="description"
                    variant="bordered"
                    className="w-full"
                    isInvalid={errors.description ? true : false}
                    errorMessage={errors.description?.message}
                    classNames={{
                      input: "text-[1.2rem]",
                    }}
                  />
                </div>

                <div>
                  <Input
                    {...register("price")}
                    type="number"
                    label="price"
                    variant="bordered"
                    className="w-full"
                    isInvalid={errors.price ? true : false}
                    errorMessage={errors.price?.message}
                    classNames={{
                      input: "text-[1.2rem]",
                    }}
                  />
                </div>
                <Autocomplete
                  aria-label="Search"
                  className="w-full"
                  {...register("category")}
                  placeholder="Select Category"
                >
                  {categories?.map((category: ICategory, index: number) => (
                    <AutocompleteItem
                      key={index}
                      textValue={category?._id}
                      value={category?._id}
                    >
                      {category?.name}
                    </AutocompleteItem>
                  )) || ""}
                </Autocomplete>

                <div>
                  <Input
                    {...register("quantity")}
                    type="text"
                    label="quantity"
                    variant="bordered"
                    className="w-full"
                    isInvalid={errors.quantity ? true : false}
                    errorMessage={errors.quantity?.message}
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
