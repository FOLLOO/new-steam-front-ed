"use client";
import { InventoryItems } from "@/components/invenotory-analitycs/invenotry-items";
import { InventoryOverviewing } from "@/components/invenotory-analitycs/inventory-overviewing";
import { RecentTransactions } from "@/components/invenotory-analitycs/recent-transactions";

import DahsboardHeader from "@/components/dashboard/dashboard-header";
import { useEffect, useState } from "react";
import { RequestsModel } from "@/bin/RequestsModel";
import LoadingSpinner, { LoadingButton, PageLoader, ProgressBar, SkeletonLoader } from "@/components/loading";


export default function Page() {
  
  const [data, setData] = useState({items:{
    weapons: [],
    stickers: [],
    agents: [],
    containers: []
  }})

  const [loading, setLoading] = useState(true)
  const [dataNull, setDataNull] = useState(true)

  const [progress, setProgress] = useState(0);

  const simulateLoad = () => {
    setLoading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // http://localhost:5000/api/inventory_items/byinvenotry/2

  async function fethItemsData(){
    let inventoryID = localStorage.getItem('inventory') || ''
    let invenotory = JSON.parse(inventoryID)

    const request = new RequestsModel()
    let path = `inventory_items/byinvenotry/${invenotory.id}`
    try{
      const res = await request.getAllByUser(path)
      if (!res || res === 'undefined' || res === null){
        setDataNull(true)
      }else{
        setData(res)
        setDataNull(false)
      } 
    }catch (error) {
      console.error("Error fetching invenotry Items data:", error)
      return []
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fethItemsData()
  }, [])
  
const handleRemoveItem = (itemId: string, category: keyof typeof data.items) => {
  setData(prevData => {
    const updatedCategory = prevData.items[category].map((item: any) => {
      // Находим объект по inventory_item_id
      if (item.inventory_item_id === itemId) {
        // Если количество больше 1, уменьшаем quantity
        if (item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1
          };
        }
        // Если quantity = 1, возвращаем null для фильтрации (полное удаление)
        return null;
      }
      return item;
    }).filter(Boolean); // Удаляем null значения

    return {
      ...prevData,
      items: {
        ...prevData.items,
        [category]: updatedCategory
      }
    };
  });
};

  return (
    <div className="space-y-6">
      <DahsboardHeader/>
      {loading && progress < 100 && <PageLoader />}
      {/* {} */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-8">
        <div className="flex flex-col gap-6 lg:col-span-2 md:col-span-3">
          <InventoryOverviewing />
        </div>
        <div className="flex flex-col gap-6 lg:col-span-3 md:col-span-3">
          <InventoryItems onRemove={handleRemoveItem} data={data?.items?.weapons || []} title="Оружия"  />
          {/* <InventoryItems data={data?.items?.stickers || []} title="Стикеры" /> */}
        </div>
        <div className="flex flex-col gap-6 lg:col-span-1 md:col-span-3">
          {/* <InventoryItems data={data?.items?.containers || []} title="Контейнры" /> */}
          {/* <InventoryItems data={data?.items?.agents || []} title="Агенты" /> */}
        </div>
      </div>
      {/* <BusinessMetrics /> */}
    </div>
  );
}

