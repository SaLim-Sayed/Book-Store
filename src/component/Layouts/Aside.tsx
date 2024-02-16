import React, { useState } from "react";
import {
  AutoComplete,
  Badge,
  Button,
  Drawer,
  Dropdown,
  Input,
  MenuProps,
  Space,
} from "antd";
import { BiMenuAltRight } from "react-icons/bi";
import { FcReadingEbook } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";
import { links } from "./links";
import { IoIosArrowDown } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { useUserStore } from "../../store/userStore";

const Aside: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { token, user, setUserAndToken } = useUserStore();
  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      label: (
        <Button
          className="w-full"
          size="large"
          onClick={() => {
            setUserAndToken(null, "");
            navigate("/login");
          }}
        >
          Logout
        </Button>
      ),
      key: "0",
    },
    {
      label: <NavLink to="/dashboard">Dashboard</NavLink>,
      key: "1",
    },
  ];
  const renderTitle = (title: string) => (
    <span>
      {title}
      <a
        style={{ float: "right" }}
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer"
      >
        more
      </a>
    </span>
  );

  const renderItem = (title: string, count: number) => ({
    value: title,
    label: (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {title}
        <span>{count}</span>
      </div>
    ),
  });
  const options = [
    {
      label: renderTitle("Libraries"),
      options: [
        renderItem("AntDesign", 10000),
        renderItem("AntDesign UI", 10600),
      ],
    },
    {
      label: renderTitle("Solutions"),
      options: [
        renderItem("AntDesign UI FAQ", 60100),
        renderItem("AntDesign FAQ", 30010),
      ],
    },
    {
      label: renderTitle("Articles"),
      options: [renderItem("AntDesign design language", 100000)],
    },
  ];
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space>
        <Button type="dashed" onClick={showDrawer}>
          <BiMenuAltRight size={32} />
        </Button>
      </Space>
      <Drawer
        height={"100%"}
        title={
          <Button
            size="large"
            type="text"
            className="flex justify-center items-center gap-2"
          >
            <FcReadingEbook size={24} />{" "}
            <span className="font-bold text-orange-600">Book</span>
          </Button>
        }
        placement={"top"}
        closable={false}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>X</Button>
            <Badge count={5}>
              <BsCart size={32} />
            </Badge>
          </Space>
        }
      >
        <div className=" flex flex-col items-center gap-4 sm-nav-link">
          <div className="z-50 ">
            <AutoComplete
              popupClassName="certain-category-search-dropdown"
              popupMatchSelectWidth={300}
              style={{ width: 300, zIndex: 1000 }}
              options={options}
            >
              <Input.Search size="large" placeholder="input here" />
            </AutoComplete>
          </div>
          {links.map((link) => {
            return (
              <NavLink
                to={link.path}
                type="text"
                className=" border rounded-md p-1 text-center text-2xl  w-[90%]"
                key={link.path}
              >
                {link.title}
              </NavLink>
            );
          })}
          {token ? (
            <Dropdown
              className=" cursor-pointer"
              menu={{ items }}
              trigger={["click"]}
            >
              <a
                onClick={(e) => e.preventDefault()}
                className=" border rounded-md p-1 text-center text-2xl  w-[90%]"
              >
                <Space>
                  {user?.name}
                  <IoIosArrowDown />
                </Space>
              </a>
            </Dropdown>
          ) : (
            <NavLink
              to="/login"
              className=" border rounded-md p-1 text-center text-2xl  w-[90%]"
            >
              Login
            </NavLink>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default Aside;
