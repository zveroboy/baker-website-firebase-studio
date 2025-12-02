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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { updateProfileSchema, type UpdateProfileValues } from "../schema";
import { updateProfileAction } from "../actions";
import type { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileFormProps {
  user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UpdateProfileValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user.name || "",
      image: user.image || "",
    },
  });

  async function onSubmit(values: UpdateProfileValues) {
    setIsLoading(true);
    try {
      const result = await updateProfileAction(values);

      if (result.error) {
         toast({
            title: "Ошибка",
            description: "Не удалось обновить профиль.",
            variant: "destructive"
         });
      } else {
        toast({
            title: "Профиль обновлен",
            description: "Ваши данные успешно сохранены.",
        });
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-xl">
        <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-20 w-20">
                <AvatarImage src={form.watch("image") || user.image || ""} />
                <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
                <h3 className="text-lg font-medium">{user.email}</h3>
                <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
            </div>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input placeholder="Ваше имя" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL Аватара</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormDescription>
                Ссылка на изображение профиля.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Сохранить изменения
        </Button>
      </form>
    </Form>
  );
}

