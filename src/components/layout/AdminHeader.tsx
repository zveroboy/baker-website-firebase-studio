
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Logo } from '@/components/Logo';
import { navItems } from './AdminSidebar';
import { cn } from '@/lib/utils';


export function AdminHeader() {
  const pathname = usePathname();
  
  const MobileNav = () => (
     <nav className="grid gap-2 text-lg font-medium">
        <div className="flex h-16 items-center border-b px-4">
            <Logo />
        </div>
        <div className="flex-1 overflow-auto py-2">
            <div className="grid items-start px-4 text-sm font-medium">
            {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                    <Link
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            pathname.startsWith(item.href) && "text-primary bg-muted"
                        )}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                    </Link>
                </SheetClose>
            ))}
            </div>
        </div>
        <div className="mt-auto p-4 border-t">
            <SheetClose asChild>
                <Button size="sm" variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/">
                        <LogOut className="mr-2 h-4 w-4" />
                        Выйти
                    </Link>
                </Button>
            </SheetClose>
        </div>
    </nav>
  )

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0">
            <SheetTitle className="sr-only">Admin Menu</SheetTitle>
            <MobileNav />
        </SheetContent>
      </Sheet>
       <div className="w-full flex-1">
        <p className="font-semibold text-lg">Панель управления</p>
      </div>
    </header>
  );
}
