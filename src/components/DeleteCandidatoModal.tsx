import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Candidato } from "@/types/candidato";

interface DeleteCandidatoModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  candidato: Candidato | null;
  isLoading?: boolean;
}

export function DeleteCandidatoModal({
  open,
  onClose,
  onConfirm,
  candidato,
  isLoading,
}: DeleteCandidatoModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] bg-card animate-fade-in">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="h-12 w-12 rounded-full bg-destructive-light flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>

          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-foreground">
              Confirmar Exclusão
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground pt-2">
              Tem certeza que deseja excluir o candidato{" "}
              <strong className="text-foreground">{candidato?.nome_completo}</strong>? 
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-3 w-full pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 border-border"
            >
              Cancelar
            </Button>
            <Button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              {isLoading ? "Excluindo..." : "Excluir"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}