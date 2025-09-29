import { Card, CardContent} from "@/components/ui/card"
import { useEffect, useState } from "react"
import { RequestsModel } from "@/bin/RequestsModel"
import ItemRow from "./item-row"


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


  useEffect(() => {
    fetchData('items')
  }, [])


  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          {data.map((item) => (
            <ItemRow item={item} key={item.id + title} type="add"/>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
