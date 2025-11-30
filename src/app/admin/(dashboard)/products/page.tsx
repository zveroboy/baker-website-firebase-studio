import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { products, categories } from "@/lib/data"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, PlusCircle } from "lucide-react"

export default function ProductsPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>Продукты</CardTitle>
                <CardDescription>Управление продуктами, ценами и описаниями.</CardDescription>
            </div>
            <Button size="sm" className="gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Добавить продукт
                </span>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Изображение</span>
              </TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead className="hidden md:table-cell">Цена</TableHead>
              <TableHead className="hidden md:table-cell">
                Включен в избранное
              </TableHead>
              <TableHead>
                <span className="sr-only">Действия</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map(product => {
                const category = categories.find(c => c.id === product.categoryId);
                const image = PlaceHolderImages.find(p => p.id === product.imageId);
                return (
                    <TableRow key={product.id}>
                        <TableCell className="hidden sm:table-cell">
                        {image && 
                            <Image
                                alt={product.name}
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src={image.imageUrl}
                                width="64"
                                data-ai-hint={image.imageHint}
                            />
                        }
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>
                            {category && <Badge variant="outline">{category.name}</Badge>}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{product.price} ₽ / {product.unit === 'kg' ? 'кг' : 'шт'}</TableCell>
                        <TableCell className="hidden md:table-cell">
                            {product.featured ? "Да" : "Нет"}
                        </TableCell>
                        <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Действия</DropdownMenuLabel>
                            <DropdownMenuItem>Редактировать</DropdownMenuItem>
                            <DropdownMenuItem>Переместить вверх</DropdownMenuItem>
                            <DropdownMenuItem>Переместить вниз</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Удалить</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </TableCell>
                    </TableRow>
                )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
