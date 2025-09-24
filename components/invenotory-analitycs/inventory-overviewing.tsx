"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, Plus, Send, CreditCard, MoreHorizontal } from "lucide-react"

const initialAccounts = [
  { name: "Checking", balance: 7500 },
  { name: "Savings", balance: 560000 },
  { name: "Investment", balance: 5879000 },
]

export function InventoryOverviewing() {
  const [accounts, setAccounts] = useState(initialAccounts)


  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">Капитализация инвенторя</CardTitle>
        <Wallet className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">${totalBalance.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">Total balance across all accounts</p>
        <div className="mt-4 space-y-2">
          {accounts.map((account) => (
            <div key={account.name} className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{account.name}</span>
              <span className="text-xl font-medium">${account.balance.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-1 gap-2 slect-none">
          {/* <Link href="/" className="flex items-center space-x-2">;
            <Plus className="mr-2 h-4 w-4" />
            <span className="inline-block font-bold">Внести бабки</span>
          </Link> */}
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            <span className="inline-block font-bold">Внести бабки</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
