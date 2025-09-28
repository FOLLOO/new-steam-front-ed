import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, Sword, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { RequestsModel } from "@/bin/RequestsModel"
import SteamSkinImage from "../steam/steam-skin-image"

const data = [
  {
    id: 1,
    type: "weapon",
    name: " Fade (Field-Tested)",
    createdAt: "2025-09-27T14:10:07.000Z"
  },
  {
    id: 2,
    type: "weapon",
    name: " Fade",
    createdAt: "2025-09-27T14:10:07.000Z"
  },
  {
    id: 3,
    type: "weapon",
    name: " 龍王 (Dragon King)",
    createdAt: "2025-09-27T14:10:07.000Z"
  },
  {
    id: 4,
    type: "weapon",
    name: " Weasel",
    createdAt: "2025-09-27T14:10:07.000Z"
  },
  {
    id: 5,
    type: "weapon",
    name: " Irezumi",
    createdAt: "2025-09-27T14:10:07.000Z"
  }
]

export function ItemsAll({title = 'Тип объетка'}: {title?: string}) {

  const [data, setData] = useState([])

  async function fetchData(path: string) {
    const request = new RequestsModel()
    try {
      const res = await request.getAllByUser(path)
      
      setData(res)
      
      return res
    } catch (error) {
      console.error("Error fetching data:", error)
      return []
    }
  }

  async function addItem(path: string) {
    const request = new RequestsModel()
    try {
      const res = await request.createByUser  (path)
      
      setData(res)
      
      return res
    } catch (error) {
      console.error("Error fetching data:", error)
      return []
    }
  }
  
  function handleAdd(itemID: string) {
    
  }


  useEffect(() => {
    fetchData('items')
  }, [])




  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>

          <p className="text-xs text-muted-foreground">Общий доход по скинам (сейчас)</p>
          </div>
          {data.map((item) => (
            <div key={item.id + title} className="flex items-center gap-2">
                <SteamSkinImage
                  marketHashName={`${item.name} (Field-Tested)`}
                  width={50}
                  height={50}
                  className=""
                  alt={`${item.name} (Field-Tested)`}
                  priority={true}
                />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(
                    item?.createdAt ? item.createdAt : new Date()
                  ).toLocaleDateString("ru-RU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}  
                </p>
              </div>
              <Button className="cursor-pointer">
                <Plus className="h-4" />
                Добавить к себе 
              </Button>
            </div>
          ))}
          
        </div>
      </CardContent>
    </Card>
  )
}
