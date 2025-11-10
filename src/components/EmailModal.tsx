import { useEffect } from "react";
import { Mail, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Candidato } from "@/types/candidato";
import { emailFormSchema, EmailFormData } from "@/lib/validators";

interface EmailModalProps {
  open: boolean;
  onClose: () => void;
  candidato: Candidato | null;
}

export function EmailModal({ open, onClose, candidato }: EmailModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    watch,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailFormSchema),
    mode: "onChange",
  });

  const assuntoValue = watch("assunto") || "";
  const mensagemValue = watch("mensagem") || "";

  useEffect(() => {
    if (open) {
      reset({ de: "", assunto: "", mensagem: "" });
    }
  }, [open, reset]);

  const onSubmit = (data: EmailFormData) => {
    if (!candidato) return;

    const mailtoLink = `mailto:${candidato.email}?subject=${encodeURIComponent(data.assunto)}&body=${encodeURIComponent(data.mensagem)}`;
    window.location.href = mailtoLink;

    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground flex items-center justify-center sm:justify-start gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Enviar E-mail
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">Envie um e-mail para {candidato?.nome_completo}</p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="de" className="font-semibold text-foreground">
              De:
            </Label>
            <Input
              id="de"
              type="email"
              placeholder="seu-email@exemplo.com"
              {...register("de")}
              className="bg-card border-border focus-visible:ring-primary"
            />
            {errors.de && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.de.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="para" className="font-semibold text-foreground">
              Para:
            </Label>
            <Input
              id="para"
              type="email"
              value={candidato?.email || ""}
              disabled
              className="bg-muted border-border cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="assunto" className="font-semibold text-foreground">
              Assunto: <span className="text-xs text-muted-foreground">({assuntoValue.length}/200)</span>
            </Label>
            <Input
              id="assunto"
              placeholder="Digite o assunto do e-mail"
              {...register("assunto")}
              className="bg-card border-border focus-visible:ring-primary"
            />
            {errors.assunto && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.assunto.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="mensagem" className="font-semibold text-foreground">
              Mensagem: <span className="text-xs text-muted-foreground">({mensagemValue.length}/2000)</span>
            </Label>
            <Textarea
              id="mensagem"
              placeholder="Digite sua mensagem aqui..."
              {...register("mensagem")}
              rows={8}
              className="bg-card border-border focus-visible:ring-primary resize-none"
            />
            {errors.mensagem && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.mensagem.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={!isValid}
            className="w-full h-12 bg-primary hover:bg-primary-hover text-primary-foreground font-medium shadow-sm transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Mail className="h-4 w-4 mr-2" />
            Enviar E-mail
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
