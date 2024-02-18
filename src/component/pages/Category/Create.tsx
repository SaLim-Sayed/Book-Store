import { useState } from "react";
import { Drawer, Space } from "antd";
import { Button } from "@nextui-org/react";
import { BiPlus } from "react-icons/bi";

const CreateCategory = ({ title }: { title: string }) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space>
        <Button color="warning" onClick={showDrawer}>
          <BiPlus size={24} />
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
            <Button  onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default CreateCategory;
