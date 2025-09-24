"use client"

import { createContext, useContext, useState } from "react"

type Inventory = {
  name: string;
  id?: string;
  createdAt?: string,
  updatedAt?: string,
}

type InventoryContextType = {
  inventory: Inventory;
  updateInventory: (newInventory: Inventory) => void;
}

const defaultInventory:Inventory = {
  name: 'CS Инвентарь'
}

const InventoryContext = createContext<InventoryContextType>({
  inventory: defaultInventory,
  updateInventory: () => {}
})

export const InventoryProvider = ({children}: {children: React.ReactNode}) => {
  
  const [inventory, setInventory] = useState<Inventory>(defaultInventory)

  const updateInventory = (newInventory: Inventory) => {
    setInventory(newInventory)
    // Сохраняем в localStorage при обновлении
    console.log('new inventory', newInventory)
    localStorage.setItem('inventory', JSON.stringify(newInventory))
  }


  return(
    <InventoryContext.Provider value={{ inventory, updateInventory }}>
      {children}
    </InventoryContext.Provider>
  )
}

export const useInventory = () => useContext(InventoryContext)