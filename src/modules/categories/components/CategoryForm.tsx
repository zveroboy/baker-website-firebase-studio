"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { createCategorySchema, type CreateCategoryInput } from "../schema";
import { createCategoryAction, updateCategoryAction } from "../actions";
import type { Category } from "@prisma/client";

interface CategoryFormProps {
  category?: Category | null;
  allCategories: Category[];
  onSuccess?: () => void;
}

export function CategoryForm({ category, allCategories, onSuccess }: CategoryFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateCategoryInput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
      parentId: category?.parentId || null,
    },
  });

  // Filter out itself and its children (simplification: just itself) to avoid cycles in parent selection
  const availableParents = allCategories.filter(c => c.id !== category?.id);

  async function onSubmit(values: CreateCategoryInput) {
    setIsLoading(true);
    try {
      let result;
      if (category) {
        result = await updateCategoryAction(category.id, values);
      } else {
        result = await createCategoryAction(values);
      }

      if (result.error) {
         toast({
            title: "Ошибка",
            description: "Произошла ошибка при сохранении.",
            variant: "destructive"
         });
      } else {
        toast({
            title: category ? "Категория обновлена" : "Категория добавлена",
            description: `Категория "${values.name}" была успешно сохранена.`,
        });
        onSuccess?.();
      }
    } catch (error) {
        toast({
            title: "Ошибка",
            description: "Произошла непредвиденная ошибка.",
            variant: "destructive"
        });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder="Например: Торты" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Описание категории..."
                  className="min-h-[100px]"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="parentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Родительская категория</FormLabel>
              <Select 
                onValueChange={(val) => field.onChange(val === "root" ? null : val)} 
                defaultValue={field.value || "root"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите родителя" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="root">-- Без родителя --</SelectItem>
                  {availableParents.map(c => (
                    <SelectItem key={c.id} value={c.id}>
                        {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Сохранить
        </Button>
      </form>
    </Form>
  );
}

