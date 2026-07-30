import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-background">
      {/* Top/Left Branding Panel */}
      <div className="flex flex-col justify-between w-full lg:w-1/2 p-8 lg:p-12 bg-gradient-to-br from-primary to-accent text-white rounded-b-[2rem] lg:rounded-b-none lg:rounded-r-[2rem] shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-1">AgriFlow</h2>
          <p className="text-lg lg:text-xl font-normal opacity-90 mb-2 lg:mb-4">By BluNet IT Services</p>
          <p className="text-sm lg:text-base text-primary-foreground/80 font-medium">Empowering Fertilizer Businesses</p>
        </div>
        
        <div className="relative z-10 flex-1 flex flex-col justify-center items-start space-y-4 lg:space-y-6 mt-8 lg:mt-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Manage your shop,<br />
            grow your business.
          </h1>
          <p className="text-base lg:text-lg text-primary-foreground/90 max-w-md">
            The all-in-one platform for fertilizer shops to track inventory, manage farmer credit, and drive sales effortlessly.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 lg:w-96 lg:h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-56 h-56 lg:w-80 lg:h-80 bg-white opacity-10 rounded-full blur-2xl"></div>
      </div>

      {/* Bottom/Right Content Panel */}
      <div className="flex flex-1 flex-col justify-center px-4 py-8 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-background items-center w-full lg:w-1/2 lg:overflow-y-auto lg:h-screen">
        <div className="mx-auto w-full max-w-md my-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
