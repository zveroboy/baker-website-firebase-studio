import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center text-center">
      <p className="text-4xl font-semibold text-primary font-headline">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">Страница не найдена</h1>
      <p className="mt-6 text-base leading-7 text-muted-foreground">
        К сожалению, мы не смогли найти страницу, которую вы ищете.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Button asChild>
          <Link href="/">Вернуться на главную</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/catalog">Перейти в каталог</Link>
        </Button>
      </div>
    </div>
  )
}
