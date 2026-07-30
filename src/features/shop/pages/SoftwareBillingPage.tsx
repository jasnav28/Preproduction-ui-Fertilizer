import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, CreditCard, CalendarDays, History } from "lucide-react";

export default function SoftwareBillingPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Software Billing</h2>
        <p className="text-muted-foreground mt-2">Manage your subscription and billing history.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-primary/20 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <CreditCard className="w-24 h-24" />
          </div>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>You are currently on the Pro plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold">₹1,500</span>
                <span className="text-muted-foreground mb-1">/ month</span>
              </div>
              <Badge variant="outline" className="w-fit bg-success/10 text-success border-success/20">Active</Badge>
              <div className="pt-4 flex gap-4">
                <Button className="gradient-btn">Renew Now</Button>
                <Button variant="outline">Change Plan</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Subscription Status</CardTitle>
            <CardDescription>Next billing date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-full">
                  <CalendarDays className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Renews On</p>
                  <p className="text-2xl font-bold">Nov 15, 2026</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-primary">15 days remaining</span>
                  <span className="text-muted-foreground">30 days total</span>
                </div>
                <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-1/2 rounded-full"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Billing History</CardTitle>
          </div>
          <CardDescription>Your past subscription payments and invoices.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Invoice</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Oct 15, 2026</TableCell>
                <TableCell>Pro Plan</TableCell>
                <TableCell>₹1,500</TableCell>
                <TableCell><Badge variant="outline" className="bg-success/10 text-success border-success/20">Paid</Badge></TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    <Download className="h-3.5 w-3.5" /> PDF
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Sep 15, 2026</TableCell>
                <TableCell>Pro Plan</TableCell>
                <TableCell>₹1,500</TableCell>
                <TableCell><Badge variant="outline" className="bg-success/10 text-success border-success/20">Paid</Badge></TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    <Download className="h-3.5 w-3.5" /> PDF
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Aug 15, 2026</TableCell>
                <TableCell>Basic Plan</TableCell>
                <TableCell>₹0</TableCell>
                <TableCell><Badge variant="outline" className="bg-success/10 text-success border-success/20">Paid</Badge></TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="h-8 gap-1" disabled>
                    <Download className="h-3.5 w-3.5" /> PDF
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
