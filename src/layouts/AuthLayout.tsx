import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Left Branding Panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 bg-gradient-to-br from-primary to-accent text-white rounded-r-[2rem] shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold tracking-tight mb-1">AgriFlow</h2>
          <p className="text-xl font-normal opacity-90 mb-4">By BluNet IT Services</p>
          <p className="text-primary-foreground/80 font-medium">Empowering Fertilizer Businesses</p>
        </div>
        
        <div className="relative z-10 flex-1 flex flex-col justify-center items-start space-y-6 mt-12">
          <h1 className="text-5xl font-bold leading-tight">
            Manage your shop,<br />
            grow your business.
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-md">
            The all-in-one platform for fertilizer shops to track inventory, manage farmer credit, and drive sales effortlessly.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-white opacity-10 rounded-full blur-2xl"></div>
      </div>

      {/* Right Content Panel */}
      <div className="flex flex-1 flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-background items-center w-full lg:w-1/2">
        <div className="mx-auto w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
