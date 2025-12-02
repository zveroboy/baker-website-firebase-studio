"use client";

import { useState } from 'react';
import { ProductCard } from '@/modules/products';
import { Button } from '@/components/ui/button';
import { products, categories } from '@/lib/data';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function CatalogPage() {
  const [filter, setFilter] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const handleFilter = (categoryId: string) => {
    setFilter(categoryId);
    if (categoryId === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.categoryId === categoryId));
    }
  };

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline">Моя продукция</h1>
        <p className="text-lg text-muted-foreground mt-2">Выберите то, что вам по душе</p>
      </div>

      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => handleFilter('all')}
          className={cn(filter === 'all' && "bg-primary text-primary-foreground")}
        >
          Все
        </Button>
        {categories.map(category => (
          <Button
            key={category.id}
            variant={filter === category.id ? 'default' : 'outline'}
            onClick={() => handleFilter(category.id)}
            className={cn(filter === category.id && "bg-primary text-primary-foreground")}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
