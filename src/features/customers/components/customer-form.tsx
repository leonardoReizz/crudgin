"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { PhoneInput } from "@/components/ui/phone-input";

// type FormValues = z.input<typeof createCustomerSchema>;

interface Props {
  onSubmit: (values: any) => void;
  isPending?: boolean;
  form: UseFormReturn<any>;
}

export function CustomerForm({ form, onSubmit, isPending }: Props) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((v) => onSubmit(v))}
        className="flex flex-col w-full space-y-4"
      >
        <div className="flex gap-4 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Nome<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Insira seu nome completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Email<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Insira seu nome completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Telefone<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  {/* <Input placeholder="Insira seu nome completo" {...field} /> */}
                  <PhoneInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Data de Nascimento
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-norma h-10",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon />
                        {field.value ? (
                          format(field.value, "PPP", { locale: ptBR })
                        ) : (
                          <span>Selecione um data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(v) => field.onChange(v)}
                        initialFocus
                        fromYear={1950}
                        toYear={2022}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                Endereco<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Insira seu nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-x-4 ml-auto flex">
          <Button
            type="button"
            variant="secondary"
            disabled={isPending}
            onClick={() => form.reset()}
          >
            Cancelar
          </Button>
          <Button type="submit" isLoading={isPending}>
            Salvar
            <Plus className="size-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
