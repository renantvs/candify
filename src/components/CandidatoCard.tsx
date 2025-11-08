import { Briefcase, Calendar, Pencil, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Candidato } from "@/types/candidato";

interface CandidatoCardProps {
  candidato: Candidato;
  onEdit: (candidato: Candidato) => void;
  onDelete: (candidato: Candidato) => void;
}

export function CandidatoCard({ candidato, onEdit, onDelete }: CandidatoCardProps) {
  const initials = candidato.nome_completo
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="group relative rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <div className="flex items-start gap-4">
        <Avatar className="h-12 w-12 flex-shrink-0 bg-muted">
          <AvatarFallback className="bg-muted text-muted-foreground font-medium">{initials}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base text-foreground mb-3">{candidato.nome_completo}</h3>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Briefcase className="h-4 w-4 flex-shrink-0" />
              <span>Área de Interesse: {candidato.area_interesse}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span>Data de Cadastro: {candidato.data_cadastro}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-primary hover:bg-primary-light hover:text-primary"
            onClick={() => onEdit(candidato)}
            aria-label="Editar candidato"
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:bg-destructive-light hover:text-destructive"
            onClick={() => onDelete(candidato)}
            aria-label="Excluir candidato"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
