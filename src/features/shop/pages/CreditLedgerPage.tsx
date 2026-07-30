import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, IndianRupee, ArrowDownRight, ArrowUpRight, FileText } from "lucide-react";

const ledgerData = [
  { id: "TX001", date: "2023-10-25", farmer: "Dilip Desai", type: "Credit", amount: 15000, balance: 28000, ref: "INV-2023-1045" },
  { id: "TX002", date: "2023-10-24", farmer: "Ramesh Patel", type: "Payment", amount: 5000, balance: 12500, ref: "RCP-102" },
  { id: "TX003", date: "2023-10-20", farmer: "Suresh Kumar", type: "Payment", amount: 12000, balance: 0, ref: "RCP-101" },
  { id: "TX004", date: "2023-10-18", farmer: "Anand Singh", type: "Credit", amount: 4500, balance: 4500, ref: "INV-2023-0982" },
  { id: "TX005", date: "2023-10-15", farmer: "Ramesh Patel", type: "Credit", amount: 17500, balance: 17500, ref: "INV-2023-0950" },
];

export default function CreditLedgerPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Credit Ledger</h2>
          <p className="text-muted-foreground">
            Track outstanding balances and receive payments from farmers.
          </p>
        </div>
        <Button size="sm" className="bg-success hover:bg-success/90 shadow-md text-white">
          <IndianRupee className="mr-2 h-4 w-4" /> Receive Payment
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">Total Outstanding</CardTitle>
            <IndianRupee className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">₹1,24,500</div>
            <p className="text-xs text-muted-foreground">From 45 farmers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Given (This Month)</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">₹45,000</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payments Received (This Month)</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">₹32,500</div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-card rounded-lg border shadow-sm">
        <div className="p-4 flex flex-col sm:flex-row gap-4 justify-between border-b">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by farmer name or receipt..."
              className="pl-9 bg-muted/50"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Download PDF
            </Button>
            <Button variant="outline" size="sm">
              Export Excel
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Farmer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ledgerData.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="text-muted-foreground">{tx.date}</TableCell>
                  <TableCell className="font-medium">{tx.id}</TableCell>
                  <TableCell className="font-medium">{tx.farmer}</TableCell>
                  <TableCell>
                    {tx.type === "Credit" ? (
                      <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">Credit Given</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">Payment</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{tx.ref}</TableCell>
                  <TableCell className={`text-right font-medium ${tx.type === "Credit" ? "text-warning" : "text-success"}`}>
                    {tx.type === "Credit" ? "+" : "-"}₹{tx.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-medium">₹{tx.balance.toLocaleString()}</TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <FileText className="h-4 w-4 text-primary" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
