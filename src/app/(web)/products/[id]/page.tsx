import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products, categories } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { OrderForm } from '@/modules/orders/components/OrderForm';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type ProductPageProps = {
  params: { id: string };
};

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const category = categories.find(c => c.id === product.categoryId);
  const placeholderImage = PlaceHolderImages.find(p => p.id === product.imageId);

  return (
    <div className="container py-12 lg:py-16">
        <div className="flex items-center text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Главная</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href="/catalog" className="hover:text-primary">Каталог</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="font-medium text-foreground">{product.name}</span>
        </div>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        {/* Left Column: Image */}
        <div className="space-y-6">
          {placeholderImage && (
            <div className="aspect-square relative w-full rounded-lg overflow-hidden shadow-lg">
              <Image
                src={placeholderImage.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                data-ai-hint={placeholderImage.imageHint}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}
           <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-headline text-2xl mb-4">Описание</h3>
              <p className="text-muted-foreground mb-4">{product.longDescription}</p>
              
              <h4 className="font-semibold mb-2 mt-4">Категория:</h4>
              {category && <Badge variant="secondary">{category.name}</Badge>}

              <h4 className="font-semibold mb-2 mt-4">Аллергены:</h4>
              <p className="text-sm text-muted-foreground">{product.allergens.join(', ')}.</p>
          </div>
        </div>

        {/* Right Column: Details & Order Form */}
        <div className="sticky top-24 self-start">
          <div className="flex flex-col gap-4">
            <h1 className="font-headline text-4xl lg:text-5xl font-bold">{product.name}</h1>
            <p className="text-lg text-muted-foreground">{product.description}</p>
            <div className="p-6 border rounded-lg bg-card">
              <OrderForm product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
