"use client";

import { CustomerForm } from "@/features/customers/components/customer-form";
import {
  CreateCustomerSchemaType,
  updateCustomerSchema,
  UpdateCustomerSchemaType,
} from "@/features/customers/schema/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect } from "react";
import { Customer } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Page() {
  const form = useForm<UpdateCustomerSchemaType>({
    resolver: zodResolver(updateCustomerSchema),
    defaultValues: {
      address: "",
      birthDate: new Date(),
      email: "",
      name: "",
      phone: "",
      id: "",
    },
  });
  const router = useRouter();
  const queryClient = useQueryClient();

  const { id } = useParams();

  const { data, isLoading } = useQuery<Customer | undefined>({
    queryKey: ["customer", id],
    queryFn: async () => {
      const response = await fetch(`/api/customer/${id}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Erro inesperado");
      }
      const json = await response.json();
      return json?.message;
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        id: data.id,
        address: data.address,
        birthDate: new Date(data.birthDate),
        email: data.email,
        name: data.name,
        phone: data.phone,
      });
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: async (values: CreateCustomerSchemaType) => {
      const response = await fetch("/api/customer", {
        method: "PUT",
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
      await queryClient.refetchQueries({ queryKey: ["customer", id] });
      toast.success("Cliente atualizado");
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
          variant="outline"
        >
          <ArrowLeft className="size-4" />
        </Button>
        <h4 className="text-2xl font-bold">Editando: {data?.name}</h4>
      </div>
      <Card>
        <CardContent className="p-4 min-h-[300px]">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[300px]">
              <Loader2 className="animate-spin size-8" />
            </div>
          ) : (
            <CustomerForm
              onSubmit={mutation.mutate}
              form={form}
              isPending={mutation.isPending}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
