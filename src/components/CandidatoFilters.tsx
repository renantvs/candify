import { Search, Filter, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { areasInteresse } from "@/types/candidato";

interface CandidatoFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedArea: string;
  setSelectedArea: (value: string) => void;
  selectedPeriod: string;
  setSelectedPeriod: (value: string) => void;
  onNovoCandidato: () => void;
}

export function CandidatoFilters({
  searchTerm,
  setSearchTerm,
  selectedArea,
  setSelectedArea,
  selectedPeriod,
  setSelectedPeriod,
  onNovoCandidato,
}: CandidatoFiltersProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Nome do Candidato"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-11 pl-10 bg-card border-border focus-visible:ring-primary"
        />
      </div>

      <Select value={selectedArea} onValueChange={setSelectedArea}>
        <SelectTrigger className="h-11 bg-card border-border focus:ring-primary">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder="Área de Interesse" />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-popover z-50">
          <SelectItem value="todas">Área de Interesse</SelectItem>
          {areasInteresse.map((area) => (
            <SelectItem key={area} value={area}>
              {area}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
        <SelectTrigger className="h-11 bg-card border-border focus:ring-primary">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder="Data de Cadastro" />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-popover z-50">
          <SelectItem value="todas">Data</SelectItem>
          <SelectItem value="hoje">Hoje</SelectItem>
          <SelectItem value="ultimos7">Últimos 7 dias</SelectItem>
          <SelectItem value="ultimos30">Últimos 30 dias</SelectItem>
          <SelectItem value="estemes">Este mês</SelectItem>
          <SelectItem value="mespassado">Mês passado</SelectItem>
        </SelectContent>
      </Select>

      <Button
        onClick={onNovoCandidato}
        className="h-11 bg-primary hover:bg-primary-hover text-primary-foreground font-medium shadow-sm transition-all hover:shadow-md"
      >
        <Plus className="h-4 w-4 mr-2" />
        Cadastrar Candidato
      </Button>
    </div>
  );
}
