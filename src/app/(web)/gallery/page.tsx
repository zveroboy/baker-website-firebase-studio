import Image from 'next/image';
import { galleryImages } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function GalleryPage() {
  return (
    <div className="container py-12 lg:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline">Галерея моих работ</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Вдохновитесь моими прошлыми творениями
        </p>
      </div>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {galleryImages.map(image => {
          const placeholder = PlaceHolderImages.find(p => p.id === image.imageId);
          return placeholder ? (
            <div key={image.id} className="break-inside-avoid">
              <Image
                src={placeholder.imageUrl}
                alt={image.alt}
                width={500}
                height={500}
                className="w-full h-auto rounded-lg shadow-md"
                data-ai-hint={placeholder.imageHint}
              />
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}
