import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { z as zod } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const customErrorMap: zod.ZodErrorMap = (issue, ctx) => {
  const errorMessages: Record<string, string> = {
    invalid_type: "Tipo inválido",
    invalid_string: "Deve ser uma string válida",
    too_big: "O valor é muito grande",
    too_small: "O valor é muito pequeno",
    invalid_email: "E-mail inválido",
  };

  return { message: errorMessages[issue.code] || ctx.defaultError };
};

zod.setErrorMap(customErrorMap);

export { zod };
