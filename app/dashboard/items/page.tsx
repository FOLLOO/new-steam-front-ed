"use client";

import { ItemsFilter } from "@/components/items/items-filter";
import { ItemsAll } from "@/components/items/items-all";



export default function Page() {
  return (
    <div className="space-y-6 pr-20">
      <div className="w-full flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Все предметы</h1>
            <p className="text-xs text-muted-foreground">
              Ищи выбирай любовь свою не теряй
            </p>
          </div>
      </div>
      <div className="grid gap-6 grid-cols-6"> {/* 4 колонки */}
        <div className="flex flex-col gap-6 col-span-4"> {/* 3/4 */}
          <ItemsAll title="Все предметы" />
        </div>
        <div className="flex flex-col gap-6 col-span-2"> {/* 1/4 */}
          <ItemsFilter  />
        </div>
      </div>
    </div>
  );
}
