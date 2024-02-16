import { z } from "zod";

export default function useSchema() {
  const validator = z.object({ 
    email: z
      .string()
      .email({
        message: "Please enter a valid email",
      })
      .min(5),
    newPassword: z.string().min(4, { message: "Password is too short" }),
   
    answer: z.string().min(4, { message: "Answer is Required" }),
  });

  return validator;
}
