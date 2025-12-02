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
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { createFaqSchema, type CreateFaqInput } from "../schema";
import { createFaqAction, updateFaqAction } from "../actions";
import type { Faq } from "@prisma/client";

interface FaqFormProps {
  faq?: Faq | null;
  onSuccess?: () => void;
}

export function FaqForm({ faq, onSuccess }: FaqFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateFaqInput>({
    resolver: zodResolver(createFaqSchema),
    defaultValues: {
      question: faq?.question || "",
      answer: faq?.answer || "",
      order: faq?.order || 100,
    },
  });

  async function onSubmit(values: CreateFaqInput) {
    setIsLoading(true);
    try {
      let result;
      if (faq) {
        result = await updateFaqAction(faq.id, values);
      } else {
        result = await createFaqAction(values);
      }

      if (result.error) {
         // Handle server-side validation errors if any
         toast({
            title: "Ошибка",
            description: "Произошла ошибка при сохранении.",
            variant: "destructive"
         });
         console.error(result.error);
      } else {
        toast({
            title: faq ? "Вопрос обновлен" : "Вопрос добавлен",
            description: `Вопрос "${values.question}" был успешно сохранен.`,
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
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Вопрос</FormLabel>
              <FormControl>
                <Input placeholder="Введите вопрос..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ответ</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Введите ответ на вопрос..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Порядок сортировки</FormLabel>
              <FormControl>
                <Input 
                    type="number" 
                    placeholder="100" 
                    {...field} 
                    onChange={e => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
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
