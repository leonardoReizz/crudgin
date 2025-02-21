import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";
import { Button } from "./button";

type InputType = React.HTMLInputTypeAttribute | "currency";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  currencyFormat?: Intl.NumberFormat;
  type?: InputType;
}

const defaultCurrencyFormat = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, onChange, currencyFormat, type, ...props }, ref) => {
    const [isVibisible, setIsVisible] = React.useState<boolean>(false);
    const isCurrency = type === "currency";
    const inputType = isCurrency ? "text" : type;

    const formatCurrency = (value: number) => {
      return (currencyFormat ?? defaultCurrencyFormat).format(value);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (isCurrency) {
        const target = e.currentTarget;
        target.setSelectionRange(target.value.length, target.value.length);
      }
      // onFocus?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isCurrency) {
        const target = e.currentTarget;
        const numericValue = Number(target.value.replace(/\D/g, "")) / 100;
        target.value = formatCurrency(numericValue);
      }
      onChange?.(e);
    };

    if (type === "password")
      return (
        <div className="relative">
          <input
            type={inputType === "password" && isVibisible ? "text" : type}
            className={cn(
              "flex h-10 w-full rounded-md !pr-10 border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              className,
            )}
            ref={ref}
            maxLength={isCurrency ? 22 : undefined}
            onFocus={handleFocus}
            onChange={handleChange}
            {...props}
          />
          <Button
            className="absolute right-[4px] p-2 h-[calc(100%-4px)] top-[2px]"
            variant="ghost"
            type="button"
            onClick={() => setIsVisible((x) => !x)}
          >
            <Eye className="size-4" />
          </Button>
        </div>
      );

    return (
      <input
        type={inputType}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
          "ring-offset-background file:border-0 file:bg-transparent file:text-sm",
          "file:font-medium file:text-foreground placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        maxLength={isCurrency ? 22 : undefined}
        onFocus={handleFocus}
        onChange={handleChange}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
