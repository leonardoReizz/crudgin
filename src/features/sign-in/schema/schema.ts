import { zod } from "@/lib/utils";

export const signInSchema = zod.object({
  email: zod
    .string()
    .email({ message: "E-mail inválido" })
    .max(255, { message: "Máximo de 255 caracteres" }),
  password: zod
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

export type SignInSchemaType = zod.infer<typeof signInSchema>;
