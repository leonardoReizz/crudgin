import { z } from "zod";

export const signUpSchema = z
  .object({
    fullName: z
      .string()
      .min(5, { message: "O nome completo deve ter pelo menos 5 caracteres" })
      .max(55, { message: "O nome completo deve ter no máximo 55 caracteres" }),
    email: z
      .string()
      .email({ message: "E-mail inválido" })
      .max(255, { message: "O e-mail deve ter no máximo 255 caracteres" }),
    password: z
      .string()
      .min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
      .max(32, { message: "A senha deve ter no máximo 32 caracteres" }),
    confirmPassword: z.string().min(8, {
      message: "A confirmação de senha deve ter pelo menos 8 caracteres",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
      });
    }
  });

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
