import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { ProductDetail } from '@/components/catalog/product-detail';
import { Skeleton } from '@/components/ui/skeleton';

export const revalidate = 900; // Revalidar a cada 15 minutos

interface ProductPageProps {
    params: {
        id: string;
    };
}

export default function ProductPage({ params }: ProductPageProps) {
    const productId = parseInt(params.id);
    
    if (isNaN(productId)) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6 lg:py-8">
                <Suspense fallback={<ProductSkeleton />}>
                    <ProductDetail productId={productId} />
                </Suspense>
            </div>
        </div>
    );
}

function ProductSkeleton() {
    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Breadcrumb Skeleton */}
            <nav className="flex items-center space-x-2 mb-6 lg:mb-8">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-32" />
            </nav>

            {/* Content Skeleton */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
                {/* Image Section Skeleton */}
                <div className="space-y-4 lg:space-y-6">
                    <Skeleton className="aspect-square w-full rounded-2xl" />
                    <div className="grid grid-cols-4 gap-3">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className="aspect-square rounded-lg" />
                        ))}
                    </div>
                </div>
                
                {/* Content Section Skeleton */}
                <div className="space-y-6 lg:space-y-8">
                    {/* Header Skeleton */}
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-3">
                            <Skeleton className="h-8 w-24 rounded-full" />
                            <Skeleton className="h-8 w-20 rounded-full" />
                            <Skeleton className="h-6 w-16 rounded-full" />
                        </div>
                        <Skeleton className="h-8 lg:h-12 w-3/4" />
                        <Skeleton className="h-5 w-48" />
                    </div>
                    
                    {/* Price Skeleton */}
                    <div className="bg-muted rounded-2xl p-6">
                        <Skeleton className="h-12 lg:h-16 w-32 mb-2" />
                        <Skeleton className="h-4 w-48" />
                    </div>
                    
                    {/* Description Skeleton */}
                    <div className="space-y-3">
                        <Skeleton className="h-6 w-24" />
                        <div className="bg-gray-100 rounded-xl p-4">
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </div>
                    
                    {/* Actions Skeleton */}
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Skeleton className="h-14 w-full sm:w-auto sm:flex-1" />
                            <Skeleton className="h-14 w-16" />
                        </div>
                        <Skeleton className="h-12 w-full" />
                    </div>
                    
                    {/* Additional Info Skeleton */}
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                        <Skeleton className="h-6 w-40 mb-4" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center space-x-2">
                                    <Skeleton className="w-2 h-2 rounded-full" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Features Skeleton */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="text-center p-4 bg-white rounded-xl border border-gray-100">
                                <Skeleton className="h-8 w-8 mx-auto mb-2 rounded" />
                                <Skeleton className="h-3 w-16 mx-auto" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
