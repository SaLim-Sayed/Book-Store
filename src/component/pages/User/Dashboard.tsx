import { useUserStore } from "../../../store/userStore";
import UserLayout from "../../Layouts/UserLayout";
import Center from "../../UI/Center";

export default function Dashboard() {
  const { user } = useUserStore();
  return (
    <UserLayout>
      <Center>
        <h1 className=" bg-slate-600 text-white mx-0 md:mx-8 p-4 uppercase text-2xl text-center">
          Dashboard
        </h1>
        <div className="flex mx-8 text-xl flex-col gap-2">
          <h1>{user?.name}</h1>
          <h1>{user?.email}</h1>
          <h1>{user?.phone}</h1>
          <h1>{user?.address}</h1>
        </div>
      </Center>
    </UserLayout>
  );
}
