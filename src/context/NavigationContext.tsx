import type React from "react";
import { createContext, useState, useContext, useEffect } from "react";

type NavStyle = "side" | "top";

type NavigationContextType = {
  navStyle: NavStyle;
  toggleNavStyle: () => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined,
);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [navStyle, setNavStyle] = useState<NavStyle>("side");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedNavStyle = localStorage.getItem("navStyle") as NavStyle | null;
    const initialNavStyle = savedNavStyle || "side";                                            // default as a  side nav

    setNavStyle(initialNavStyle);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("navStyle", navStyle);
    }
  }, [navStyle, isInitialized]);

  const toggleNavStyle = () => {
    setNavStyle((prevStyle) => (prevStyle === "side" ? "top" : "side"));
  };

  return (
    <NavigationContext.Provider value={{ navStyle, toggleNavStyle }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};