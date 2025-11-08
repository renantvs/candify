import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { candidatoSchema, CandidatoFormData } from "@/lib/validators";
import { areasInteresse } from "@/types/candidato";
import { formatTelefone, formatData } from "@/lib/format";
import { Candidato } from "@/types/candidato";

interface CandidatoModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CandidatoFormData) => Promise<void>;
  candidato?: Candidato | null;
  isLoading?: boolean;
}

export function CandidatoModal({
  open,
  onClose,
  onSubmit,
  candidato,
  isLoading,
}: CandidatoModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CandidatoFormData>({
    resolver: zodResolver(candidatoSchema),
    defaultValues: candidato || undefined,
  });

  const telefoneValue = watch("telefone");

  useEffect(() => {
    if (candidato) {
      reset(candidato);
    } else {
      reset({
        nome_completo: "",
        email: "",
        telefone: "",
        area_interesse: "",
        data_cadastro: formatData(new Date()),
      });
    }
  }, [candidato, reset]);

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatTelefone(e.target.value);
    setValue("telefone", formatted);
  };

  const handleFormSubmit = async (data: CandidatoFormData) => {
    await onSubmit(data);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-card animate-fade-in">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            {candidato ? "Editar Candidato" : "Novo Candidato"}
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {candidato
              ? "Atualize as informações do candidato."
              : "Adicione um novo candidato ao sistema."}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="nome_completo" className="font-semibold text-foreground">
              Nome completo
            </Label>
            <Input
              id="nome_completo"
              placeholder="Ex: João da Cunha Fontes"
              {...register("nome_completo")}
              className="bg-card border-border focus-visible:ring-primary"
            />
            {errors.nome_completo && (
              <p className="flex items-center gap-1 text-sm text-destructive">
                <AlertCircle className="h-3 w-3" />
                {errors.nome_completo.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="font-semibold text-foreground">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Ex: joao@email.com"
              {...register("email")}
              className="bg-card border-border focus-visible:ring-primary"
            />
            {errors.email && (
              <p className="flex items-center gap-1 text-sm text-destructive">
                <AlertCircle className="h-3 w-3" />
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefone" className="font-semibold text-foreground">
              Telefone
            </Label>
            <Input
              id="telefone"
              placeholder="Ex: (99) 99999-9999"
              value={telefoneValue || ""}
              onChange={handleTelefoneChange}
              maxLength={15}
              className="bg-card border-border focus-visible:ring-primary"
            />
            {errors.telefone && (
              <p className="flex items-center gap-1 text-sm text-destructive">
                <AlertCircle className="h-3 w-3" />
                {errors.telefone.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="area_interesse" className="font-semibold text-foreground">
              Área de Interesse
            </Label>
            <Select
              value={watch("area_interesse")}
              onValueChange={(value) => setValue("area_interesse", value)}
            >
              <SelectTrigger className="bg-card border-border focus:ring-primary">
                <SelectValue placeholder="Selecione a Área de interesse" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                {areasInteresse.map((area) => (
                  <SelectItem key={area} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.area_interesse && (
              <p className="flex items-center gap-1 text-sm text-destructive">
                <AlertCircle className="h-3 w-3" />
                {errors.area_interesse.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="data_cadastro" className="font-semibold text-foreground">
              Data de Cadastro
            </Label>
            <Input
              id="data_cadastro"
              placeholder="dd/mm/aaaa"
              {...register("data_cadastro")}
              className="bg-card border-border focus-visible:ring-primary"
              readOnly
            />
            {errors.data_cadastro && (
              <p className="flex items-center gap-1 text-sm text-destructive">
                <AlertCircle className="h-3 w-3" />
                {errors.data_cadastro.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-primary hover:bg-primary-hover text-primary-foreground font-medium shadow-sm transition-all hover:shadow-md"
          >
            {isLoading
              ? candidato
                ? "Salvando..."
                : "Adicionando..."
              : candidato
              ? "Salvar Alterações"
              : "Adicionar Candidato"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}