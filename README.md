## 🧠 Candify – Plataforma Web para Gestão de Candidatos

**Arquitetura, Decisões Técnicas e Boas Práticas Para Escalabilidade**

Este repositório apresenta uma solução completa desenvolvida para o desafio técnico de desenvolvedor.  
Embora o escopo solicitasse apenas um cadastro simples, o projeto foi estruturado com foco em **escalabilidade, arquitetura limpa, UX, componentização e boas práticas de engenharia** — alinhado a padrões utilizados em aplicações modernas de produção.

  
## 🎯 Objetivo do Desafio

**Requisito original:**  
Criar uma aplicação para cadastro de candidatos contendo os campos:

- Nome completo
- E-mail
- Telefone
- Área de interesse
- Data de cadastro

**Funcionalidades solicitadas:**

- Inserir, visualizar e editar dados
- Limpar ou excluir registros


## 🚀 Escopo Entregue

O projeto foi desenvolvido com uma visão de produto real, incluindo:

✅ CRUD completo com persistência  
✅ UI/UX otimizada e responsiva  
✅ Validação e máscaras de inputs  
✅ Componentização reutilizável e padronizada  
✅ Arquitetura escalável e tipada  
✅ Design System com shadcn-ui  
✅ Gestão de estados bem estruturada  
✅ Preparado para futuras integrações com API e Banco de Dados


## 🧱 Arquitetura da Aplicação

A aplicação segue princípios de arquitetura limpa adaptados para front-end:

src/
├─ components/ # Componentes reutilizáveis (UI + lógicos)
├─ pages/ # Páginas do app (view layer)
├─ hooks/ # Hooks customizados (regras de negócio isoladas)
├─ lib/ # Serviços, utils e abstrações
├─ types/ # Tipagens e modelos
├─ context/ # Context API para estados globais
└─ styles/ # Estilos globais e configs

### Pilares arquiteturais aplicados

Pilar - Como foi aplicado

**Componentização** - UI modular, com desacoplamento entre layout, regra e dados.
**Type Safety** - imagem completa com TypeScript para prevenir erros em build e runtime.
**Single Source of Truth** - Context + hooks para centralizar estado e lógica.
**Design System** - Uso de shadcn-ui como base de componente + Tailwind.
**Clean Code** - Código autoexplicativo, funções puras e baixo acoplamento.
**Escalabilidade** - Estrutura permite adição de módulos e features sem retrabalho estrutural.


## 🧩 Decisões Técnicas (com Racional e Trade-offs)

| Decisão                   | Motivação Técnica                                            | Trade-offs                                                        |
| ------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------- |
| - **React + TS + Vite**   | Performance, DX eficiente e tipagem para evitar bugs         | Curva de aprendizado para devs iniciantes.                        |
| - **shadcn-ui**           | Componentes acessíveis, extensíveis e com design consistente | Maior responsabilidade por customização.                          |
| - **Tailwind CSS**        | Rapidez de desenvolvimento e consistência visual             | Classes utilitárias podem causar poluição visual sem disciplina.  |
| - **Context** + **Hooks** | Mantém regras de negócio isoladas e reutilizáveis            | Para apps maiores, pode evoluir para Zustand/Jotai/Redux Toolkit. |
| - Arquitetura modular     | Facilita manutenção, testes e novas features                 | Estrutura mais robusta que o mínimo necessário ao desafio.        |

**Resumo:** As escolhas priorizaram: qualidade, escalabilidade e boas práticas, mesmo para um projeto pequeno.


## 🔥 Funcionalidades

### Core

- Adicionar, editar, listar e excluir candidatos
- Persistência de dados (pode ser local ou conectada ao Supabase)
- Máscaras e validações para inputs
- Componente de tabela responsiva

### UX Enhancements

- Feedback visual ao usuário
- Confirmação antes de exclusão
- Acessibilidade e navegação fluida

### Pronto para Evolução

A estrutura suporta facilmente extensões, como:

- Autenticação e RBAC
- Exportação CSV
- Etiquetas e pipelines de recrutamento
- Persistência em banco real relacional ou NoSQL
- Painel analítico (BI de RH)
  

## 🧬 Possível Evolução de Arquitetura (se escalado para produto real)

Se o produto evoluísse, a projeção arquitetural seria:

### Versão 2.0 – Web App completo com backend

- **Front-end:** Next.js + Server Actions
- **Backend:** Node + NestJS/Express + tRPC
- **DB:** Postgres + Prisma
- **Auth:** Supabase Auth ou Clerk
- **Infra:** Docker + CI/CD + Observabilidade

### Versão 3.0 – SaaS de RH com IA

- Módulo de triagem automática usando IA
- Score de fit cultural e técnico
- Pipeline estilo Kanban para recrutadores
- Webhooks + integrações com ATS e LinkedIn

  
## 🧑‍💻 Tecnologias Utilizadas

- React + TypeScript | Base da aplicação e tipagem |
- Vite | Dev server e build otimizado |
- Tailwind CSS | Estilização ágil e consistente |
- shadcn-ui | Componentes acessíveis e escaláveis |
- Supabase (opcional)\* | Autenticação + DB + hospedagem de dados |

  
## 📦 Como Executar Localmente

bash

# 1. Clone este repositório

git clone <URL_DO_REPOSITORIO>

# 2. Acesse o diretório

cd candify

# 3. Instale as dependências

npm install

# 4. Rode o projeto

npm run dev

Acesse:
http://localhost:3000

  
🌐 Deploy
A aplicação está disponível em produção em:
🔗 https://app.candify.online

Deploy realizado com Lovable para garantir entrega rápida, CI integrado e HTTPS automático.

  
🏁 Considerações Finais
Este projeto demonstra não apenas o atendimento ao escopo solicitado, mas maturidade de engenharia, documentação, visão de produto e capacidade de projetar soluções escaláveis.

Ele foi construído com foco em:

✅ Boas práticas
✅ Arquitetura limpa
✅ Pensamento de produto
✅ Prontidão para escala

  
📩 Contato
Caso queira discutir a arquitetura, decisões, melhorias ou contribuições:

Renan Pereira Tavares
https://linkedin.com/in/renanpereirait/
