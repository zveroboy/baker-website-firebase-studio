"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import type { FAQ } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  question: z.string().min(10, {
    message: "Вопрос должен содержать не менее 10 символов.",
  }),
  answer: z.string().min(20, {
    message: "Ответ должен содержать не менее 20 символов.",
  }),
});

type FaqFormValues = z.infer<typeof formSchema>;

interface FaqFormProps {
  faq?: FAQ | null;
  onSuccess?: () => void;
}

export function FaqForm({ faq, onSuccess }: FaqFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FaqFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: faq?.question || "",
      answer: faq?.answer || "",
    },
  });

  function onSubmit(values: FaqFormValues) {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: faq ? "Вопрос обновлен" : "Вопрос добавлен",
        description: `Вопрос "${values.question}" был успешно сохранен.`,
      });
      onSuccess?.();
    }, 1000);
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
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Сохранить
        </Button>
      </form>
    </Form>
  );
}

