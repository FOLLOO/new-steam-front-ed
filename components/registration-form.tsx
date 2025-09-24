"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useState } from "react";
import { RequestsModel } from "@/bin/RequestsModel";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  email: z
    .string()
    .min(2, "Название должно содержать минимум 2 символа")
    .max(100, "Название не должно превышать 100 символов"),
  password: z
    .string()
    .min(2, "Название должно содержать минимум 2 символа")
    .max(100, "Название не должно превышать 100 символов"),
  repeat_password: z
    .string()
    .min(2, "Название должно содержать минимум 2 символа")
    .max(100, "Название не должно превышать 100 символов"),
});

type FormData = z.infer<typeof formSchema>;

export function RegistrationForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const form = useForm<FormData>({
    resolver: zodResolver(
      z.object({
        email: z
          .string()
          .min(2, "eamil должно содержать минимум 2 символа")
          .max(100, "email не должно превышать 100 символов")
          .includes("@"),
        password: z
          .string()
          .min(8, "Пароль должен содержать минимум 2 символа")
          .max(100, "Пароль не должен превышать 100 символов"),
        repeat_password: z
          .string()
          .min(2, "Пароль должен содержать минимум 2 символа")
          .max(100, "Пароль не должен превышать 100 символов"),
      })
    ),
    defaultValues: {
      email: "",
      password: "",
      repeat_password: "",
    },
  });

  const passwordValue = form.watch("password");
  const confirmPasswordValue = form.watch("repeat_password");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter()
  const onSubmit = async (data: FormData) => {
    
    setIsSubmitting(true);
    if(passwordValue !== confirmPasswordValue) {
        alert("Пароли не совпадают!")
        setIsSubmitting(true);
    } 
    else{
        const request = new RequestsModel()
        try {
            
            const user = await request.create('users', data);            
            form.reset();

            localStorage.setItem('user', JSON.stringify(user))
            router.push('/dashboard')

        } catch (error) {
            console.error("Submission error:", error);
            alert("Error submitting form. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }     
  };

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6", className)}
        {...props}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-bold">Регистрация</h1>
        </div>
        <div className="grid gap-3">
          <div className="grid gap-3">
            <FormField
              key={"email"}
              control={form.control}
              name={"email"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Eamil *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      {...field}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              key={"password"}
              control={form.control}
              name={"password"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль *</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="password12345"
                      {...field}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              key={"repeat_password"}
              control={form.control}
              name={"repeat_password"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Повторите пароль *</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="password12345"
                      {...field}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4 pt-6">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
              }}
              disabled={isSubmitting}
            >
              Сбросить
            </Button>
          </div>
        </div>
        <div className="text-center text-sm">
          Уже есть аккаунт?{" "}
          <a href="/login" className="underline underline-offset-4">
            Войти
          </a>
        </div>
      </form>
    </Form>
  );
}
