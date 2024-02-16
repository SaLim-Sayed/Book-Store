"use client";

import React, { useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";

import useSchema from "./Schema";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import { APP_API } from "../../../API/api_url";
import { useUserStore } from "../../../store/userStore";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const { setUserAndToken } = useUserStore();
  const LoginSchema = useSchema();

  type Login = z.infer<typeof LoginSchema>;
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(LoginSchema),
  });

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit: SubmitHandler<Login> = async (data) => {
    const form = new FormData();

    for (const [key, value] of Object.entries(data)) {
      form.append(key, value);
    }
    try {
      setIsLoading(true);
      const res = await axios.post(`${APP_API}api/v1/auth/login`, data);
      setIsLoading(false);
      console.log(res.data);
      if (res?.data.success) {
        setUserAndToken(res.data.user, res.data.token);
        message.success(res.data.message);
        navigate(location.state || "/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      message.error("Register Faild");
    }
  };

  return (
    <form
      className="w-full flex  flex-col gap-[20px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-[12px]">
        <div>
          <Input
            {...register("email")}
            type="email"
            label="Email"
            variant="bordered"
            className="w-full"
            isInvalid={errors.email ? true : false}
            errorMessage={errors.email?.message}
            size="lg"
            classNames={{
              input: "text-[1.2rem]",
            }}
          />
        </div>
        <div>
          <Input
            {...register("password")}
            label="Password"
            variant="bordered"
            errorMessage={errors.password?.message}
            isInvalid={errors.password ? true : false}
            size="lg"
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
      </div>
      <div className=" mx-auto">
        <NavLink to="/forgetPassword" className="  text-sm text-gray-400">
          You Forgot Password
        </NavLink>
      </div>
      <div className="flex flex-col w-full gap-[32px]">
        <Button
          isLoading={isLoading}
          type="submit"
          size="lg"
          className="bg-cyan-500 h-[64px]  text-lg text-white font-bold"
        >
          Login
        </Button>
        <div className="flex">
          you don't have an account?
          <NavLink
            to="/register"
            className="text-[14px] mx-[10px] text-cyan-500 font-[400]"
          >
            Sign Up
          </NavLink>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
