import { useEffect } from "react";
import { useProductStore } from "../../store/useProductStore";
import { IProduct } from "../../types/Product";
import Center from "../UI/Center";
import Title from "../UI/Title";
import { axiosInstance } from "../../API/api_url";
import { message } from "antd";
import GCard from "../Global/GCard";

export default function Products() {
  const { products, setProducts } = useProductStore();
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
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div>
      <Center>
        <Title title="Products" />
        <div className="flex flex-wrap gap-4 justify-center">
          {products?.map((product: IProduct) => (
            <GCard
            slug={product.slug}
              key={product._id}
              title={product?.name || ""}
              description={product.description}
              img={`https://ecommerce-api-v1.vercel.app/api/v1/product/product-photo/${product._id}`}
            />
          ))}
        </div>
      </Center>
    </div>
  );
}
