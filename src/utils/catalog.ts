import type { Product } from "@/types/content";
import { formatCurrencyBRL } from "@/utils/format";

export function productWhatsAppMessage(product: Product): string {
  return [
    "Olá! Vim pelo site e gostaria de consultar este produto:",
    "",
    product.name,
    product.sku ? `Código: ${product.sku}` : "",
    product.price ? `Preço exibido: ${formatCurrencyBRL(product.price)}` : "",
    product.stockLabel ? `Disponibilidade informada: ${product.stockLabel}` : "",
    "",
    "Pode confirmar disponibilidade e condição atual?",
  ].filter(Boolean).join("\n");
}
