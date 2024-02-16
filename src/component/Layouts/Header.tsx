import {
  AutoComplete,
  Button,
  Input,
  MenuProps,
  Dropdown,
  Space,
  Badge,
} from "antd";
import Center from "../UI/Center";
import { FcReadingEbook } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";
import { links } from "./links";
import Aside from "./Aside";
import { BsCart } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { useUserStore } from "../../store/userStore";

export default function Header() {
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
      label: "Categories",
      options: [
        renderItem("AntDesign", 10000),
        renderItem("AntDesign UI", 10600),
      ],
    },
    {
      label: "Categories",
      options: [
        renderItem("AntDesign UI FAQ", 60100),
        renderItem("AntDesign FAQ", 30010),
      ],
    },
    {
      label: "Libraries",
      options: [renderItem("AntDesign design language", 100000)],
    },
  ];

  /*  const content = (
    <div className=" flex flex-col justify-center nav-link  items-center gap-2">
      {links.map((link) => {
        return (
          <NavLink to={link.path} type="text" key={link.path}>
            {link.title}
          </NavLink>
        );
      })}
      <Dropdown
        className=" cursor-pointer"
        menu={{ items }}
        trigger={["click"]}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Click me
            <BiDownArrow />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
 */
  return (
    <div className="sticky top-0 bg-white  w-full z-[500] shadow-lg">
      <Center nav>
        <nav
          className={
            "flex items-center   justify-between min-h-[80px] w-[95%] mx-auto   md:w-full  "
          }
        >
          <Button
            size="large"
            onClick={() => navigate("/")}
            type="text"
            className="flex justify-center items-center gap-2"
          >
            <FcReadingEbook size={24} />{" "}
            <span className="font-bold text-orange-600">Book</span>
          </Button>

          <div className="hidden nav-link lg:flex  items-center gap-4">
            <div className="z-50 ">
              <AutoComplete
                popupClassName="certain-category-search-dropdown"
                popupMatchSelectWidth={500}
                style={{ width: 500, zIndex: 1000 }}
                options={options}
              >
                <Input.Search size="large" placeholder="input here" />
              </AutoComplete>
            </div>
            {links.map((link) => {
              return (
                <NavLink to={link.path} type="text" key={link.path}>
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
                <Button>
                  <Space>
                    {user?.name}
                    <IoIosArrowDown />
                  </Space>
                </Button>
              </Dropdown>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
              </>
            )}
          </div>
          <Badge count={5}>
            <BsCart size={32} />
          </Badge>
          <div className="lg:hidden  flex  items-center gap-2">
            <Aside />
          </div>
        </nav>
      </Center>
    </div>
  );
}
