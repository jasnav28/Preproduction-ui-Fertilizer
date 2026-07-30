import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Successfully logged in");
    navigate("/shop");
  };

  return (
    <div className="flex flex-col space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Welcome Back</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Enter your credentials to access your account.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleLogin}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="name@example.com" required />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/auth/forgot-password" className="text-sm font-medium text-primary hover:underline">
              Forgot Password?
            </Link>
          </div>
          <Input id="password" type="password" required />
        </div>

        <div className="flex items-center space-x-2">
          <input type="checkbox" id="remember" className="rounded border-gray-300 text-primary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
          <Label htmlFor="remember" className="text-sm font-normal">Remember me</Label>
        </div>

        <Button type="submit" className="w-full gradient-btn shadow-md py-6 text-lg">
          Log In
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/auth/register" className="font-semibold text-primary hover:underline">
          Register your shop
        </Link>
      </p>

      <div className="pt-4 flex justify-center">
        <Link to="/shop">
          <Button variant="outline" size="sm" className="text-muted-foreground">
            Skip for testing
          </Button>
        </Link>
      </div>
    </div>
  );
}
