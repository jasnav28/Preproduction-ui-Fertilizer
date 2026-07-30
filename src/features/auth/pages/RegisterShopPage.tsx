import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

export default function RegisterShopPage() {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Shop registered successfully");
    navigate("/shop");
  };

  return (
    <div className="flex flex-col space-y-6 h-full max-h-[85vh]">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Register Shop</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Create a new fertilizer shop account.
        </p>
      </div>

      <ScrollArea className="flex-1 pr-4">
        <form className="space-y-6 pb-6" onSubmit={handleRegister}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="shopName">Shop Name</Label>
              <Input id="shopName" required placeholder="Sri Ram Fertilizers" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ownerName">Owner Name</Label>
              <Input id="ownerName" required placeholder="John Doe" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input id="mobile" required placeholder="+91 9876543210" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required placeholder="john@example.com" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gst">GST Number (Optional)</Label>
              <Input id="gst" placeholder="22AAAAA0000A1Z5" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agentCode">Agent Code</Label>
              <Input id="agentCode" placeholder="AGT-1234" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" required placeholder="123 Market Street" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="village">Village</Label>
              <Input id="village" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Input id="district" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode</Label>
              <Input id="pincode" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Subscription Plan</Label>
            <Select defaultValue="basic">
              <SelectTrigger>
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic (Free)</SelectItem>
                <SelectItem value="pro">Pro (₹999/mo)</SelectItem>
                <SelectItem value="enterprise">Enterprise (Custom)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-6">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" required />
            </div>
          </div>

          <Button type="submit" className="w-full gradient-btn shadow-md py-6 text-lg mt-4">
            Complete Registration
          </Button>
        </form>
      </ScrollArea>

      <p className="text-center text-sm text-muted-foreground pt-4 border-t">
        Already have an account?{" "}
        <Link to="/auth/login" className="font-semibold text-primary hover:underline">
          Log in
        </Link>
      </p>

      <div className="pt-2 flex justify-center pb-8">
        <Link to="/shop">
          <Button variant="outline" size="sm" className="text-muted-foreground">
            Skip for testing
          </Button>
        </Link>
      </div>
    </div>
  );
}
