"use client";

import { ArrowDownRight, ArrowUpRight, Calendar, Copy, Plus, Trash2 } from "lucide-react";
import SteamSkinImage from "../steam/steam-skin-image";
import { Button } from "../ui/button";
import { RequestsModel } from "@/bin/RequestsModel";
import { cn } from "@/lib/utils";
import { error } from "console";
import { useState } from "react";




interface Item {
  id: string;
  name: string;
  createdAt: string;
  inventory_item_id: string,
  value?: {
    lowest?: string;
    median?: string;
  };
  prev_value?: string;
  type_of_weapon?: {
    name: string;
  };
}

interface ItemRowProps {
  item: Item;
  type?: 'add' | 'price' | 'default';
  onRemove?: (itemId: string, category: 'weapons' | 'stickers' | 'agents' | 'containers') => void;
}


// Правильно: используем тип для пропса
export default function ItemRow({ item, type = 'default', onRemove }: ItemRowProps) {

  const [loading, setLoading] = useState(false)

  const parsePrice = (price: string): number => {
    return parseFloat(
      price
        .replace("руб.", "")
        .replace(",", ".")
        .trim()
    );
  };

  // Получаем числовые значения цен
  const currentPrice = parsePrice(item.value?.lowest || "0");
  const previousPrice = parsePrice(item.prev_value || "0");
  
  // Вычисляем изменение цены
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = previousPrice > 0 ? (priceChange / previousPrice) * 100 : 0;
  const isPositiveChange = priceChange >= 0;

  const formatCurrency = (value: number): string => {
    return value.toLocaleString('ru-RU', {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  };

  // Форматируем дату
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };


  async function addItem(path: string, data: {}) {
    const request = new RequestsModel();
    try {
      const res = await request.createByUser(path, data);
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  function handleAdd(itemID: string) {
    let JSONinventory = localStorage.getItem("inventory") || "";
    let inventory = JSON.parse(JSONinventory);

    let data = {
      fk_inventory_id: inventory.id,
      fk_item_id: itemID,
    };
    addItem("inventory_items", data);
  }


  function changeName(){
    let itemName = '';
    switch (type) {
      case type = 'add':
        itemName = item.name
        break;
      case type = 'price':
        itemName = `${item?.type_of_weapon?.name} | ${item.name.replace(' ', '')}`
        break;
      default:
        break;
    }
    return itemName;
  }

  const displayName = changeName();

  async function deleteItem(ID: string,) {
    setLoading(true)
    const request = new RequestsModel()
    
    try{
      await request.deleteByUser('inventory_items/one', ID)
      onRemove && onRemove(ID, 'weapons')
    }catch (error) {
      console.error("Error to delete:", error)
      return []
    }finally{
      setLoading(false)
    }
  }

  console.log(item)

  // async function fethItemsData(){
  //   let inventoryID = localStorage.getItem('inventory') || ''
  //   let invenotory = JSON.parse(inventoryID)

  //   const request = new RequestsModel()
  //   let path = `inventory_items/byinvenotry/${invenotory.id}`
  //   try{
  //     const res = await request.getAllByUser(path)
  //     if (!res || res === 'undefined' || res === null){
  //       setDataNull(true)
  //     }else{
  //       setData(res)
  //       setDataNull(false)
  //     } 
  //   }catch (error) {
  //     console.error("Error fetching invenotry Items data:", error)
  //     return []
  //   }finally{
  //     setLoading(false)
  //   }
  // }

  return (
    <div className="flex items-center gap-4 p-4 transition-colors group select-none ">
      {/* Изображение предмета */}
      <div className="flex-shrink-0">
        <SteamSkinImage
          marketHashName={`${displayName} (Field-Tested)`}
          width={64}
          height={48}
          className=""
          alt={displayName}
          priority={false}
        />
      </div>

      {/* Информация о предмете */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground truncate">
          {displayName}
        </h3>
        
        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(item.createdAt)}</span>
        </div>
      </div>

      {/* Действия и цены */}
      <div className="flex items-center gap-4">
        {type === 'add' && (
          <Button 
            onClick={() => handleAdd(item.id)}
            size="sm"
            className="gap-2 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            Добавить
          </Button>
        )}

        {type === 'price' && (
          <div className="text-right space-y-1">
            {/* Текущая цена */}
            <div className="font-semibold text-foreground">
              {formatCurrency(currentPrice)}
            </div>

            {/* Изменение цены */}
            {previousPrice > 0 && (
              <div className={cn(
                "flex items-center justify-end gap-1 text-sm font-medium",
                isPositiveChange ? "text-green-600" : "text-red-600"
              )}>
                {isPositiveChange ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                <span>
                  {isPositiveChange ? '+' : ''}{formatCurrency(priceChange)}
                </span>
                <span className="text-muted-foreground">
                  ({isPositiveChange ? '+' : ''}{priceChangePercent.toFixed(1)}%)
                </span>
              </div>
            )}
          </div>
          )}

          {type === 'price' && 
          <>
          <Button className="cursor-pointer" onClick={() => deleteItem(item.inventory_item_id)}>
            <Trash2 />
          </Button>
          <Button className="cursor-pointer">
            <Copy />
          </Button>
          </>
          }
      </div>
    </div>
  );
}
