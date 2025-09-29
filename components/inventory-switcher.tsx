"use client"

import * as React from "react"
import { ChevronRight, ChevronsUpDown, Plus,Folder, FolderOpenIcon, PenIcon, Trash2Icon } from "lucide-react"

import { InventoryType } from "@/lib/tpes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { RequestsModel } from "@/bin/RequestsModel"
import { useInventory } from "./inventory-provider"


type Inventory = {
  name: string;
  id?: string;
}

export function InventorySwitcher({
  inventories = [],
}:{
  inventories?: InventoryType[]
}) {

  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState<InventoryType | null>(inventories[0])
  const [open, setOpen] = React.useState(false)

  const { updateInventory } = useInventory() // получаем функцию обновления

  async function openInventory(inventory: Inventory) {
    let jsonInv = JSON.stringify(inventory)
    localStorage.setItem('inventory', jsonInv)
    updateInventory(inventory)

    location.reload()
  }

  const actions = [
  {
    name: 'Открыть',
    icon: FolderOpenIcon,
    action: (inventory: Inventory) => openInventory(inventory),
    color: ''
  },
  {
    name: 'Редактировать',
    icon: PenIcon,
    action: 'some',
    color: ''

  },
  {
    name: 'Удалить',
    icon: Trash2Icon,
    action: 'some',
    color: 'red-500'
  }
]



  async function handleCreateDatabase() {
    let name = 'CS Инвентарь'
    let request = new RequestsModel()
    let data = {
      name 
    }
    try {
        let inventory = await request.createByUser('inventories', data);

        localStorage.setItem('inventory', inventory)
        updateInventory(inventory)
        
        alert('Инвентарь успешно создан')
    } catch (error) {
        console.error("Submission error:", error);
        alert("Ошибка создания, Подробнее об ошибке в console");
    }
  }

  function rightClick(event: React.MouseEvent<HTMLElement> ){
    event?.preventDefault()
    setOpen(true)
  }

  React.useEffect(() => {
    let activeInv = localStorage.getItem('inventory')
    if (!activeInv || activeInv === 'undefined') { 
      return
    }
    setActiveTeam(JSON.parse(activeInv))
  },[])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          {inventories.length !== 0 ?
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Folder className="size-4"/>
                {/* { activeTeam ? <activeTeam.logo className="size-4" /> :  null } */}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeTeam ?  activeTeam.name : inventories[0].name}</span>
                <span className="truncate text-xs">
                    {new Date(activeTeam ? activeTeam.plan : inventories[0].plan).toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger> :
          <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              onClick={() => handleCreateDatabase()}
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Plus className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Создать Инвентарь</span>
                {/* <span className="truncate text-xs">{activeTeam.plan}</span> */}
              </div>
          </SidebarMenuButton>
        }
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Инвентари
            </DropdownMenuLabel>
            {inventories.length !== 0 && inventories.map((team, index) => (
              <DropdownMenu key={team.name + index}>
                <DropdownMenuTrigger asChild>
                  <DropdownMenuItem
                    onContextMenu={(event) => rightClick(event)}
                    onClick={() => setActiveTeam(team)}
                    className={index == 0 ? 'opacity-70 gap-2 p-2': 'gap-2 p-2'}
                  >
                    <div className="flex size-6 items-center justify-center rounded-xs border">
                      <team.logo className="size-4 shrink-0" /> 
                    </div>
                    {team.name}
                    <DropdownMenuShortcut>⌘{team.id}</DropdownMenuShortcut>
                    {index !== 0 &&  <ChevronRight className="ml-auto size-4" /> }
                  </DropdownMenuItem>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  sideOffset={10}
                  align="start"
                  className="min-w-48"
                >
                  {actions.map((item, i) => ( 
                    <DropdownMenuItem 
                    key={i++} 
                    className="gap-2 p-2"
                    onClick={() => (item.action as Function)({
                      name: team.name,
                      id: team.id?.toString(), // преобразуем number в string
                      updatedAt: team?.updatedAt?.toString(), // преобразуем number в string
                      createdAt: team?.createdAt?.toString() // преобразуем number в string
                    })}
                    >
                      <div className="bg-background flex size-6 items-center justify-center rounded-md border">
                        <item.icon className={`size-4 ${item.color ? `text-${item.color}` : ''}`}/>
                      </div>
                      <div className="text-muted-foreground font-medium">
                        {item.name}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="bg-background flex size-6 items-center justify-center rounded-md border">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Создать инвентарь</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
