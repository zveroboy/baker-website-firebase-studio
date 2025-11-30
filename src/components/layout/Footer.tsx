import { Phone, Mail, MapPin } from 'lucide-react';
import { Logo } from '@/components/Logo';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm">Авторские торты и десерты с душой. Ручная работа и натуральные ингредиенты.</p>
          </div>
          <div className="space-y-4">
            <h3 className="font-headline text-lg font-semibold">Контакты</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:order@sweetdreams.com" className="hover:text-primary">order@sweetdreams.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+79261234567" className="hover:text-primary">+7 (926) 123-45-67</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>г. Москва, ул. Кондитерская, 1</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-headline text-lg font-semibold">Навигация</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/catalog" className="hover:text-primary">Каталог</Link></li>
              <li><Link href="/gallery" className="hover:text-primary">Галерея</Link></li>
              <li><Link href="/faq" className="hover:text-primary">Вопросы и ответы</Link></li>
              <li><Link href="/admin/login" className="hover:text-primary">Вход для администратора</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Сладкие Мечты. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
