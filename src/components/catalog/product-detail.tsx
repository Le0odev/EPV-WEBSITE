
"use client"

import { useState, useEffect } from "react"
import type { Product, Category } from "@/services/catalog-service"
import { catalogApiService } from "@/services/catalog-api"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Package, Scale, Share2, Phone, Star, Truck, Shield, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProductDetailProps {
  productId: number
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [category, setCategory] = useState<Category | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string>("")

  // Carregar dados reais do banco
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)

        // Buscar produto
        const productData = await catalogApiService.getProductById(productId)
        if (!productData) {
          setIsLoading(false)
          return
        }

        setProduct(productData)
        if (productData.imagem) {
          setSelectedImage(productData.imagem)
        }

        // Buscar categoria do produto
        const categoriesData = await catalogApiService.getCategories()
        const currentCategory = categoriesData.find((c) => c.id === productData.categoria_id)
        setCategory(currentCategory || null)
      } catch (error) {
        console.error("Erro ao carregar produto:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [productId])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.nome,
        text: `Confira ${product?.nome} no Empório Verde Grãos!`,
        url: window.location.href,
      })
    } else {
      // Fallback para copiar link
      navigator.clipboard.writeText(window.location.href)
      // Aqui você pode mostrar um toast de "Link copiado!"
    }
  }

  const handleWhatsApp = () => {
    const message = `Olá! Gostaria de saber mais sobre o produto: ${product?.nome}`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/5581991676177?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  if (isLoading) {
    return null // Skeleton é renderizado pela página
  }

  if (!product) {
    return (
      <div className="text-center py-12 px-4">
        <div className="text-muted-foreground text-lg mb-6">Produto não encontrado</div>
        <Link href="/catalogo">
          <Button variant="outline" className="px-6 py-3 bg-transparent">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Catálogo
          </Button>
        </Link>
      </div>
    )
  }

  return (
         <div className="min-h-screen bg-background">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4 sm:mb-6 lg:mb-8 overflow-x-auto">
          <Link
            href="/catalogo"
            className="hover:text-primary transition-colors duration-200 flex items-center whitespace-nowrap"
          >
            <ArrowLeft className="h-3 w-3 mr-1 flex-shrink-0" />
            Catálogo
          </Link>
          <span className="text-muted-foreground/60 flex-shrink-0">/</span>
          {category && (
            <>
              <Link
                href={`/catalogo/categoria/${product.categoria_id}`}
                className="hover:text-primary transition-colors duration-200 whitespace-nowrap"
              >
                {category.nome}
              </Link>
              <span className="text-muted-foreground/60 flex-shrink-0">/</span>
            </>
          )}
          <span className="text-foreground font-medium truncate">{product.nome}</span>
        </nav>

        {/* Product Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Product Image Section */}
          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-xl sm:rounded-2xl border border-border/50 shadow-lg bg-card">
              {selectedImage && selectedImage.trim() !== "" ? (
                <Image
                  src={selectedImage || "/placeholder.svg"}
                  alt={product.nome || "Produto"}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
                  <div className="text-center">
                    <Package className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground/60 mx-auto mb-3 sm:mb-4" />
                    <span className="text-muted-foreground font-medium text-sm sm:text-base">Sem imagem</span>
                  </div>
                </div>
              )}
            </div>

            {/* Image Gallery Placeholder */}
            {product.imagem && (
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                <div className="aspect-square rounded-lg border-2 border-primary bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                </div>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-lg border border-border bg-muted/30 flex items-center justify-center hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <span className="text-xs text-muted-foreground">+{i}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Header */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {!product.is_bulk && product.estoque <= 5 && product.estoque > 0 && (
                  <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white border-0 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium shadow-sm">
                    <Package className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                    Últimas {product.estoque}
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  className="px-2.5 sm:px-3 py-1 text-xs border-primary/20 text-primary bg-primary/5"
                >
                  <Shield className="w-3 h-3 mr-1" />
                  Natural
                </Badge>
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight text-balance">
                {product.nome}
              </h1>

              {category && (
                <div className="flex items-center space-x-2 text-xs sm:text-sm">
                  <span className="text-muted-foreground">Categoria:</span>
                  <Link
                    href={`/catalogo/categoria/${product.categoria_id}`}
                    className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
                  >
                    {category.nome}
                  </Link>
                </div>
              )}
            </div>

                         {/* Price Section */}
             <Card className="bg-card border-border shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-baseline space-x-2">
                  <p className="text-2xl sm:text-3xl lg:text-5xl font-bold text-primary">
                    {formatPrice(product.preco)}
                  </p>
                  <span className="text-primary/70 text-xs sm:text-sm font-medium">à vista</span>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground flex items-center">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 mr-2" />
                Descrição
              </h3>
              <Card className="border-border/50 shadow-sm">
                <CardContent className="p-4">
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    {product.descricao || "Descrição não disponível para este produto."}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleWhatsApp}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-0 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 min-h-[48px] sm:min-h-[56px]"
                >
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
                  Pedir pelo WhatsApp
                </Button>

                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="px-4 sm:px-6 py-3 sm:py-4 border-2 hover:bg-accent transition-colors duration-200 rounded-xl min-h-[48px] sm:min-h-[56px] sm:w-auto w-full sm:flex-shrink-0 bg-transparent"
                >
                  <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="ml-2 sm:hidden">Compartilhar</span>
                </Button>
              </div>

              <Link href="/catalogo" className="block">
                <Button
                  variant="ghost"
                  className="w-full py-3 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200 rounded-xl min-h-[44px]"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao Catálogo
                </Button>
              </Link>
            </div>

            {/* Additional Info */}
            <Card className="border-border/50 shadow-sm bg-gradient-to-br from-card to-muted/20">
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-foreground flex items-center">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 mr-2" />
                  Informações Adicionais
                </h3>
                <div className="grid grid-cols-1 gap-2.5 sm:gap-3 text-xs sm:text-sm">
                  <div className="flex items-center space-x-2.5 text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span>Produto 100% natural</span>
                  </div>
                  <div className="flex items-center space-x-2.5 text-muted-foreground">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span>Qualidade garantida</span>
                  </div>
                  <div className="flex items-center space-x-2.5 text-muted-foreground">
                    <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                    <span>Entrega local disponível</span>
                  </div>
                  <div className="flex items-center space-x-2.5 text-muted-foreground">
                    <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                    <span>Atendimento personalizado</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Features */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="text-center p-3 sm:p-4">
                  <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-xs font-medium text-muted-foreground">Entrega Rápida</p>
                </CardContent>
              </Card>
              <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="text-center p-3 sm:p-4">
                  <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-xs font-medium text-muted-foreground">Qualidade</p>
                </CardContent>
              </Card>
              <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="text-center p-3 sm:p-4">
                  <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 mx-auto mb-2" />
                  <p className="text-xs font-medium text-muted-foreground">Natural</p>
                </CardContent>
              </Card>
              <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="text-center p-3 sm:p-4">
                  <Star className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-xs font-medium text-muted-foreground">Premium</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
