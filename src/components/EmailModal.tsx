import { useState } from "react";
import { Mail } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Candidato } from "@/types/candidato";

interface EmailModalProps {
  open: boolean;
  onClose: () => void;
  candidato: Candidato | null;
}

export function EmailModal({ open, onClose, candidato }: EmailModalProps) {
  const [de, setDe] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleEnviar = () => {
    if (!candidato) return;

    const mailtoLink = `mailto:${candidato.email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(mensagem)}`;
    window.location.href = mailtoLink;

    setDe("");
    setAssunto("");
    setMensagem("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Enviar E-mail
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">Envie um e-mail para {candidato?.nome_completo}</p>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="de" className="font-semibold text-foreground">
              De:
            </Label>
            <Input
              id="de"
              type="email"
              placeholder="seu-email@exemplo.com"
              value={de}
              onChange={(e) => setDe(e.target.value)}
              className="bg-card border-border focus-visible:ring-primary"
            />
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
              Assunto:
            </Label>
            <Input
              id="assunto"
              placeholder="Digite o assunto do e-mail"
              value={assunto}
              onChange={(e) => setAssunto(e.target.value)}
              className="bg-card border-border focus-visible:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mensagem" className="font-semibold text-foreground">
              Mensagem:
            </Label>
            <Textarea
              id="mensagem"
              placeholder="Digite sua mensagem aqui..."
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              rows={8}
              className="bg-card border-border focus-visible:ring-primary resize-none"
            />
          </div>

          <Button
            onClick={handleEnviar}
            className="w-full h-12 bg-primary hover:bg-primary-hover text-primary-foreground font-medium shadow-sm transition-all hover:shadow-md"
          >
            <Mail className="h-4 w-4 mr-2" />
            Enviar E-mail
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
