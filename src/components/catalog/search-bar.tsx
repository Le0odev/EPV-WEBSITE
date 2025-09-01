'use client';

import { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
    placeholder?: string;
    className?: string;
}

export function SearchBar({ onSearch, placeholder = "Buscar produtos...", className = "" }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const handleSearch = useCallback((term: string) => {
        onSearch(term);
    }, [onSearch]);

    useEffect(() => {
        handleSearch(debouncedSearchTerm);
    }, [debouncedSearchTerm, handleSearch]);

    const clearSearch = () => {
        setSearchTerm('');
        onSearch('');
    };

    return (
        <div className={`relative ${className}`}>
            <div className="relative">
                <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    type="text"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 sm:pl-10 pr-8 sm:pr-10 h-9 sm:h-10 text-sm bg-card border-border focus:border-primary focus:ring-primary/20"
                />
                {searchTerm && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearSearch}
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 sm:h-8 sm:w-8 p-0 hover:bg-muted/50 rounded-full"
                    >
                        <X className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}
