import { z } from "zod";

export default function useSchema() {
  const validator = z.object({
    email: z
      .string()
      .email({
        message: "Please enter a valid email",
      })
      .min(5),
    password: z.string().min(4, { message: "Password is too short" }),
  });

  return validator;
}
