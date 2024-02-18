import { Button, Image } from "@nextui-org/react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

type IProps = {
  title: string;
  description: string;
  img: string;
  slug: string;
};
const GCard = ({ title, description, img, slug }: IProps) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/product/${slug}`)}
      className="shadow-3xl relative"
      hoverable
      style={{ width: 240 }}
      cover={
        <Image
          alt="example"
          src={img}
          height={200}
          width={1000}
          className="h-40"
        />
      }
    >
      <Meta title={title} description={description} className="mb-4" />
      <Button className="mt-16 w-full absolute bottom-0 left-0">Buy Now</Button>
    </Card>
  );
};

export default GCard;
