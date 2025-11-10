import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet, useLocation } from "react-router"; 
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { useNavigation } from "../context/NavigationContext"; 
import AppTopNav from "./AppTopNav"; 
import { useEffect } from "react";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { navStyle } = useNavigation();
  const location = useLocation();

  const getMarginLeft = () => {
    const nonAuthRoutes = [
      "/",
      "/calendar",
      "/profile",
      "/form-elements",
      "/basic-tables",
      "/blank",
      "/line-chart",
      "/bar-chart",
      "/alerts",
      "/avatars",
      "/badge",
      "/buttons",
      "/images",
      "/videos",
    ];

    if (!nonAuthRoutes.includes(location.pathname)) {
      return "lg:ml-0"; 
    }
    
    if (navStyle === "top") {
      return "lg:ml-0";
    }

    if (isExpanded || isHovered) {
      return "lg:ml-[290px]";
    }
    return "lg:ml-[90px]";
  };

  const { toggleMobileSidebar } = useSidebar();
  useEffect(() => {
    if (isMobileOpen) {
      toggleMobileSidebar();
    }
  }, [location]);

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar navStyle={navStyle} />
        <Backdrop />
      </div>

      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${getMarginLeft()} ${
          isMobileOpen ? "ml-0" : ""
        }`}
      >
          {navStyle === "side" ? <AppHeader /> : <AppTopNav />}

        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;