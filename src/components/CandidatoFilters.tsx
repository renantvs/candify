import { Search, Filter, Plus, Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { areasInteresse } from "@/types/candidato";
import { formatData } from "@/lib/format";
import { cn } from "@/lib/utils";

interface CandidatoFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedArea: string;
  setSelectedArea: (value: string) => void;
  selectedPeriod: string;
  setSelectedPeriod: (value: string) => void;
  customStartDate: Date | undefined;
  setCustomStartDate: (date: Date | undefined) => void;
  customEndDate: Date | undefined;
  setCustomEndDate: (date: Date | undefined) => void;
  onNovoCandidato: () => void;
}

export function CandidatoFilters({
  searchTerm,
  setSearchTerm,
  selectedArea,
  setSelectedArea,
  selectedPeriod,
  setSelectedPeriod,
  customStartDate,
  setCustomStartDate,
  customEndDate,
  setCustomEndDate,
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
          <SelectItem value="todas">Data de Cadastro</SelectItem>
          <SelectItem value="hoje">Hoje</SelectItem>
          <SelectItem value="ultimos7">Últimos 7 dias</SelectItem>
          <SelectItem value="ultimos30">Últimos 30 dias</SelectItem>
          <SelectItem value="estemes">Este mês</SelectItem>
          <SelectItem value="personalizado">Personalizado</SelectItem>
        </SelectContent>
      </Select>

      <Button
        onClick={onNovoCandidato}
        className="h-11 bg-primary hover:bg-primary-hover text-primary-foreground font-medium shadow-sm transition-all hover:shadow-md"
      >
        <Plus className="h-4 w-4 mr-2" />
        Cadastrar Candidato
      </Button>

      {selectedPeriod === "personalizado" && (
        <div className="col-span-1 md:col-span-2 lg:col-span-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Data Inicial</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-11 justify-start text-left font-normal bg-card border-border",
                    !customStartDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {customStartDate ? formatData(customStartDate) : "Selecione a data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={customStartDate}
                  onSelect={setCustomStartDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Data Final</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-11 justify-start text-left font-normal bg-card border-border",
                    !customEndDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {customEndDate ? formatData(customEndDate) : "Selecione a data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={customEndDate}
                  onSelect={setCustomEndDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}
    </div>
  );
}
