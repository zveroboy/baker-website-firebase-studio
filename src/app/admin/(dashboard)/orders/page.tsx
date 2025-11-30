import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { orders } from "@/lib/data"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

export default function OrdersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Заказы</CardTitle>
        <CardDescription>Просмотр и управление заказами.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Заказ</TableHead>
              <TableHead>Клиент</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Дата заказа</TableHead>
              <TableHead className="text-right">Сумма</TableHead>
              <TableHead>
                <span className="sr-only">Действия</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                    <div className="font-medium">{order.customerName}</div>
                    <div className="text-sm text-muted-foreground">{order.customerEmail}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{order.status}</Badge>
                </TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString("ru-RU")}
                </TableCell>
                <TableCell className="text-right">{order.totalPrice.toLocaleString('ru-RU')} ₽</TableCell>
                <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Действия</DropdownMenuLabel>
                        <DropdownMenuItem>Просмотр</DropdownMenuItem>
                        <DropdownMenuItem>Изменить статус</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
