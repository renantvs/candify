import { useState, useEffect, useMemo } from "react";
import { Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Candidato } from "@/types/candidato";
import { CandidatoFormData } from "@/lib/validators";
import { CandidatoCard } from "@/components/CandidatoCard";
import { CandidatoFilters } from "@/components/CandidatoFilters";
import { CandidatoModal } from "@/components/CandidatoModal";
import { DeleteCandidatoModal } from "@/components/DeleteCandidatoModal";
import toast from "react-hot-toast";
import { parseDataString } from "@/lib/format";
import { Skeleton } from "@/components/ui/skeleton";

export default function Candidatos() {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("todas");
  const [selectedPeriod, setSelectedPeriod] = useState("todas");

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingCandidato, setEditingCandidato] = useState<Candidato | null>(null);
  const [deletingCandidato, setDeletingCandidato] = useState<Candidato | null>(null);

  useEffect(() => {
    fetchCandidatos();
  }, []);

  const fetchCandidatos = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.from("candidatos").select("*").order("created_at", { ascending: false });

      if (error) throw error;
      setCandidatos(data || []);
    } catch (error) {
      console.error("Erro ao buscar candidatos:", error);
      toast.error("❌ Erro ao carregar candidatos. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCandidato = async (data: CandidatoFormData) => {
    try {
      setIsSubmitting(true);
      const { error } = await supabase.from("candidatos").insert([
        {
          nome_completo: data.nome_completo,
          email: data.email,
          telefone: data.telefone,
          area_interesse: data.area_interesse,
          data_cadastro: data.data_cadastro,
        },
      ]);

      if (error) throw error;

      toast.success("Candidato cadastrado com sucesso!");
      setModalOpen(false);
      fetchCandidatos();
    } catch (error) {
      console.error("Erro ao criar candidato:", error);
      toast.error("❌ Erro ao cadastrar candidato. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateCandidato = async (data: CandidatoFormData) => {
    if (!editingCandidato) return;

    try {
      setIsSubmitting(true);
      const { error } = await supabase
        .from("candidatos")
        .update({
          nome_completo: data.nome_completo,
          email: data.email,
          telefone: data.telefone,
          area_interesse: data.area_interesse,
          data_cadastro: data.data_cadastro,
        })
        .eq("id", editingCandidato.id);

      if (error) throw error;

      toast.success("Candidato atualizado com sucesso!");
      setModalOpen(false);
      setEditingCandidato(null);
      fetchCandidatos();
    } catch (error) {
      console.error("Erro ao atualizar candidato:", error);
      toast.error("❌ Erro ao atualizar candidato. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCandidato = async () => {
    if (!deletingCandidato) return;

    try {
      setIsSubmitting(true);
      const { error } = await supabase.from("candidatos").delete().eq("id", deletingCandidato.id);

      if (error) throw error;

      toast.success("Candidato excluído com sucesso!");
      setDeleteModalOpen(false);
      setDeletingCandidato(null);
      fetchCandidatos();
    } catch (error) {
      console.error("Erro ao excluir candidato:", error);
      toast.error("❌ Erro ao excluir candidato. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCandidatos = useMemo(() => {
    let filtered = candidatos;

    // Filtro de busca por nome
    if (searchTerm.trim()) {
      filtered = filtered.filter((c) => c.nome_completo.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Filtro por área
    if (selectedArea !== "todas") {
      filtered = filtered.filter((c) => c.area_interesse === selectedArea);
    }

    // Filtro por período
    if (selectedPeriod !== "todas") {
      const now = new Date();
      filtered = filtered.filter((c) => {
        const dataCadastro = parseDataString(c.data_cadastro);
        if (!dataCadastro) return false;

        const diffDays = Math.floor((now.getTime() - dataCadastro.getTime()) / (1000 * 60 * 60 * 24));

        switch (selectedPeriod) {
          case "hoje":
            return diffDays === 0;
          case "ultimos7":
            return diffDays <= 7;
          case "ultimos30":
            return diffDays <= 30;
          case "estemes":
            return dataCadastro.getMonth() === now.getMonth() && dataCadastro.getFullYear() === now.getFullYear();
          case "mespassado":
            const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
            return (
              dataCadastro.getMonth() === lastMonth.getMonth() && dataCadastro.getFullYear() === lastMonth.getFullYear()
            );
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [candidatos, searchTerm, selectedArea, selectedPeriod]);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <CandidatoFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedArea={selectedArea}
          setSelectedArea={setSelectedArea}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          onNovoCandidato={() => {
            setEditingCandidato(null);
            setModalOpen(true);
          }}
        />
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-[140px] rounded-xl" />
          ))}
        </div>
      ) : filteredCandidatos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Users className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum candidato cadastrado</h3>
          <p className="text-sm text-muted-foreground">
            {searchTerm || selectedArea !== "todas" || selectedPeriod !== "todas"
              ? "Nenhum candidato encontrado com os filtros selecionados."
              : "Comece adicionando seu primeiro candidato."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCandidatos.map((candidato) => (
            <CandidatoCard
              key={candidato.id}
              candidato={candidato}
              onEdit={(c) => {
                setEditingCandidato(c);
                setModalOpen(true);
              }}
              onDelete={(c) => {
                setDeletingCandidato(c);
                setDeleteModalOpen(true);
              }}
            />
          ))}
        </div>
      )}

      <CandidatoModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingCandidato(null);
        }}
        onSubmit={editingCandidato ? handleUpdateCandidato : handleCreateCandidato}
        candidato={editingCandidato}
        isLoading={isSubmitting}
      />

      <DeleteCandidatoModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setDeletingCandidato(null);
        }}
        onConfirm={handleDeleteCandidato}
        candidato={deletingCandidato}
        isLoading={isSubmitting}
      />
    </div>
  );
}
