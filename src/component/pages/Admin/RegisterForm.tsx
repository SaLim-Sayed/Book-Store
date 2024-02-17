"use client";

import React, { useState } from "react";
import { useUserStore } from "../../../store/userStore";

import { SubmitHandler, useForm } from "react-hook-form";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";

import useSchema from "./Schema";
import { message } from "antd";
import axios from "axios";
import { APP_API } from "../../../API/api_url";

const RegisterForm = () => {
  const { user, setUserAndToken, token } = useUserStore();

  const RegisterSchema = useSchema();

  type Register = z.infer<typeof RegisterSchema>;
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Register>({
    resolver: zodResolver(RegisterSchema),
  });

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit: SubmitHandler<Register> = async (data) => {
    const form = new FormData();

    for (const [key, value] of Object.entries(data)) {
      form.append(key, value);
    }
    try {
      setIsLoading(true);
      const res = await axios.put(`${APP_API}api/v1/auth/profile`, data);
      setIsLoading(false);
      console.log(res.data);
      if (res?.data.success) {
        console.log(res.data);
        message.success(res.data.message);
        setUserAndToken(res.data.updatedUser, token);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error("Register Faild");
    }
    console.log(data);
    setIsLoading(false);
  };

  return (
    <form
      className="w-full flex  flex-col gap-[20px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-[12px]">
        <div>
          <Input
            {...register("name")}
            defaultValue={user?.name}
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
        <div className="flex flex-col gap-[12px]">
          <div>
            <Input
              {...register("email")}
              type="email"
              label="Email"
              variant="bordered"
              className="w-full"
              defaultValue={user?.email}
              isInvalid={errors.email ? true : false}
              errorMessage={errors.email?.message}
              classNames={{
                input: "text-[1.2rem]",
              }}
            />
          </div>
          <div>
            <Input
              {...register("newPassword")}
              label="Password"
              variant="bordered"
              errorMessage={errors.newPassword?.message}
              isInvalid={errors.newPassword ? true : false}
              endContent={
                <Button
                  variant="bordered"
                  className="border-none min-w-max p-0 pr-2"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <BsFillEyeFill className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <BsFillEyeSlashFill className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </Button>
              }
              type={isVisible ? "text" : "password"}
              className="w-full"
              classNames={{
                input: "text-[1.2rem]",
              }}
            />
          </div>
          <div>
            <Input
              {...register("phone")}
              defaultValue={user?.phone}
              type="text"
              label="phone"
              variant="bordered"
              className="w-full"
              isInvalid={errors.phone ? true : false}
              errorMessage={errors.phone?.message}
              classNames={{
                input: "text-[1.2rem]",
              }}
            />
          </div>
          <div>
            <Input
              {...register("address")}
              defaultValue={user?.address}
              type="text"
              label="address"
              variant="bordered"
              className="w-full"
              isInvalid={errors.address ? true : false}
              errorMessage={errors.address?.message}
              classNames={{
                input: "text-[1.2rem]",
              }}
            />
          </div>
          <div>
            <Input
              {...register("answer")}
              type="text"
              label="sport"
              variant="bordered"
              className="w-full"
              classNames={{
                input: "text-[1.2rem]",
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full gap-[32px]">
        <Button
          isLoading={isLoading}
          type="submit"
          className="bg-cyan-500 h-[64px]  text-lg text-white font-bold"
        >
          Update Profile
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
