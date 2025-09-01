"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import type { Product, Category } from "@/services/catalog-service"
import { catalogApiService } from "@/services/catalog-api"
import { ProductCard } from "./product-card"
import { CategoryFilter } from "./category-filter"
import { SearchBar } from "./search-bar"
import { Button } from "@/components/ui/button"
import { Filter, X, Grid3X3, List, Loader2, Package, Sparkles, Search, Info } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

export function CatalogContent() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(0)
  const [productCounts, setProductCounts] = useState<Record<number, number>>({})
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentCursor, setCurrentCursor] = useState<number | null>(null)


  const isMobile = useMobile()
  const productsContainerRef = useRef<HTMLDivElement>(null)

  // Força o modo lista no mobile, permite alternância no desktop
  const effectiveViewMode = isMobile ? "list" : viewMode

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true)

        const categoriesData = await catalogApiService.getCategories()
        setCategories(categoriesData)

        const productsData = await catalogApiService.getProducts({}, { limit: 20, direction: "next" })
        setProducts(productsData.products)
        setTotal(productsData.total)
        setHasMore(productsData.hasMore)
        setCurrentCursor(productsData.nextCursor || null)

        const counts = await catalogApiService.getProductCountsByCategory()
        categoriesData.forEach((category) => {
          if (!counts[category.id]) {
            counts[category.id] = 0
          }
        })
        setProductCounts(counts)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
        setCategories([])
        setProducts([])
        setTotal(0)
      } finally {
        setIsLoading(false)
      }
    }

    loadInitialData()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!productsContainerRef.current || !hasMore || isLoadingMore) return

      const container = productsContainerRef.current
      const scrollTop = container.scrollTop
      const scrollHeight = container.scrollHeight
      const clientHeight = container.clientHeight

      if (scrollTop + clientHeight >= scrollHeight * 0.8) {
        loadMoreProducts()
      }
    }

    const container = productsContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [hasMore, isLoadingMore, currentCursor])

  const loadMoreProducts = async () => {
    if (!hasMore || isLoadingMore || !currentCursor) return

    try {
      setIsLoadingMore(true)
      
      const filters = {
        ...(selectedCategory && { categoria_id: selectedCategory }),
        ...(searchTerm && { search: searchTerm }),
      }

      const nextPagination = {
        limit: 20,
        cursor: currentCursor,
        direction: "next" as const,
      }

      const productsData = await catalogApiService.getProducts(filters, nextPagination)

      setProducts((prev) => {
        // Evitar produtos duplicados baseado no ID
        const existingIds = new Set(prev.map(p => p.id))
        const newProducts = productsData.products.filter(p => !existingIds.has(p.id))
        return [...prev, ...newProducts]
      })
      
      setHasMore(productsData.hasMore)
      setCurrentCursor(productsData.nextCursor || null)
    } catch (error) {
      console.error("Erro ao carregar mais produtos:", error)
    } finally {
      setIsLoadingMore(false)
    }
  }

  const handleCategorySelect = useCallback(async (categoryId: number | null) => {
    setSelectedCategory(categoryId)
    setCurrentCursor(null)
    setHasMore(true)

    try {
      setIsLoading(true)
      const filters = categoryId ? { categoria_id: categoryId } : {}
      const productsData = await catalogApiService.getProducts(filters, { limit: 20, direction: "next" })
      setProducts(productsData.products)
      setHasMore(productsData.hasMore)
      setCurrentCursor(productsData.nextCursor || null)

      if (productsContainerRef.current) {
        productsContainerRef.current.scrollTop = 0
      }
    } catch (error) {
      console.error("Erro ao filtrar por categoria:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleSearch = useCallback(async (term: string) => {
    setSearchTerm(term)
    setCurrentCursor(null)
    setHasMore(true)

    try {
      setIsLoading(true)
      const filters = term ? { search: term } : {}
      const productsData = await catalogApiService.getProducts(filters, { limit: 20, direction: "next" })
      setProducts(productsData.products)
      setHasMore(productsData.hasMore)
      setCurrentCursor(productsData.nextCursor || null)

      if (productsContainerRef.current) {
        productsContainerRef.current.scrollTop = 0
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const displayedProducts = products

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto mobile-px mobile-py">
        {/* Header mobile otimizado */}
        <div className="mobile-optimized mb-4">
          <div className="flex items-center mobile-gap mb-4">
            <Button
              onClick={() => setIsMobileMenuOpen(true)}
              variant="outline"
              className="bg-card border-border hover:bg-card/80 mobile-text-sm py-2.5 px-3 rounded-lg shadow-sm touch-target"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            
            {/* Barra de busca compacta no mobile */}
            <div className="flex-1">
              <SearchBar 
                onSearch={handleSearch} 
                placeholder="Buscar..." 
                className="w-full mobile-text-sm"
              />
            </div>
          </div>
          
          {/* Indicadores de filtros ativos no mobile */}
          {(selectedCategory || searchTerm) && (
            <div className="flex items-center gap-2 mb-3 mobile-p bg-card/50 rounded-lg border border-border/50">
              <Info className="h-4 w-4 text-primary" />
              <span className="mobile-text-xs text-muted-foreground">Filtros ativos:</span>
              {selectedCategory && (
                <span className="inline-flex items-center bg-primary/10 text-primary px-2 py-1 rounded-full mobile-text-xs">
                  {categories.find(c => c.id === selectedCategory)?.nome}
                </span>
              )}
              {searchTerm && (
                <span className="inline-flex items-center bg-primary/10 text-primary px-2 py-1 rounded-full mobile-text-xs">
                  "{searchTerm}"
                </span>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCategory(null)
                  setSearchTerm("")
                  handleSearch("")
                }}
                className="h-6 px-2 mobile-text-xs text-muted-foreground hover:text-foreground ml-auto touch-target"
              >
                Limpar
              </Button>
            </div>
          )}


        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 mobile-gap lg:gap-8">
          <div className="lg:col-span-1">
            {/* Filtros desktop */}
            <div className="desktop-only">
              <div className="bg-sidebar rounded-xl border border-sidebar-border p-6 sticky top-6 shadow-sm">
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategorySelect={handleCategorySelect}
                  productCounts={productCounts}
                />
              </div>
            </div>
          </div>

          {/* Modal de filtros mobile melhorado */}
          {isMobileMenuOpen && (
            <div className="mobile-optimized fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
              <div className="fixed left-0 top-0 h-full w-full sm:w-80 bg-sidebar border-r border-sidebar-border shadow-2xl">
                <div className="flex flex-col h-full">
                  {/* Header do modal */}
                  <div className="flex justify-between items-center mobile-p border-b border-sidebar-border bg-sidebar/95 backdrop-blur-sm">
                    <div className="flex items-center mobile-gap">
                      <Filter className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold text-sidebar-foreground">Filtros</h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="hover:bg-sidebar-accent p-2 rounded-lg touch-target"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Conteúdo do modal */}
                  <div className="flex-1 overflow-y-auto mobile-p">
                    <CategoryFilter
                      categories={categories}
                      selectedCategory={selectedCategory}
                      onCategorySelect={(categoryId) => {
                        handleCategorySelect(categoryId)
                        setIsMobileMenuOpen(false)
                      }}
                      productCounts={productCounts}
                    />
                  </div>

                  {/* Footer do modal */}
                  <div className="mobile-p border-t border-sidebar-border bg-sidebar/95 backdrop-blur-sm">
                    <Button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full bg-primary hover:bg-primary/90 touch-target"
                    >
                      Aplicar Filtros
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="lg:col-span-3">
            <div className="mobile-space-y lg:space-y-6">
              {/* Barra de busca e controles apenas no desktop */}
              <div className="desktop-only bg-card rounded-xl border border-border p-6 shadow-sm">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                  <div className="flex-1 max-w-md">
                    <SearchBar onSearch={handleSearch} placeholder="Buscar produtos..." className="w-full" />
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Botões de visualização apenas no desktop */}
                    <div className="hidden lg:flex bg-muted rounded-lg p-1">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="rounded-md"
                      >
                        <Grid3X3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="rounded-md"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>

                    {(selectedCategory || searchTerm) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedCategory(null)
                          setSearchTerm("")
                          handleSearch("")
                        }}
                        className="border-border hover:bg-accent hover:text-accent-foreground"
                      >
                        Limpar Filtros
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Container de produtos - otimizado para mobile */}
              <div
                ref={productsContainerRef}
                className="lg:bg-card lg:rounded-xl lg:border lg:border-border lg:p-6 max-h-[70vh] overflow-y-auto lg:shadow-sm"
              >
                {isLoading ? (
                  <div
                    className={
                      effectiveViewMode === "grid" ? "grid grid-cols-2 lg:grid-cols-3 mobile-gap lg:gap-6" : "mobile-space-y lg:space-y-4"
                    }
                  >
                    {Array.from({ length: isMobile ? 8 : 12 }).map((_, i) => (
                      <div
                        key={`skeleton-${i}`}
                        className={effectiveViewMode === "grid" ? "space-y-3" : "flex space-x-3"}
                      >
                        <div
                          className={`${effectiveViewMode === "grid" ? "aspect-square" : "w-16 h-16 lg:w-20 lg:h-20"} bg-muted animate-pulse rounded-lg`}
                        />
                        <div className={`${effectiveViewMode === "grid" ? "space-y-2" : "flex-1 space-y-2"}`}>
                          <div className="h-3 bg-muted animate-pulse rounded w-3/4" />
                          <div className="h-2 bg-muted animate-pulse rounded w-full" />
                          <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : displayedProducts.length > 0 ? (
                  <>
                    <div
                      className={
                        effectiveViewMode === "grid" ? "grid grid-cols-2 lg:grid-cols-3 mobile-gap lg:gap-6" : "mobile-space-y lg:space-y-4"
                      }
                    >
                      {displayedProducts.map((product, index) => (
                        <ProductCard 
                          key={`product-${product.id}-${index}`} 
                          product={product} 
                          viewMode={effectiveViewMode} 
                        />
                      ))}
                    </div>

                    {isLoadingMore && (
                      <div className="flex justify-center py-6 mt-4">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="mobile-text-sm">Carregando mais produtos...</span>
                        </div>
                      </div>
                    )}

                    {!hasMore && displayedProducts.length > 0 && (
                      <div className="text-center py-6 mt-4 text-muted-foreground">
                        <span className="mobile-text-sm">Você chegou ao final dos produtos</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center mobile-py lg:py-12">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="h-8 w-8 lg:h-10 lg:w-10 text-muted-foreground" />
                    </div>
                    <h3 className="mobile-text-sm lg:text-xl font-semibold text-foreground mb-2">Nenhum produto encontrado</h3>
                    <p className="text-muted-foreground mb-6 mobile-text-xs max-w-md mx-auto mobile-px">
                      {searchTerm
                        ? `Não encontramos produtos para "${searchTerm}". Tente outros termos ou limpe os filtros.`
                        : "Não há produtos disponíveis com os filtros selecionados."}
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedCategory(null)
                        setSearchTerm("")
                        handleSearch("")
                      }}
                      className="border-border hover:bg-primary hover:text-primary-foreground touch-target"
                    >
                      Limpar Filtros
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
