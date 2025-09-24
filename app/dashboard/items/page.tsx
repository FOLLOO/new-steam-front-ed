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



  return (
    <div className="space-y-6 pr-20">
      <div className="w-full flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Предметы</h1>
            <p className="text-xs text-muted-foreground">
              Ищи выбирай любовь свою не теряй
            </p>
          </div>
      </div>
      <div className="grid gap-6 grid-cols-4"> {/* 4 колонки */}
        <div className="flex flex-col gap-6 col-span-3"> {/* 3/4 */}
          <InventoryItems title="Все предметы" />
        </div>
        <div className="flex flex-col gap-6 col-span-1"> {/* 1/4 */}
          <InventoryItems title="Фильтр" />
        </div>
      </div>
    </div>
  );
}
function updateInventory(updateName: any) {
  throw new Error("Function not implemented.");
}
