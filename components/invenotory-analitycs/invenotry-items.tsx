import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

const transactions = [
  { id: 122, name: "Amazon.com", amount: -129.99, date: "2023-07-15", type: "expense" },
  { id: 223, name: "Whole Foods Market", amount: -89.72, date: "2023-07-10", type: "expense" },
  { id: 33, name: "Netflix Subscription", amount: -15.99, date: "2023-07-05", type: "expense" },
  { id: 4123, name: "Freelance Payment", amount: 750, date: "2023-07-12", type: "income" },
  { id: 51234, name: "Gas Station", amount: -45.5, date: "2023-07-18", type: "expense" },
  { id: 234, name: "Amazon.com", amount: -129.99, date: "2023-07-15", type: "expense" },
  { id: 12342, name: "Whole Foods Market", amount: -89.72, date: "2023-07-10", type: "expense" },
  { id: 12343, name: "Netflix Subscription", amount: -15.99, date: "2023-07-05", type: "expense" },
  { id: 41243, name: "Freelance Payment", amount: 750, date: "2023-07-12", type: "income" },
  { id: 12345, name: "Gas Station", amount: -45.5, date: "2023-07-18", type: "expense" },
]

export function InventoryItems({title = 'Тип объетка'}: {title?: string}) {

  let totalBalance = transactions.map((item) => item.amount).reduce((sum, amount) => sum + amount, 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>

          <div className={totalBalance > 0 ? "text-4xl text-green-500 font-bold": "text-4xl text-red-500 font-bold"}>${totalBalance.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Общий доход по скинам (сейчас)</p>
          </div>
          {transactions.map((transaction) => (
            <div key={transaction.id + title} className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium">{transaction.name}</p>
                <p className="text-xs text-muted-foreground">{transaction.date}</p>
              </div>
              <div className="flex items-center">
                <span
                  className={`text-sm font-medium ${
                    transaction.type === "income"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
                </span>
                {transaction.type === "income" ? (
                  <ArrowUpRight className="h-4 w-4 text-green-600 dark:text-green-400 ml-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-600 dark:text-red-400 ml-1" />
                )}
              </div>
            </div>
          ))}
        </div>
        <Button className="w-full mt-4" variant="outline">
          View All Transactions
        </Button>
      </CardContent>
    </Card>
  )
}
