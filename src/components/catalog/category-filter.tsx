'use client';

import { Category } from '@/services/catalog-service';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Filter } from 'lucide-react';

interface CategoryFilterProps {
    categories: Category[];
    selectedCategory: number | null;
    onCategorySelect: (categoryId: number | null) => void;
    productCounts: Record<number, number>;
}

export function CategoryFilter({ 
    categories, 
    selectedCategory, 
    onCategorySelect,
    productCounts 
}: CategoryFilterProps) {
    const totalProducts = Object.values(productCounts).reduce((a, b) => a + b, 0);

    return (
        <div className="space-y-3 sm:space-y-4 bg-sidebar">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-primary" />
                    <h3 className="text-base sm:text-lg font-semibold text-sidebar-foreground">Categorias</h3>
                </div>
                {selectedCategory && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onCategorySelect(null)}
                        className="h-7 w-7 sm:h-8 sm:w-8 p-0 hover:bg-sidebar-accent rounded-full"
                    >
                        <X className="h-3 w-3 sm:h-4 w-4" />
                    </Button>
                )}
            </div>
            
            {/* All Categories Button */}
            <Button
                variant={selectedCategory === null ? "default" : "ghost"}
                className="w-full justify-start h-9 sm:h-10 text-sm sm:text-base hover:bg-sidebar-accent transition-colors duration-200"
                onClick={() => onCategorySelect(null)}
            >
                <span>Todas as Categorias</span>
                <Badge variant="secondary" className="ml-auto text-xs bg-sidebar-accent text-sidebar-foreground">
                    {totalProducts}
                </Badge>
            </Button>
            
            {/* Category Buttons */}
            <div className="space-y-1.5 sm:space-y-2">
                {categories.map((category) => {
                    const isSelected = selectedCategory === category.id;
                    const productCount = productCounts[category.id] || 0;
                    
                    return (
                        <Button
                            key={category.id}
                            variant={isSelected ? "default" : "ghost"}
                            className="w-full justify-start h-8 sm:h-9 text-sm sm:text-base hover:bg-sidebar-accent transition-colors duration-200"
                            onClick={() => onCategorySelect(category.id)}
                        >
                            <span className="truncate text-left">{category.nome}</span>
                            <Badge variant="secondary" className="ml-auto text-xs flex-shrink-0 bg-sidebar-accent text-sidebar-foreground">
                                {productCount}
                            </Badge>
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}
