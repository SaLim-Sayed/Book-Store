import { z } from "zod";

export default function useSchema() {
  const validator = z.object({
    name:z.string().min(3, { message: "Name is too short" }),
    email: z
      .string()
      .email({
        message: "Please enter a valid email",
      })
      .min(5),
    newPassword: z.string().min(4, { message: "Password is too short" }),
    phone: z.string().min(4, { message: "Please enter a valid phone number" }),
    address: z.string().min(4, { message: "Please enter a valid address" }),
    answer: z.string().min(4, { message: "Answer is Required" }),
  });

  return validator;
}
