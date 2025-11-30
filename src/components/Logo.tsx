import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("text-xl lg:text-2xl font-headline font-bold text-foreground", className)}>
      Сладкие Мечты
    </Link>
  );
}
