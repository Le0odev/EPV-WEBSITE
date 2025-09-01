'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    onNextPage: () => void;
    onPrevPage: () => void;
    total: number;
    currentCount: number;
    isLoading?: boolean;
}

export function Pagination({ 
    hasNextPage, 
    hasPrevPage, 
    onNextPage, 
    onPrevPage,
    total,
    currentCount,
    isLoading = false
}: PaginationProps) {
    if (total === 0) return null;

    return (
        <div className="flex items-center justify-between border-t pt-6">
            <div className="text-sm text-muted-foreground">
                Mostrando {currentCount} de {total} produtos
            </div>
            
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onPrevPage}
                    disabled={!hasPrevPage || isLoading}
                    className="flex items-center gap-2"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Anterior
                </Button>
                
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onNextPage}
                    disabled={!hasNextPage || isLoading}
                    className="flex items-center gap-2"
                >
                    Próxima
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
