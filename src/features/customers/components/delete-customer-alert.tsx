import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReactNode } from "react";
import { useDeleteCustomer } from "../hooks/use-delete-customer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface Props {
  trigger?: ReactNode;
  handleDelete?: () => void;
}

export function DeleteCustomerAlert({ trigger, handleDelete }: Props) {
  const { isOpen, onClose, customers } = useDeleteCustomer();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/customer", {
        method: "DELETE",
        body: JSON.stringify({ ids: customers?.map((t) => t.id) }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Erro inesperado");
      }
      const json = await response.json();
      return json.message;
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["customers"] });
      toast.error(
        (customers || [])?.length > 1
          ? "Clientes deletados"
          : "Cliente deletado",
      );
      onClose();
      handleDelete?.();
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <span className="text-red-500">Cuidado:</span> Voce esta prestes a
            excluir um cliente!
          </AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza de que deseja excluir permanentemente{" "}
            {customers?.length === 1 ? (
              <>
                o cliente{" "}
                <span className="text-red-500">{customers?.[0]?.name}</span>
              </>
            ) : (
              <span className="text-red-500">{customers?.length} clientes</span>
            )}
            ? Esta ação não pode ser desfeita e todos os dados relacionados ao
            cliente, incluindo histórico de empréstimos e faturas, serão
            removidos permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button
            isLoading={mutation.isPending}
            onClick={() => mutation.mutate()}
          >
            Continuar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
