"use client";

import React, { useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";

import useSchema from "./Schema";
import {   useNavigate,   } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import { APP_API } from "../../../API/api_url";

const ForgetPasswordForm = () => {
  const navigate =useNavigate()
  const ForgetPasswordSchema = useSchema();

  type ForgetPassword = z.infer<typeof ForgetPasswordSchema>;
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<ForgetPassword>({
    resolver: zodResolver(ForgetPasswordSchema),
  });

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit: SubmitHandler<ForgetPassword> = async (data) => {
    const form = new FormData();

    for (const [key, value] of Object.entries(data)) {
      form.append(key, value);
    }
    try {
      setIsLoading(true);
  const res = await axios.post(`${APP_API}api/v1/auth/forgot-password`, data);
      setIsLoading(false);
      console.log(res.data);
      if (res?.data.success) {
        message.success(res.data.message);
        navigate('/login')
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
              {...register("answer")}
              type="text"
              label="sport"
              variant="bordered"
              className="w-full"
              isInvalid={errors.answer ? true : false}
              errorMessage={errors.answer?.message}
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
          Reset
        </Button>
        
      </div>
    </form>
  );
};

export default ForgetPasswordForm;
