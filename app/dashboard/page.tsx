"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Plus, PenIcon, Folder, Snail } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { InventoryItems } from "@/components/invenotory-analitycs/invenotry-items";
import { InventoryOverviewing } from "@/components/invenotory-analitycs/inventory-overviewing";
import { RecentTransactions } from "@/components/invenotory-analitycs/recent-transactions";
import { Input } from "@/components/ui/input";
import { RequestsModel } from "@/bin/RequestsModel";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup, // ← этого может не хватать
  DropdownMenuShortcut,
  DropdownMenuSeparator, // если нужен разделитель
} from "@/components/ui/dropdown-menu"
import { objectDictionaries } from "@/bin/utils";
import { Separator } from "@radix-ui/react-separator";
import { useRouter } from "next/navigation";


type Inventory = {
  name: string;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
};

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Название должно содержать минимум 2 символа")
    .max(100, "Название не должно превышать 100 символов"),
});

type FormData = z.infer<typeof formSchema>;

export default function Page() {
  const [data, setData] = useState<Inventory>();
  const [edit, setEdit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(
      z.object({
        name: z
          .string()
          .min(2, "eamil должно содержать минимум 2 символа")
          .max(100, "email не должно превышать 100 символов"),
      })
    ),
    defaultValues: {
      name: data?.name,
    },
  });

  const onSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    const request = new RequestsModel();
    const id = data?.id;
    if (!id || id === "undefined") {
      return alert("ID не обнаружен");
    }
    try {
      let updateName = await request.updateByUser("inventories", formData, id);
      localStorage.setItem("invetory", JSON.stringify(updateName));
      updateInventory(updateName);

      form.reset();
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
      setEdit(!edit);
    }
  };

  useEffect(() => {
    let inv = localStorage.getItem("invetory");
    if (inv) {
      setData(JSON.parse(inv));
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="w-full flex justify-between items-center">
        {!edit ? (
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{data?.name}</h1>
            <p className="text-xs text-muted-foreground">
              Дата создания{" "}
              {new Date(
                data?.createdAt ? data.createdAt : new Date()
              ).toLocaleDateString("ru-RU", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                key={"name"}
                control={form.control}
                name={"name"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название *</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={data?.name}
                        {...field}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Сохраняем..." : "Сохранить"}
              </Button>
            </form>
          </Form>
        )}
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="cursor-pointer">
                <Plus className="h-4" />
                Добавить предмет
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" >
              <DropdownMenuGroup>
                <DropdownMenuLabel>Выберите тип прдемета</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                {objectDictionaries.map((item, index) => (
                  <DropdownMenuItem key={item.name + index}>
                  {item.name}
                </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={() => router.push('/dashboard/items')}>
                  <Snail className="size-4"/>
                  Сам решу
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button className="cursor-pointer" onClick={() => setEdit(!edit)}>
            <PenIcon className="h-4" />
            Измнеить название
          </Button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-1">
          <InventoryOverviewing />

          <RecentTransactions />
        </div>
        <div className="flex flex-col gap-6 lg:col-span-1">
          <InventoryItems title="Оружия" />

          <InventoryItems title="Стикеры" />
        </div>
        <div className="flex flex-col gap-6 lg:col-span-1">
          <InventoryItems title="Контейнры" />

          <InventoryItems title="Агенты" />
        </div>
      </div>

      {/* <BusinessMetrics /> */}
    </div>
  );
}
function updateInventory(updateName: any) {
  throw new Error("Function not implemented.");
}
