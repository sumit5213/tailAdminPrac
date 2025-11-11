import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet, useLocation } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { useNavigation } from "../context/NavigationContext";
import AppTopNav from "./AppTopNav";
import { useEffect } from "react"; // Added useEffect

// This is your original layout for the side navigation
const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen, toggleMobileSidebar } =
    useSidebar();
  const { navStyle } = useNavigation();
  const location = useLocation();

  // Close mobile sidebar on page change
  useEffect(() => {
    if (isMobileOpen) {
      toggleMobileSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const getMarginLeft = () => {
    // In "top" nav mode, there is never a margin on desktop
    if (navStyle === "top") {
      return "lg:ml-0";
    }

    // In "side" nav mode, calculate margin as before
    if (isExpanded || isHovered) {
      return "lg:ml-[290px]";
    }
    return "lg:ml-[90px]";
  };

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