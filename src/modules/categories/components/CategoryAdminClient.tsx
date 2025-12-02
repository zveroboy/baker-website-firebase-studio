"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Category } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle, Trash2, Folder } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CategoryForm } from "./CategoryForm";
import { deleteCategoryAction } from "../actions";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface CategoryAdminClientProps {
  categories: Category[];
}

export function CategoryAdminClient({ categories }: CategoryAdminClientProps) {
  const { toast } = useToast();
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null);

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setSheetOpen(true);
  };

  const handleAddNew = () => {
    setSelectedCategory(null);
    setSheetOpen(true);
  };

  const handleFormSuccess = () => {
    setSheetOpen(false);
    setSelectedCategory(null);
  };
  
  const handleDelete = async (id: string) => {
      if (confirm("Вы уверены, что хотите удалить эту категорию?")) {
          const result = await deleteCategoryAction(id);
          if (result.success) {
              toast({ title: "Успешно", description: "Категория удалена" });
          } else {
              toast({ title: "Ошибка", description: "Не удалось удалить категорию. Возможно, у нее есть товары или подкатегории.", variant: "destructive" });
          }
      }
  }

  const getParentName = (parentId: string | null) => {
      if (!parentId) return null;
      return categories.find(c => c.id === parentId)?.name;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Категории</CardTitle>
              <CardDescription>
                Управление структурой каталога.
              </CardDescription>
            </div>
            <Button size="sm" className="gap-1" onClick={handleAddNew}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Добавить категорию
              </span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Название</TableHead>
                <TableHead className="w-1/3">Родитель</TableHead>
                <TableHead className="w-1/3">Описание</TableHead>
                <TableHead>
                  <span className="sr-only">Действия</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <Folder className="h-4 w-4 text-muted-foreground" />
                    {category.name}
                  </TableCell>
                  <TableCell>
                    {category.parentId ? (
                        <Badge variant="secondary">{getParentName(category.parentId)}</Badge>
                    ) : (
                        <span className="text-muted-foreground text-xs">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground truncate max-w-sm">
                    {category.description}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Действия</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEdit(category)}>
                          Редактировать
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(category.id)} className="text-destructive">
                           <Trash2 className="mr-2 h-4 w-4" /> Удалить
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>
              {selectedCategory ? "Редактировать категорию" : "Добавить категорию"}
            </SheetTitle>
            <SheetDescription>
              {selectedCategory
                ? "Внесите изменения и сохраните."
                : "Заполните форму для создания новой категории."}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-8">
            <CategoryForm 
                category={selectedCategory} 
                allCategories={categories}
                onSuccess={handleFormSuccess} 
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

