import { Briefcase, Calendar, Pencil, Trash2, MoreVertical, Mail } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Candidato } from "@/types/candidato";

interface CandidatoCardProps {
  candidato: Candidato;
  onEdit: (candidato: Candidato) => void;
  onDelete: (candidato: Candidato) => void;
  onEmail: (candidato: Candidato) => void;
}

export function CandidatoCard({ candidato, onEdit, onDelete, onEmail }: CandidatoCardProps) {
  const initials = candidato.nome_completo
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="w-full group relative rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      {/* Container principal com foto, nome e botões */}
      <div className="flex items-center sm:items-start gap-4 mb-3 sm:mb-0">
        <Avatar className="h-12 w-12 flex-shrink-0 bg-muted">
          <AvatarFallback className="bg-muted text-muted-foreground font-medium">{initials}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base text-foreground sm:mb-3">{candidato.nome_completo}</h3>

          {/* Dados visíveis apenas no DESKTOP */}
          <div className="hidden sm:block space-y-2">
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

        {/* Botões visíveis apenas no DESKTOP */}
        <div className="hidden sm:flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-blue-600 hover:bg-blue-50 hover:text-blue-600"
            onClick={() => onEmail(candidato)}
            aria-label="Enviar e-mail"
          >
            <Mail className="h-4 w-4" />
          </Button>

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

        {/* Menu dropdown com três pontos - visível apenas no MOBILE */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="sm:hidden h-8 w-8" aria-label="Mais opções">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem
              onClick={() => onEmail(candidato)}
              className="cursor-pointer"
            >
              <Mail className="h-4 w-4 mr-2" />
              Enviar E-mail
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={() => onEdit(candidato)} className="cursor-pointer">
              <Pencil className="h-4 w-4 mr-2" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(candidato)}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Dados visíveis apenas no MOBILE - alinhados à esquerda */}
      <div className="sm:hidden space-y-2">
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <Briefcase className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <span className="break-words">
            <span className="font-medium">Área de Interesse:</span> {candidato.area_interesse}
          </span>
        </div>

        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <span className="break-words">
            <span className="font-medium">Data de Cadastro:</span> {candidato.data_cadastro}
          </span>
        </div>
      </div>
    </div>
  );
}
