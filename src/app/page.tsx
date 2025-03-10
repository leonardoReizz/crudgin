"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import {
  signInSchema,
  SignInSchemaType,
} from "@/features/sign-in/schema/schema";

export default function Home() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: SignInSchemaType) => {
      const response = await signIn("auth-tidi", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (response?.error) {
        throw new Error(response?.error || "Erro inesperado");
      }

      return response;
    },
    onSuccess: () => {
      router.push("/customers");
    },
    onError: (error) => {
      if (error.message === "Credenciais invalidas") {
        form.setError("email", { message: "Email ou senha invalidos" });
        form.setError("password", { message: "Email ou senha invalidos" });
      }
      toast.error(error?.message || "Erro inesperado");
    },
  });

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Card className="w-full max-w-[350px]">
        <CardHeader className="items-center">
          <Image src="/logo.svg" alt="" width={40} height={40} />
          <CardTitle className="text-3xl">Login</CardTitle>
          <CardDescription>Seja bem vindo novamente!</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit((v) => mutation.mutate(v))}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Insira seu email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" isLoading={mutation.isPending}>
                Entrar
              </Button>
            </form>
            <div className="text-sm text-muted-foreground flex gap-1 items-center justify-center mt-4">
              <p>Ainda nao possui uma conta?</p>
              <Button
                variant="link"
                className="text-primary underline p-0"
                onClick={() => router.push("/sign-up")}
              >
                Clique Aqui
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
