import { Image } from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const placeholderImage = PlaceHolderImages.find(p => p.id === product.imageId);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="block">
          {placeholderImage && (
            <div className="aspect-square relative w-full">
              <Image
                src={placeholderImage.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                data-ai-hint={placeholderImage.imageHint}
              />
            </div>
          )}
        </Link>
      </CardHeader>
      <div className="flex flex-col flex-grow">
        <CardContent className="p-4 flex-grow">
          <Link href={`/products/${product.id}`}>
            <CardTitle className="font-headline text-xl mb-2 hover:text-primary transition-colors">{product.name}</CardTitle>
          </Link>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="font-semibold text-lg">
            {product.price} ₽ / {product.unit === 'kg' ? 'кг' : 'шт'}
          </div>
          <Button asChild size="sm" variant="ghost">
            <Link href={`/products/${product.id}`}>
              Заказать <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
