import { Image } from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Clock, MapPin, Phone, Cake } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  const featuredProducts = products.filter(p => p.featured);
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-cake');
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-baker');

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt="Элегантный торт"
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-2xl px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 tracking-tight">
            Искусство десерта, созданное с любовью
          </h1>
          <p className="text-lg md:text-xl mb-8 text-rose-50">
            Авторские торты и выпечка ручной работы для самых важных моментов
          </p>
          <Button size="lg" asChild>
            <Link href="/catalog">Перейти в каталог</Link>
          </Button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container">
            <h2 className="text-3xl md:text-4xl font-headline text-center mb-12">Популярные десерты</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-headline mb-4">Моя философия</h2>
              <p className="mb-4 text-muted-foreground">
                "Сладкие Мечты" — это не просто кондитерская, это место, где я создаю маленькие чудеса. Я верю, что десерт — это кульминация любого праздника, и он должен быть не только вкусным, но и незабываемо красивым.
              </p>
              <p className="mb-6 text-muted-foreground">
                В своей работе я использую только натуральные ингредиенты высшего качества: бельгийский шоколад, свежие ягоды, натуральные сливки и настоящее сливочное масло. Каждый торт создается вручную с особым вниманием к деталям и вашим пожеланиям.
              </p>
              <Button variant="outline" asChild>
                <Link href="/gallery">Смотреть галерею</Link>
              </Button>
            </div>
            <div className="order-1 md:order-2">
              {aboutImage && (
                <Image
                  src={aboutImage.imageUrl}
                  alt="Кондитер"
                  width={600}
                  height={800}
                  className="rounded-lg shadow-lg object-cover w-full h-auto"
                  data-ai-hint={aboutImage.imageHint}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container">
            <h2 className="text-3xl md:text-4xl font-headline text-center mb-12">Информация для заказа</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <Card>
                <CardHeader>
                  <CardTitle className="flex flex-col items-center gap-2">
                    <Clock className="w-8 h-8 text-primary" />
                    <span className="font-headline mt-2">Часы работы</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>Прием заказов: 10:00 - 20:00</p>
                  <p>Доставка и самовывоз: 11:00 - 21:00</p>
                  <p>Ежедневно</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex flex-col items-center gap-2">
                    <MapPin className="w-8 h-8 text-primary" />
                     <span className="font-headline mt-2">Доставка и самовывоз</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>Самовывоз по адресу:</p>
                  <p>г. Москва, ул. Кондитерская, 1</p>
                  <p className="mt-2">Доставка по Москве и МО</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex flex-col items-center gap-2">
                    <Phone className="w-8 h-8 text-primary" />
                     <span className="font-headline mt-2">Свяжитесь со мной</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>Телефон: +7 (926) 123-45-67</p>
                  <p>Email: order@sweetdreams.com</p>
                  <p className="mt-2">С удовольствием отвечу на ваши вопросы</p>
                </CardContent>
              </Card>
            </div>
        </div>
      </section>
    </>
  );
}
