import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal,
  Phone,
  FileText,
  CreditCard,
  Banknote,
  Calendar,
  CheckCircle2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

export type Transaction = {
  id: string;
  type: "Purchase" | "Payment";
  date: string;
  productName?: string;
  qty?: number;
  total: number;
  paymentMethod?: "Cash" | "Credit";
  amountPaid?: number; // Upfront amount paid for credit purchases
};

export type Farmer = {
  id: string;
  name: string;
  mobile: string;
  village: string;
  credit: number;
  lastPurchase: string;
  history: Transaction[];
};

const mockInventory = [
  { id: "INV001", name: "Urea 50kg (IFFCO)", price: 266 },
  { id: "INV002", name: "DAP 50kg (IFFCO)", price: 1350 },
  { id: "INV003", name: "MOP 50kg", price: 1700 },
  { id: "INV004", name: "Roundup Herbicide 1L", price: 850 },
  { id: "INV005", name: "Zinc Sulphate 5kg", price: 320 },
];

const initialFarmersData: Farmer[] = [
  { 
    id: "F001", name: "Ramesh Patel", mobile: "+91 9876543210", village: "Rampur", credit: 1350, lastPurchase: "2023-10-15",
    history: [
      { id: "TRX001", type: "Purchase", date: "2023-10-15", productName: "DAP 50kg (IFFCO)", qty: 1, total: 1350, paymentMethod: "Credit", amountPaid: 0 }
    ]
  },
  { id: "F002", name: "Suresh Kumar", mobile: "+91 8765432109", village: "Sitapur", credit: 0, lastPurchase: "2023-10-20", history: [] },
  { id: "F003", name: "Anand Singh", mobile: "+91 7654321098", village: "Madhopur", credit: 0, lastPurchase: "2023-10-18", history: [] },
];

