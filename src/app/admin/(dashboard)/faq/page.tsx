"use client";

import * as React from "react";
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
import { faqs } from "@/lib/data"
import type { FAQ } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, PlusCircle } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaqForm } from "@/components/admin/FaqForm";


export default function FaqAdminPage() {
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [selectedFaq, setSelectedFaq] = React.useState<FAQ | null>(null);

  const handleEdit = (faq: FAQ) => {
    setSelectedFaq(faq);
    setSheetOpen(true);
  };

  const handleAddNew = () => {
    setSelectedFaq(null);
    setSheetOpen(true);
  }

  const handleFormSuccess = () => {
    setSheetOpen(false);
    setSelectedFaq(null);
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
              <div>
                  <CardTitle>Вопросы и ответы (FAQ)</CardTitle>
                  <CardDescription>Управление секцией "Часто задаваемые вопросы".</CardDescription>
              </div>
               <Button size="sm" className="gap-1" onClick={handleAddNew}>
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Добавить вопрос
                  </span>
              </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-2/5">Вопрос</TableHead>
                <TableHead className="w-2/5">Ответ</TableHead>
                <TableHead>
                  <span className="sr-only">Действия</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faqs.map(faq => (
                <TableRow key={faq.id}>
                  <TableCell className="font-medium">{faq.question}</TableCell>
                  <TableCell className="text-sm text-muted-foreground truncate max-w-sm">{faq.answer}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleEdit(faq)}>Редактировать</DropdownMenuItem>
                        <DropdownMenuItem>Переместить вверх</DropdownMenuItem>
                        <DropdownMenuItem>Переместить вниз</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Удалить</DropdownMenuItem>
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
            <SheetTitle>{selectedFaq ? 'Редактировать вопрос' : 'Добавить новый вопрос'}</SheetTitle>
            <SheetDescription>
              {selectedFaq ? 'Внесите изменения и сохраните.' : 'Заполните форму, чтобы добавить новый вопрос в секцию FAQ.'}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-8">
            <FaqForm faq={selectedFaq} onSuccess={handleFormSuccess} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
