"use client"

import type { Product } from "@/services/catalog-service"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Package, Scale, ShoppingCart, Star, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProductCardProps {
  product: Product
  viewMode?: "grid" | "list"
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const truncateDescription = (text: string, maxLength = 60) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }
  
  if (viewMode === "list") {
    return (
      <Link href={`/catalogo/produto/${product.id}`}>
        <Card className="group overflow-hidden hover:shadow-lg mobile-transition border-0 lg:border lg:border-border bg-transparent lg:bg-card hover:bg-card/80 backdrop-blur-sm cursor-pointer mobile-card">
          <div className="flex mobile-gap lg:gap-4 mobile-p lg:p-4">
            {/* Image Section - otimizado para mobile */}
            <div className="w-16 h-16 lg:w-28 lg:h-28 relative flex-shrink-0 rounded-lg overflow-hidden bg-muted/50">
                <Image
                    src={product.imagem || "/placeholder.svg"}
                    alt={product.nome || "Produto"}
                    width={100}
                    height={100}
                    className={"w-full h-full object-cover group-hover:scale-105 mobile-transition"}
                />

              {/* Badge de estoque baixo */}
              {!product.is_bulk && product.estoque <= 5 && product.estoque > 0 && (
                <div className="absolute -top-1 -left-1 bg-destructive text-destructive-foreground px-1.5 py-0.5 lg:px-2 lg:py-1 rounded-full mobile-text-xs font-semibold shadow-sm">
                  Últimas {product.estoque}
                </div>
              )}
            </div>

            {/* Content Section - otimizado para mobile */}
            <div className="flex-1 min-w-0 flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold mobile-text-sm lg:text-lg text-card-foreground line-clamp-2 leading-tight group-hover:text-primary mobile-transition mb-1 lg:mb-2">
                  {product.nome}
                </h3>
                
                {/* Preço - destacado no mobile */}
                <span className="mobile-text-sm lg:text-2xl font-bold text-primary">{formatPrice(product.preco)}</span>
                
                {/* Informações adicionais no mobile */}
                <div className="lg:hidden mt-1">
                  <div className="flex items-center gap-2 mobile-text-xs text-muted-foreground">
                    <span>•</span>
                    <span>Clique para ver detalhes</span>
                  </div>
                </div>
              </div>

              {/* Indicador de clique - sempre visível no mobile */}
              <div className="flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 bg-primary/10 rounded-full group-hover:bg-primary/20 mobile-transition touch-target">
                <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
              </div>
            </div>
          </div>
        </Card>
      </Link>
    )
  }

  // Grid Mode (default) - Cards compactos e elegantes para mobile
  return (
    <Link href={`/catalogo/produto/${product.id}`}>
      <Card className="group h-full overflow-hidden hover:shadow-xl mobile-transition border border-border bg-card hover:bg-card/80 hover:-translate-y-1 backdrop-blur-sm cursor-pointer mobile-card">
        <CardHeader className="p-0 relative">
          <div className="relative overflow-hidden rounded-t-lg">
            <Image
              src={product.imagem || "/placeholder.svg"}
              alt={product.nome || "Produto"}
              width={300}
              height={200}
              className={"h-32 lg:h-40 w-full object-cover group-hover:scale-105 mobile-transition"}
            />

            {/* Badge de estoque baixo */}
            {!product.is_bulk && product.estoque <= 5 && product.estoque > 0 && (
              <div className="absolute top-2 left-2 lg:top-3 lg:left-3 bg-destructive text-destructive-foreground px-2 py-1 lg:px-3 lg:py-1.5 rounded-full mobile-text-xs font-semibold shadow-lg">
                Últimas {product.estoque}
              </div>
            )}

            {/* Hover overlay sutil */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 mobile-transition" />

            {/* Preço flutuante no topo - otimizado para mobile */}
            <div className="absolute bottom-2 left-2 lg:bottom-3 lg:left-3 bg-background/95 backdrop-blur-sm px-2 py-1.5 lg:px-3 lg:py-2 rounded-lg shadow-lg border border-border">
              <span className="mobile-text-sm lg:text-lg font-bold text-primary">{formatPrice(product.preco)}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="mobile-p lg:p-4">
          <div className="mobile-space-y lg:space-y-3">
            <div className="mobile-space-y lg:space-y-2">
              <h3 className="font-semibold mobile-text-sm lg:text-base text-card-foreground line-clamp-2 leading-tight min-h-[2.5rem] group-hover:text-primary mobile-transition">
                {product.nome}
              </h3>

              <p className="mobile-text-xs lg:text-sm text-muted-foreground line-clamp-2 leading-relaxed min-h-[2.5rem]">
                {truncateDescription(product.descricao, 50)}
              </p>
            </div>

            {/* Rating - apenas no desktop para economizar espaço no mobile */}
            <div className="hidden lg:flex items-center justify-between mb-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-secondary text-secondary" />
                ))}
                <span className="text-xs text-muted-foreground ml-1">(4.8)</span>
              </div>
            </div>

            {/* Botão de ação - otimizado para mobile */}
            <div className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 lg:py-3 px-3 lg:px-4 rounded-lg mobile-transition shadow-md hover:shadow-lg transform hover:scale-105 touch-target">
              <ShoppingCart className="h-4 w-4" />
              <span className="mobile-text-sm lg:text-sm">Ver Detalhes</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

    