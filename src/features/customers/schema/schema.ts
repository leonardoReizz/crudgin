import { zod } from "@/lib/utils";

export const createCustomerSchema = zod.object({
  name: zod.string().min(1, { message: "O nome é obrigatório" }),
  email: zod
    .string()
    .email({ message: "E-mail inválido" })
    .max(255, { message: "O e-mail deve ter no máximo 255 caracteres" }),
  phone: zod
    .string()
    .max(32, { message: "O telefone deve ter no máximo 32 caracteres" }),
  address: zod.string().min(1, { message: "O endereço é obrigatório" }),
  birthDate: zod.coerce.date({ message: "Data de nascimento inválida" }),
});

export const updateCustomerSchema = zod.object({
  name: zod.string().min(1, { message: "O nome é obrigatório" }),
  email: zod
    .string()
    .email({ message: "E-mail inválido" })
    .max(255, { message: "O e-mail deve ter no máximo 255 caracteres" }),
  phone: zod
    .string()
    .max(32, { message: "O telefone deve ter no máximo 32 caracteres" }),
  address: zod.string().min(1, { message: "O endereço é obrigatório" }),
  birthDate: zod.coerce.date({ message: "Data de nascimento inválida" }),
  id: zod
    .string()
    .max(32, { message: "O ID deve ter no máximo 32 caracteres" }),
});

export const deleteManyCustomersSchema = zod.object({
  ids: zod
    .string()
    .array()
    .min(1, { message: "É necessário informar pelo menos um ID" }),
});

export type UpdateCustomerSchemaType = zod.infer<typeof updateCustomerSchema>;
export type CreateCustomerSchemaType = zod.infer<typeof createCustomerSchema>;
export type DeleteCustomerSchemaType = zod.infer<
  typeof deleteManyCustomersSchema
>;
