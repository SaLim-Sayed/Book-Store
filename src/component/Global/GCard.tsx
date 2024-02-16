import { Card } from 'antd';

const { Meta } = Card;

type IProps = {
    title: string,
    description: string,
    img: string,
}
const GCard  = ({title, description, img}: IProps) => (
  <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src={img} />}
  >
    <Meta title={title} description={description}/>
  </Card>
);

export default GCard;