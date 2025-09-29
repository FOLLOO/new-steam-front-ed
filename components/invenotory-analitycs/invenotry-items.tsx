import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Package,
  Minus,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import ItemRow from "../items/item-row";
import { SkeletonLoader } from "../loading";
import { cn } from "@/lib/utils";


export function InventoryItems({
  title = "Тип объетка",
  data,
  onRemove,
}: {
  title?: string;
  data?: any;
  onRemove?: (itemId: string, category: 'weapons' | 'stickers' | 'agents' | 'containers') => void;
}) {

  const parsePrice = (price: string): number => {
    return parseFloat(price.replace("руб.", "").replace(",", ".").trim());
  };


  const stats = data.reduce(
    (acc, item) => {
      const currentPrice = parsePrice(item.value?.lowest || "0");
      const previousPrice = parsePrice(item.prev_value || "0");
      const quantity = item.quantity || 1;

      const priceChange = currentPrice - previousPrice;

      return {
        totalBalance: acc.totalBalance + currentPrice,
        totalPreviousBalance: acc.totalPreviousBalance + previousPrice,
        totalItems: acc.totalItems + quantity,
        priceChanges: {
          positive: acc.priceChanges.positive + (priceChange > 0 ? 1 : 0),
          negative: acc.priceChanges.negative + (priceChange < 0 ? 1 : 0),
          neutral: acc.priceChanges.neutral + (priceChange === 0 ? 1 : 0),
        },
      };
    },
    {
      totalBalance: 0,
      totalPreviousBalance: 0,
      totalItems: 0,
      priceChanges: { positive: 0, negative: 0, neutral: 0 },
    }
  );

  const totalChange = stats.totalBalance - stats.totalPreviousBalance;
  const totalChangePercent =
    stats.totalPreviousBalance > 0
      ? (totalChange / stats.totalPreviousBalance) * 100
      : 0;

  const formatCurrency = (value: number): string => {
    return value.toLocaleString("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
        <CardTitle className="text-xl font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 && null}
        <div className="space-y-4">
          <div className={cn("grid grid-cols-1 lg:grid-cols-1 gap-4")}>
            {/* Общий баланс */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <p className="text-5xl font-bold text-foreground">
                  {formatCurrency(stats.totalBalance)}
                </p>
                <div className="flex flex-col">
                  <div
                    className={cn(
                      "text-sm flex  items-center gap-1 ",
                      totalChange > 0
                        ? "text-green-600"
                        : totalChange < 0
                        ? "text-red-600"
                        : "text-foreground"
                    )}
                  >
                    {totalChange > 0 ? (
                      <>+</>
                    ) : totalChange < 0 ? (
                      <>-</>
                    ) : (
                      <Minus className="w-4 h-4" />
                    )}
                    {formatCurrency(totalChange)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {totalChangePercent > 0 ? "+" : ""}
                    {totalChangePercent.toFixed(1)}%
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <Package className="w-4 h-4" />
                Всего предметов: {stats.totalItems}
              </div>
              {/* Растущие предметы */}
              <div className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {stats.priceChanges.positive}
                <p className="font-normal text-sm text-muted-foreground">
                  Предмета растут в цене
                </p>
              </div>

              {/* Падающие предметы */}
              <div className="text-sm text-red-600 flex items-center gap-1">
                <TrendingDown className="w-4 h-4" />
                {stats.priceChanges.negative}
                <p className="font-normal text-sm text-muted-foreground">
                  Предмета падают в цене
                </p>
              </div>
            </div>
          </div>


          {data && data.length > 0 ? (
            data.map((item, index) =>
              [...Array(item.quantity)].map((_, i) => (
                <ItemRow onRemove={onRemove} item={item} type="price" key={index + 'ItemROW'} />
              ))
            )
          ) : (
            <SkeletonLoader type="text" />
          )}
        </div>
        <Button className="w-full mt-4" variant="outline">
          View All Transactions
        </Button>
      </CardContent>
    </Card>
  );
}
