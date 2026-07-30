import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Trash2, ReceiptText } from "lucide-react";

export default function SalesPage() {
  const [cart] = useState([
    { id: 1, name: "Urea 50kg", price: 266, qty: 2, total: 532 },
    { id: 2, name: "DAP 50kg", price: 1350, qty: 1, total: 1350 }
  ]);

  const grandTotal = cart.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Point of Sale</h2>
        <p className="text-muted-foreground">
          Create new sales invoices and process payments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Left Side: Product Selection */}
        <div className="lg:col-span-2 space-y-4 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="pb-3 border-b">
              <div className="flex justify-between items-center">
                <CardTitle>Products</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search products..." className="pl-9 bg-muted/50" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-4 grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto max-h-[500px]">
              {[
                { name: "Urea 50kg", price: 266, stock: 120 },
                { name: "DAP 50kg", price: 1350, stock: 45 },
                { name: "MOP 50kg", price: 1700, stock: 8 },
                { name: "Zinc 5kg", price: 320, stock: 65 },
                { name: "NPK 19:19", price: 150, stock: 10 },
                { name: "Roundup 1L", price: 850, stock: 35 },
              ].map((product, idx) => (
                <div key={idx} className="border rounded-lg p-3 hover:border-primary hover:shadow-sm cursor-pointer transition-all bg-card flex flex-col justify-between h-28">
                  <div>
                    <h4 className="font-medium text-sm line-clamp-2">{product.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">Stock: {product.stock}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-semibold text-primary">₹{product.price}</span>
                    <Button size="icon" variant="ghost" className="h-6 w-6 rounded-full bg-primary/10 hover:bg-primary hover:text-white">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Cart & Checkout */}
        <div className="lg:col-span-1">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3 border-b bg-muted/20">
              <CardTitle>Current Sale</CardTitle>
              <div className="mt-4 space-y-2">
                <Label>Select Farmer</Label>
                <Select defaultValue="walkin">
                  <SelectTrigger>
                    <SelectValue placeholder="Select farmer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="walkin">Walk-in Customer</SelectItem>
                    <SelectItem value="f001">Ramesh Patel (F001)</SelectItem>
                    <SelectItem value="f002">Suresh Kumar (F002)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-y-auto">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-center w-16">Qty</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium text-sm py-3">
                        {item.name}
                        <div className="text-xs text-muted-foreground">₹{item.price}/unit</div>
                      </TableCell>
                      <TableCell className="text-center p-0">
                        <Input 
                          type="number" 
                          value={item.qty} 
                          className="w-12 h-8 text-center mx-auto p-1"
                          readOnly
                        />
                      </TableCell>
                      <TableCell className="text-right font-medium py-3">₹{item.total}</TableCell>
                      <TableCell className="py-3 px-2">
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:bg-destructive/10 hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex flex-col border-t bg-muted/10 pt-4 gap-4">
              <div className="w-full space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{grandTotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span>₹0</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                  <span>Total</span>
                  <span className="text-primary">₹{grandTotal}</span>
                </div>
              </div>
              
              <div className="w-full space-y-2">
                <Label>Payment Type</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="default" className="w-full bg-success hover:bg-success/90">
                    Cash
                  </Button>
                  <Button variant="outline" className="w-full border-warning text-warning hover:bg-warning/10">
                    Credit
                  </Button>
                </div>
              </div>
              
              <Button className="w-full gradient-btn shadow-md py-6 text-lg mt-2">
                <ReceiptText className="mr-2 h-5 w-5" /> Generate Invoice
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
