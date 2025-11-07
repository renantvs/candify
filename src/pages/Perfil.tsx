import { User } from "lucide-react";

export default function Perfil() {
  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <User className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Página de Perfil
        </h3>
        <p className="text-sm text-muted-foreground">
          Esta página estará disponível em breve.
        </p>
      </div>
    </div>
  );
}