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
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Logo className="text-sidebar-foreground" />
                </div>
                <div className="flex-1 overflow-auto py-2">
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
                </div>
                <div className="mt-auto p-4 border-t border-sidebar-border">
                    <Button size="sm" variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" asChild>
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
