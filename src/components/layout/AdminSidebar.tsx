"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  ShoppingCart,
  Package,
  Users,
  LineChart,
  ChevronDown,
  LogOut,
  GalleryHorizontal,
  MessageSquareQuote,
  Tag
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
  

const navItems = [
    { href: '/admin/orders', label: 'Заказы', icon: ShoppingCart },
    { href: '/admin/products', label: 'Продукты', icon: Package },
    { href: '/admin/categories', label: 'Категории', icon: Tag },
    { href: '/admin/gallery', label: 'Галерея', icon: GalleryHorizontal },
    { href: '/admin/faq', label: 'FAQ', icon: MessageSquareQuote },
]

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-16 items-center border-b px-6">
                    <Logo />
                </div>
                <div className="flex-1 overflow-auto py-2">
                    <nav className="grid items-start px-4 text-sm font-medium">
                        {navItems.map((item) => (
                             <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                    pathname.startsWith(item.href) && "bg-muted text-primary"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="mt-auto p-4 border-t">
                    <Button size="sm" variant="ghost" className="w-full justify-start" asChild>
                       <Link href="/">
                         <LogOut className="mr-2 h-4 w-4" />
                         Выйти
                       </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
