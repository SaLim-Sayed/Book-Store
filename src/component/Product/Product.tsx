import { useParams } from "react-router-dom";
import Layout from "../Layouts/Layout";
import { axiosInstance } from "../../API/api_url";
import { useEffect, useState } from "react";
import { IProduct } from "../../types/Product";
import Center from "../UI/Center";
import Title from "../UI/Title";
import { Button, Image } from "@nextui-org/react";

export default function ProductDetails() {
  const { slug } = useParams();
  console.log(slug);
  const [product, setProduct] = useState<IProduct>();
  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axiosInstance.get(
        `api/v1/product/get-product/${slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };
  console.log({ product });
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout title="Product" description="Product Page">
      <Center>
        <Title title={product?.name} />

        <div className="flex justify-center w-[90%] mx-auto items-center">
          <div className="flex flex-col md:flex-row  gap-4 mb-16  ">
            <Image
              height={200}
              width={200}
              src={`https://ecommerce-api-v1.vercel.app/api/v1/product/product-photo/${product?._id}`}
            />
            <div className="flex flex-col gap-4">
              <div className="text-3xl text-teal-900">
                Name: {product?.name}
              </div>
              <div className="text-2xl">Price: {product?.price}</div>
              <div className="text-2xl">
                {" "}
                Description:{product?.description}
              </div>
              <div className="text-2xl">
                Category: {product?.category?.name}
              </div>
              <Button> Add To Cart</Button>
            </div>
          </div>
        </div>
      </Center>
    </Layout>
  );
}
