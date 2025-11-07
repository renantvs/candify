/**
 * Formata telefone no padrão (XX) XXXXX-XXXX
 */
export function formatTelefone(value: string): string {
  const numbers = value.replace(/\D/g, "");
  
  if (numbers.length <= 2) {
    return numbers;
  }
  if (numbers.length <= 7) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  }
  
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
}

/**
 * Formata data no padrão dd/mm/aaaa
 */
export function formatData(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
}

/**
 * Converte string dd/mm/aaaa para Date
 */
export function parseDataString(dateStr: string): Date | null {
  const [day, month, year] = dateStr.split("/").map(Number);
  
  if (!day || !month || !year) return null;
  
  return new Date(year, month - 1, day);
}