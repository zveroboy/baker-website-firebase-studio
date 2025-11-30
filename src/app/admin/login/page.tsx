import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/Logo"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
                <Logo />
            </div>
          <CardTitle className="text-2xl font-headline">Вход в панель управления</CardTitle>
          <CardDescription>
            Введите свои данные для входа
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                defaultValue="admin@sweetdreams.com"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Пароль</Label>
              </div>
              <Input id="password" type="password" required defaultValue="password" />
            </div>
            <Button type="submit" className="w-full" asChild>
              <Link href="/admin">Войти</Link>
            </Button>
          </div>
            <p className="text-center text-xs text-muted-foreground mt-4">
                Нажимая "Войти", вы будете перенаправлены на панель администратора. <br/>
                <Link href="/" className="underline">Вернуться на сайт</Link>
            </p>
        </CardContent>
      </Card>
    </div>
  )
}
