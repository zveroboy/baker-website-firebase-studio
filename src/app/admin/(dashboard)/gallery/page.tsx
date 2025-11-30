import { Img } from 'next/img';
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
import { galleryImages } from "@/lib/data"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Upload } from "lucide-react"

export default function GalleryAdminPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>Галерея</CardTitle>
                <CardDescription>Управление изображениями в галерее.</CardDescription>
            </div>
            <Button size="sm" className="gap-1">
                <Upload className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Загрузить фото
                </span>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Изображение</TableHead>
              <TableHead>Описание (Alt)</TableHead>
              <TableHead>
                <span className="sr-only">Действия</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {galleryImages.map(image => {
                const placeholder = PlaceHolderImages.find(p => p.id === image.imageId);
                return placeholder ? (
                    <TableRow key={image.id}>
                        <TableCell>
                            <Img
                                alt={image.alt}
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src={placeholder.imageUrl}
                                width="64"
                                data-ai-hint={placeholder.imageHint}
                            />
                        </TableCell>
                        <TableCell className="font-medium">{image.alt}</TableCell>
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
                              <DropdownMenuItem>Переместить вверх</DropdownMenuItem>
                              <DropdownMenuItem>Переместить вниз</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Удалить</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ) : null;
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
