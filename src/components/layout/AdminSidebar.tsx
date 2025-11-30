"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShoppingCart,
  Package,
  LogOut,
  GalleryHorizontal,
  MessageSquareQuote,
  Tag
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
  

export const navItems = [
    { href: '/admin/orders', label: 'Заказы', icon: ShoppingCart },
    { href: '/admin/products', label: 'Продукты', icon: Package },
    { href: '/admin/categories', label: 'Категории', icon: Tag },
    { href: '/admin/gallery', label: 'Галерея', icon: GalleryHorizontal },
    { href: '/admin/faq', label: 'FAQ', icon: MessageSquareQuote },
]

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden border-r bg-sidebar md:block">
            <div className="flex h-full flex-col">
                <div className="flex h-14 shrink-0 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Logo className="text-sidebar-foreground" />
                </div>
                <div className="flex flex-col overflow-auto py-2">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {navItems.map((item) => (
                             <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                                    pathname.startsWith(item.href) && "bg-sidebar-accent text-sidebar-accent-foreground"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                    <hr className="border-t border-sidebar-border my-2" />
                    <div className="px-2 lg:px-4 shrink-0">
                        <Button size="sm" variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" asChild>
                            <Link href="/">
                                <LogOut className="h-4 w-4" />
                                Выйти
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
