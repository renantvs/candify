import { Menu, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-[72px] items-center justify-between border-b border-border bg-card px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger>
          <Button variant="ghost" size="icon" aria-label="Abrir menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SidebarTrigger>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" aria-label="Alternar tema">
          <Sun className="h-5 w-5 text-muted-foreground" />
        </Button>

        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 bg-primary">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">LR</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium text-foreground sm:inline-block">Olá, Luciana Regis</span>
        </div>
      </div>
    </header>
  );
}
