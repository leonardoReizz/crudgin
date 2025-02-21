"use client";

import { CustomerForm } from "@/features/customers/components/customer-form";
import { createCustomerSchema } from "@/features/customers/schema/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof createCustomerSchema>>({
    resolver: zodResolver(createCustomerSchema),
    defaultValues: {
      address: "",
      birthDate: new Date(),
      email: "",
      name: "",
      phone: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof createCustomerSchema>) => {
      const response = await fetch("/api/customer", {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Erro inesperado");
      }
      const json = await response.json();
      return json?.message;
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["customers"] });
      toast.success("Cliente cadastrado");
      router.push("/customers");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return (
    <div className="w-full space-y-4">
      <div className="max-md:inline hidden">
        <SidebarTrigger />
      </div>
      <div className="flex gap-2 items-center">
        <Button
          className="w-9 h-9"
          onClick={() => router.push("/customers")}
          disabled={mutation.isPending}
          variant={"outline"}
        >
          <ArrowLeft className="size-4" />
        </Button>
        <h4 className="text-2xl font-bold">Cadastrar Cliente</h4>
      </div>
      <Card>
        <CardContent className="p-4">
          <CustomerForm
            onSubmit={mutation.mutate}
            form={form}
            isPending={mutation.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
