import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import jsPDF from "jspdf";

const monthlyData = [
  { name: "Jan", sales: 4000, credit: 2400 },
  { name: "Feb", sales: 3000, credit: 1398 },
  { name: "Mar", sales: 2000, credit: 9800 },
  { name: "Apr", sales: 2780, credit: 3908 },
  { name: "May", sales: 1890, credit: 4800 },
  { name: "Jun", sales: 2390, credit: 3800 },
];

const categoryData = [
  { name: "Fertilizers", value: 65 },
  { name: "Pesticides", value: 20 },
  { name: "Seeds", value: 10 },
  { name: "Micronutrients", value: 5 },
];

const COLORS = ["hsl(199 89% 48%)", "hsl(142 72% 29%)", "hsl(38 92% 50%)", "hsl(0 84.2% 60.2%)"];

export default function ReportsPage() {
  const handleGenerateReport = (reportName: string = "General Report") => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(`${reportName} - Sri Ram Fertilizers`, 14, 22);
    
    doc.setFontSize(11);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 32);
    doc.text("This is a system generated report.", 14, 42);
    
    doc.save(`${reportName.toLowerCase().replace(/ /g, '_')}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
          <p className="text-muted-foreground">
            View your business performance and download reports.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleGenerateReport()}>
            <Download className="mr-2 h-4 w-4" /> PDF Report
          </Button>
          <Button className="gradient-btn shadow-md text-white size-sm">
            <Download className="mr-2 h-4 w-4" /> Export Excel
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales vs Credit (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Legend />
                <Bar dataKey="sales" name="Sales (₹)" fill="hsl(199 89% 48%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="credit" name="Credit (₹)" fill="hsl(38 92% 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: "Monthly GST Report", desc: "Sales and tax details for GST filing." },
              { name: "Inventory Valuation", desc: "Current stock value across all categories." },
              { name: "Credit Recovery", desc: "List of farmers with overdue payments." },
            ].map((report, idx) => (
              <div key={idx} className="border p-4 rounded-lg flex flex-col gap-3 hover:border-primary transition-colors cursor-pointer group">
                <div>
                  <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">{report.name}</h4>
                  <p className="text-sm text-muted-foreground">{report.desc}</p>
                </div>
                <Button variant="outline" className="w-full mt-auto" onClick={() => handleGenerateReport(report.name)}>Generate</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
