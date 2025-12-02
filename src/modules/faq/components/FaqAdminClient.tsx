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
import type { Faq } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FaqForm } from "./FaqForm";
import { deleteFaqAction } from "../actions";
import { useToast } from "@/hooks/use-toast";

interface FaqAdminClientProps {
  initialFaqs: Faq[];
}

export function FaqAdminClient({ initialFaqs }: FaqAdminClientProps) {
  const { toast } = useToast();
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [selectedFaq, setSelectedFaq] = React.useState<Faq | null>(null);

  const handleEdit = (faq: Faq) => {
    setSelectedFaq(faq);
    setSheetOpen(true);
  };

  const handleAddNew = () => {
    setSelectedFaq(null);
    setSheetOpen(true);
  };

  const handleFormSuccess = () => {
    setSheetOpen(false);
    setSelectedFaq(null);
  };
  
  const handleDelete = async (id: string) => {
      if (confirm("Вы уверены, что хотите удалить этот вопрос?")) {
          const result = await deleteFaqAction(id);
          if (result.success) {
              toast({ title: "Успешно", description: "Вопрос удален" });
          } else {
              toast({ title: "Ошибка", description: "Не удалось удалить вопрос", variant: "destructive" });
          }
      }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Вопросы и ответы (FAQ)</CardTitle>
              <CardDescription>
                Управление секцией "Часто задаваемые вопросы".
              </CardDescription>
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
                <TableHead className="w-1/12">Порядок</TableHead>
                <TableHead className="w-2/5">Вопрос</TableHead>
                <TableHead className="w-2/5">Ответ</TableHead>
                <TableHead>
                  <span className="sr-only">Действия</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialFaqs.map((faq) => (
                <TableRow key={faq.id}>
                  <TableCell>{faq.order}</TableCell>
                  <TableCell className="font-medium">{faq.question}</TableCell>
                  <TableCell className="text-sm text-muted-foreground truncate max-w-sm">
                    {faq.answer}
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
                        <DropdownMenuItem onClick={() => handleEdit(faq)}>
                          Редактировать
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(faq.id)} className="text-destructive">
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
              {selectedFaq ? "Редактировать вопрос" : "Добавить новый вопрос"}
            </SheetTitle>
            <SheetDescription>
              {selectedFaq
                ? "Внесите изменения и сохраните."
                : "Заполните форму, чтобы добавить новый вопрос в секцию FAQ."}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-8">
            <FaqForm faq={selectedFaq} onSuccess={handleFormSuccess} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

