import { RiAdminFill } from "react-icons/ri";
import { cn } from "../../libs/cn";
import { useMenuStore } from "../../store/adminStore";
import Center from "../UI/Center";
import Layout from "./Layout";
import { Button } from "@nextui-org/react";
import { BiCategory } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { GrOrderedList } from "react-icons/gr";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const { userMenuStatus, userMenuStatusSetter } = useMenuStore();
  const menu = [
    {
      label: "Dashboard",
      content: "Dashboard",
      icon: <BiCategory size={24} />,
      path: "/dashboard/user",
    },
    {
      label: "Profile",
      content: "Profile",
      icon: <RiAdminFill size={24} />,
      path: "/dashboard/user/profile",
    },

    {
      label: "Orders",
      content: "Orders",
      icon: <GrOrderedList size={24} />,
      path: "/dashboard/user/orders",
    },
  ];
  return (
    <Layout title="Admin" description="Admin page">
      <Center>
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="w-full md:w-[40%]">
            <div className="flex  flex-col gap-1">
              {menu.map((item) => {
                return (
                  <Button
                    size="lg"
                    radius="sm"
                    className={cn(
                      "text-sm md:text-[20px] relative sm:h-[40px] md:h-[64px] flex justify-start ",
                      userMenuStatus === item.content
                        ? "bg-cyan-600 text-white"
                        : ""
                    )}
                    onClick={() => {
                      userMenuStatusSetter(item.content);
                      navigate(item.path);
                    }}
                    key={item.content}
                  >
                    {userMenuStatus === item.content && (
                      <div className="absolute top-[50%] -translate-y-[50%] -right-0   h-0 border-t-transparent border-l-transparent border-b-transparent border-8   border-white"></div>
                    )}
                    {item.icon} {item.label}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="w-full md:w-[60%]">{children}</div>
        </div>
      </Center>
    </Layout>
  );
}
