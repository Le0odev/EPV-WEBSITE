
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
    if (!text || text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }
  
  if (viewMode === "list") {
    return (
      <Link href={`/catalogo/produto/${product.id}`} className="block w-full">
        <Card className="group overflow-hidden hover:shadow-lg mobile-transition border-0 lg:border lg:border-border bg-card/50 lg:bg-card hover:bg-card/80 backdrop-blur-sm cursor-pointer mobile-card">
          <div className="flex items-center mobile-gap lg:gap-4 mobile-p lg:p-4">
            {/* Image Section */}
            <div className="w-16 h-16 lg:w-24 lg:h-24 relative flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                <Image
                    src={product.imagem || "/placeholder.svg"}
                    alt={product.nome || "Produto"}
                    fill
                    sizes="(max-width: 768px) 15vw, 10vw"
                    className={"object-cover group-hover:scale-105 mobile-transition"}
                />
            </div>

            {/* Content Section */}
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold mobile-text-sm lg:text-lg text-foreground line-clamp-2 leading-tight group-hover:text-primary mobile-transition mb-1 lg:mb-1.5">
                  {product.nome}
                </h3>
                
                <span className="mobile-text-sm lg:text-xl font-bold text-primary">{formatPrice(product.preco)}</span>
            </div>

            {/* Click Indicator */}
            <div className="flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 bg-muted/80 group-hover:bg-primary/10 rounded-full mobile-transition touch-target ml-2">
                <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground group-hover:text-primary" />
            </div>
          </div>
        </Card>
      </Link>
    )
  }

  // Grid Mode (default)
  return (
    <Link href={`/catalogo/produto/${product.id}`} className="block w-full">
      <Card className="group h-full overflow-hidden hover:shadow-xl mobile-transition border border-border bg-card hover:bg-card/80 hover:-translate-y-1 backdrop-blur-sm cursor-pointer mobile-card flex flex-col">
        <CardHeader className="p-0 relative">
          <div className="aspect-[4/3] w-full relative overflow-hidden rounded-t-lg bg-muted">
            <Image
              src={product.imagem || "/placeholder.svg"}
              alt={product.nome || "Produto"}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className={"object-cover group-hover:scale-105 mobile-transition"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 mobile-transition" />
          </div>
        </CardHeader>

        <CardContent className="mobile-p lg:p-4 flex flex-col flex-1">
          <div className="flex-grow mobile-space-y">
              <h3 className="font-semibold mobile-text-sm lg:text-base text-foreground line-clamp-2 leading-tight min-h-[2.5rem] group-hover:text-primary mobile-transition">
                {product.nome}
              </h3>

              <p className="mobile-text-xs lg:text-sm text-muted-foreground line-clamp-2 leading-relaxed min-h-[2.5rem] hidden lg:block">
                {truncateDescription(product.descricao, 50)}
              </p>
          </div>

          <div className="pt-2 mt-auto">
            <div className="mobile-text-sm lg:text-lg font-bold text-primary mb-2">{formatPrice(product.preco)}</div>
            <div className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 lg:py-2.5 px-3 lg:px-4 rounded-lg mobile-transition shadow-sm hover:shadow-md transform hover:scale-105 touch-target">
              <ShoppingCart className="h-4 w-4" />
              <span className="mobile-text-sm lg:text-sm">Ver Detalhes</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
