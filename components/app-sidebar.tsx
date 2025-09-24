"use client"

import * as React from "react"
import {
  Swords,
  Backpack,
  Library,
  Sticker,
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { InventoryType } from "@/lib/tpes"
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { InventorySwitcher } from "@/components/inventory-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { RequestsModel } from "@/bin/RequestsModel"

// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Инвентарь",
      url: "#",
      icon: Backpack,
      items: [
        {
          title: "Осмотреть",
          url: "#",
        },
        {
          title: "Добавить предмет",
          url: "#",
        },
        {
          title: "Капитализация",
          url: "#",
        },
        {
          title: "Истоиря",
          url: "#",
        },
      ],
    },
    {
      title: "Коллекции ",
      url: "#",
      icon: Library,
      isActive: true,
      items: [
        {
          title: "Стикеры",
          url: "#",
        },
        {
          title: "Кейсы",
          url: "#",
        },
        {
          title: "Агенты",
          url: "#",
        },
        {
          title: "Музыка",
          url: "#",
        },
        {
          title: "Нашивки",
          url: "#",
        },
        {
          title: "Медали",
          url: "#",
        },
        {
          title: "Брелки",
          url: "#",
        },
        {
          title: "Граффити",
          url: "#",
        },
        {
          title: "Прочее",
          url: "#",
        },
      ],
    },
    {
      title: "Оружия",
      url: "#",
      icon: Swords,
      items: [
        {
          title: "Посмотреть все",
          url: "#",
        },
        {
          title: "Мои оружия",
          url: "#",
        },
        {
          title: "Избранное",
          url: "#",
        },
        {
          title: "Типы оружий",
          url: "#",
        },
      ],
    },
    {
      title: "Настройки",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Общее",
          url: "#",
        },
        {
          title: "Профиль",
          url: "#",
        },
        
      ],
    },
  ],
  projects: [
    {
      name: "Импорт данных",
      url: "#",
      icon: Frame,
    },
    {
      name: "Общая капитализация",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Прочее",
      url: "#",
      icon: Map,
    },
  ],
}



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const [userInventories, setUserInventories] = React.useState<InventoryType[]>([])
  const [dataInventories, setdataInventories] = React.useState([])
  const [parsedUser, setParsedUser] = React.useState({
    username: 'undefined',
    email: 'example@mail.ru'
  })
  
  function parseData(data: any[]): InventoryType[] {
    return data.map((obj) => ({
      id: obj.id,
      name: obj.name,
      logo: Backpack, // присваиваем компонент как значение
      plan: obj.createdAt,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt
    }));
  }

  async function fetchData(path: string) {
    const request = new RequestsModel()
    try {
      const res = await request.getAllByUser(path)
      
      setdataInventories(res)
      setUserInventories(parseData(res))
      
      return res
    } catch (error) {
      console.error("Error fetching data:", error)
      return []
    }
  }

  React.useEffect(() => {
    fetchData('inventories')
  }, [])

  React.useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setParsedUser(JSON.parse(userData));
    }
  }, [])

  let temple: InventoryType[] = []
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <InventorySwitcher inventories={userInventories.length !== 0 ? userInventories : temple} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={parsedUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