export default function FarmersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [farmers, setFarmers] = useState<Farmer[]>(initialFarmersData);
  
  // Add Farmer State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newFarmerName, setNewFarmerName] = useState("");
  const [newFarmerMobile, setNewFarmerMobile] = useState("");
  const [newFarmerVillage, setNewFarmerVillage] = useState("");

  // Profile Dialog State
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
  
  // Billing State
  const [selectedProduct, setSelectedProduct] = useState("");
  const [billQty, setBillQty] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"Cash" | "Credit">("Cash");
  const [upfrontPayment, setUpfrontPayment] = useState<number>(0);

  // Repayment State
  const [repaymentAmount, setRepaymentAmount] = useState<number>(0);

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
  };

  const handleAddFarmer = (e: React.FormEvent) => {
    e.preventDefault();
    const newFarmer: Farmer = {
      id: `F00${farmers.length + 1}`,
      name: newFarmerName,
      mobile: newFarmerMobile,
      village: newFarmerVillage,
      credit: 0,
      lastPurchase: "N/A",
      history: []
    };
    setFarmers([newFarmer, ...farmers]);
    toast.success("New farmer added successfully");
    setIsAddOpen(false);
    setNewFarmerName("");
    setNewFarmerMobile("");
    setNewFarmerVillage("");
  };

  const handleGenerateBill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFarmer || !selectedProduct) return;

    const product = mockInventory.find(p => p.id === selectedProduct);
    if (!product) return;

    const total = product.price * billQty;
    
    // Calculate credit added based on upfront payment
    const amountPaid = paymentMethod === "Credit" ? upfrontPayment : total;
    const creditAdded = paymentMethod === "Credit" ? Math.max(0, total - upfrontPayment) : 0;
    
    const newTransaction: Transaction = {
      id: `TRX${Math.floor(Math.random() * 10000)}`,
      type: "Purchase",
      date: new Date().toISOString().split('T')[0],
      productName: product.name,
      qty: billQty,
      total,
      paymentMethod,
      amountPaid
    };

    const updatedFarmers = farmers.map(f => {
      if (f.id === selectedFarmer.id) {
        const updatedFarmer = {
          ...f,
          lastPurchase: newTransaction.date,
          credit: f.credit + creditAdded,
          history: [newTransaction, ...f.history]
        };
        setSelectedFarmer(updatedFarmer); // Update currently viewed farmer
        return updatedFarmer;
      }
      return f;
    });

    setFarmers(updatedFarmers);
    toast.success(`Bill generated for ₹${total.toLocaleString()}`);
    
    // Reset billing form
    setSelectedProduct("");
    setBillQty(1);
    setPaymentMethod("Cash");
    setUpfrontPayment(0);
  };

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFarmer || repaymentAmount <= 0) return;

    const newTransaction: Transaction = {
      id: `PAY${Math.floor(Math.random() * 10000)}`,
      type: "Payment",
      date: new Date().toISOString().split('T')[0],
      total: repaymentAmount,
    };

    const updatedFarmers = farmers.map(f => {
      if (f.id === selectedFarmer.id) {
        const updatedFarmer = {
          ...f,
          credit: Math.max(0, f.credit - repaymentAmount),
          history: [newTransaction, ...f.history]
        };
        setSelectedFarmer(updatedFarmer);
        return updatedFarmer;
      }
      return f;
    });

    setFarmers(updatedFarmers);
    toast.success(`Payment of ₹${repaymentAmount.toLocaleString()} recorded successfully`);
    setRepaymentAmount(0);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Farmers</h2>
          <p className="text-muted-foreground">
            Manage your customer base and view their credit history.
          </p>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gradient-btn shadow-md">
              <Plus className="mr-2 h-4 w-4" /> Add Farmer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Farmer</DialogTitle>
              <DialogDescription>
                Enter the details of the new farmer below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddFarmer} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" required value={newFarmerName} onChange={e => setNewFarmerName(e.target.value)} placeholder="e.g. Ramesh Patel" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input id="mobile" required value={newFarmerMobile} onChange={e => setNewFarmerMobile(e.target.value)} placeholder="e.g. +91 9876543210" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="village">Village</Label>
                <Input id="village" required value={newFarmerVillage} onChange={e => setNewFarmerVillage(e.target.value)} placeholder="e.g. Rampur" />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                <Button type="submit">Save Farmer</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-lg border shadow-sm">
        <div className="p-4 flex flex-col sm:flex-row gap-4 justify-between border-b">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search farmers by name or phone..."
              className="pl-9 bg-muted/50"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" /> Filter Options
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Farmer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Village</TableHead>
                <TableHead className="text-right">Outstanding Credit</TableHead>
                <TableHead>Last Purchase</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {farmers.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()) || f.mobile.includes(searchTerm)).map((farmer) => (
                <TableRow key={farmer.id} className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setSelectedFarmer(farmer)}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${farmer.name}`} />
                        <AvatarFallback>{getInitials(farmer.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{farmer.name}</span>
                        <span className="text-xs text-muted-foreground">{farmer.id}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Phone className="mr-2 h-3 w-3 text-muted-foreground" />
                      {farmer.mobile}
                    </div>
                  </TableCell>
                  <TableCell>{farmer.village}</TableCell>
                  <TableCell className="text-right">
                    <span className={`font-medium ${farmer.credit > 0 ? "text-destructive" : "text-muted-foreground"}`}>
                      ₹{farmer.credit.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>{farmer.lastPurchase}</TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setSelectedFarmer(farmer)}>
                          <FileText className="mr-2 h-4 w-4" /> View Profile & Bill
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="p-4 border-t flex items-center justify-between text-sm text-muted-foreground">
          <div>Showing 1 to {farmers.length} of {farmers.length} entries</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </div>

      {/* Farmer Profile Dialog */}
      <Dialog open={!!selectedFarmer} onOpenChange={(open) => !open && setSelectedFarmer(null)}>
        <DialogContent className="max-w-3xl h-[80vh] flex flex-col overflow-hidden p-0 border-0">
          {selectedFarmer && (
            <div className="flex flex-col h-full bg-background rounded-xl">
              <DialogHeader className="p-6 border-b bg-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <Avatar className="h-16 w-16 border-2 border-primary/20 shadow-sm">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${selectedFarmer.name}`} />
                      <AvatarFallback className="text-2xl font-semibold">{getInitials(selectedFarmer.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <DialogTitle className="text-2xl tracking-tight">{selectedFarmer.name}</DialogTitle>
                      <DialogDescription className="flex items-center gap-3 mt-1.5 text-sm font-medium">
                        <span className="flex items-center text-foreground/80"><Phone className="mr-1.5 h-3.5 w-3.5" /> {selectedFarmer.mobile}</span>
                        <span className="text-border">•</span>
                        <span className="text-foreground/80">{selectedFarmer.village}</span>
                      </DialogDescription>
                    </div>
                  </div>
                  <div className="text-right bg-muted/40 px-4 py-2 rounded-xl border border-muted-foreground/10">
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Outstanding Balance</p>
                    <p className={`text-3xl font-bold tracking-tight ${selectedFarmer.credit > 0 ? 'text-destructive' : 'text-success'}`}>
                      ₹{selectedFarmer.credit.toLocaleString()}
                    </p>
                  </div>
                </div>
              </DialogHeader>

              <Tabs defaultValue="bill" className="flex-1 grid grid-rows-[auto_minmax(0,1fr)] gap-4 mt-4 px-6 overflow-hidden">
                <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/50 rounded-lg h-auto">
                  <TabsTrigger value="bill" className="rounded-md">Create Bill</TabsTrigger>
                  <TabsTrigger value="history" className="rounded-md">Credit Outstanding</TabsTrigger>
                </TabsList>
                
                <TabsContent value="bill" className="h-full min-h-0 outline-none data-[state=active]:flex data-[state=active]:flex-col m-0 pb-6">
                  <form onSubmit={handleGenerateBill} className="flex-1 grid grid-rows-[minmax(0,1fr)_auto] gap-6 overflow-hidden">
                    <div className="overflow-y-auto space-y-5 bg-card p-6 rounded-2xl border shadow-sm pr-2">
                      <h3 className="font-semibold text-lg border-b pb-3 flex items-center gap-2">
                        <Plus className="h-5 w-5 text-primary" /> New Purchase
                      </h3>
                      
                      <div className="space-y-2">
                        <Label className="text-muted-foreground font-semibold">Select Product</Label>
                        <Select value={selectedProduct} onValueChange={setSelectedProduct} required>
                          <SelectTrigger className="h-12 border-primary/20 bg-primary/5 focus:ring-primary/20">
                            <SelectValue placeholder="Choose a product from inventory" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockInventory.map(prod => (
                              <SelectItem key={prod.id} value={prod.id} className="font-medium">
                                {prod.name} — <span className="text-muted-foreground">₹{prod.price}</span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-muted-foreground font-semibold">Quantity</Label>
                        <Input 
                          type="number" 
                          min="1" 
                          className="h-12 border-primary/20 bg-primary/5 focus-visible:ring-primary/20"
                          value={billQty} 
                          onChange={(e) => setBillQty(parseInt(e.target.value) || 1)} 
                          required 
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-muted-foreground font-semibold">Payment Method</Label>
                        <Select value={paymentMethod} onValueChange={(val: "Cash" | "Credit") => setPaymentMethod(val)} required>
                          <SelectTrigger className="h-12 border-primary/20 bg-primary/5 focus:ring-primary/20">
                            <SelectValue placeholder="Select payment type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Cash">Cash (Immediate Payment)</SelectItem>
                            <SelectItem value="Credit">Credit (Add to Ledger)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {paymentMethod === "Credit" && (
                        <div className="space-y-2 bg-primary/5 p-4 rounded-xl border border-primary/10">
                          <Label className="text-muted-foreground font-semibold">Amount Paid Upfront (₹)</Label>
                          <p className="text-xs text-muted-foreground mb-2">Enter any amount paid now. The rest goes to credit.</p>
                          <Input 
                            type="number" 
                            min="0"
                            max={selectedProduct ? ((mockInventory.find(p => p.id === selectedProduct)?.price || 0) * billQty) : 0}
                            className="h-12 border-primary/20 bg-background focus-visible:ring-primary/20"
                            value={upfrontPayment || ""} 
                            onChange={(e) => setUpfrontPayment(Number(e.target.value) || 0)} 
                          />
                        </div>
                      )}
                    </div>

                    <div className="bg-primary/5 p-5 rounded-2xl border border-primary/20 flex justify-between items-center shadow-inner">
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Total Bill Amount</p>
                        <p className="text-4xl font-bold tracking-tight text-primary">
                          ₹{selectedProduct ? ((mockInventory.find(p => p.id === selectedProduct)?.price || 0) * billQty).toLocaleString() : "0"}
                        </p>
                        {paymentMethod === "Credit" && (
                          <p className="text-sm font-medium text-destructive mt-1">
                            ₹{Math.max(0, (selectedProduct ? ((mockInventory.find(p => p.id === selectedProduct)?.price || 0) * billQty) : 0) - upfrontPayment).toLocaleString()} will be added to credit
                          </p>
                        )}
                      </div>
                      <Button type="submit" size="lg" className="gradient-btn h-14 px-8 text-lg shadow-md rounded-xl">
                        Generate Bill
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="history" className="h-full min-h-0 outline-none data-[state=active]:flex data-[state=active]:flex-col m-0 pb-6 gap-6">
                  <div className="shrink-0 bg-card p-5 rounded-2xl border shadow-sm">
                    <form onSubmit={handleRecordPayment} className="flex flex-col sm:flex-row gap-4 items-end">
                      <div className="flex-1 space-y-2 w-full">
                        <Label className="text-muted-foreground font-semibold">Make a Payment (₹)</Label>
                          <Input 
                            type="number" 
                            min="1" 
                            max={selectedFarmer.credit > 0 ? selectedFarmer.credit : 999999}
                            className="h-12 text-lg font-semibold border-primary/20 bg-primary/5 focus-visible:ring-primary/20"
                            value={repaymentAmount || ""} 
                            onChange={(e) => setRepaymentAmount(Number(e.target.value) || 0)} 
                            placeholder="Enter amount..."
                            required 
                          />
                        </div>
                        <Button 
                          type="submit" 
                          size="lg" 
                          className="h-12 px-6 text-base shadow-md rounded-xl gradient-btn w-full sm:w-auto shrink-0"
                          disabled={selectedFarmer.credit <= 0}
                        >
                          Make Payment
                        </Button>
                      </form>
                    </div>
                  <ScrollArea className="flex-1 pr-4 bg-card rounded-2xl border shadow-sm p-4">
                    <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Transaction Ledger</h4>
                    {selectedFarmer.history.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
                        <FileText className="h-12 w-12 mb-4 opacity-20" />
                        <p className="font-medium">No transaction history found.</p>
                      </div>
                    ) : (
                      <div className="space-y-3 pb-4">
                        {selectedFarmer.history.map((trx) => (
                          <div key={trx.id} className="flex justify-between items-center p-4 bg-card border rounded-xl hover:shadow-sm transition-all group">
                            <div className="flex items-center gap-4">
                              <div className={`p-3 rounded-full flex-shrink-0 transition-colors ${
                                trx.type === 'Payment' ? 'bg-green-500/10 text-green-600 group-hover:bg-green-500/20' : 
                                (trx.paymentMethod === 'Credit' ? 'bg-destructive/10 text-destructive group-hover:bg-destructive/20' : 'bg-primary/10 text-primary group-hover:bg-primary/20')
                              }`}>
                                {trx.type === 'Payment' ? <CheckCircle2 className="h-5 w-5" /> : (trx.paymentMethod === 'Credit' ? <CreditCard className="h-5 w-5" /> : <Banknote className="h-5 w-5" />)}
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground/90">
                                  {trx.type === 'Payment' ? 'Credit Repayment' : trx.productName}
                                </h4>
                                <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1 font-medium">
                                  <Calendar className="h-3.5 w-3.5" /> {trx.date} 
                                  {trx.type === 'Purchase' && (
                                    <>
                                      <span className="text-border mx-1">•</span> Qty: {trx.qty}
                                    </>
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-xl tracking-tight">₹{trx.total.toLocaleString()}</p>
                              {trx.type === 'Purchase' && (
                                <p className={`text-[10px] uppercase tracking-widest font-bold mt-1 ${trx.paymentMethod === 'Credit' ? 'text-destructive' : 'text-primary'}`}>
                                  {trx.paymentMethod} {trx.paymentMethod === 'Credit' && trx.amountPaid && trx.amountPaid > 0 ? `(₹${trx.amountPaid} PAID)` : ''}
                                </p>
                              )}
                              {trx.type === 'Payment' && (
                                <p className="text-[10px] uppercase tracking-widest font-bold mt-1 text-green-600">
                                  PAYMENT
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
