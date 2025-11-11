import type React from "react";
import { useEffect, useRef } from "react";
import { useDropdown } from "../../../context/DropdownContext"; // 

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  onClose, // We still accept onClose as a prop for flexibility
  children,
  className = "",
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { closeAllDropdowns } = useDropdown(); // 2. Get context function

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        // 3. Check for the toggle class
        !(event.target as HTMLElement).closest(".dropdown-toggle")
      ) {
        closeAllDropdowns(); // 4. Use context function to close
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeAllDropdowns]); // 5. Depend on context function

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`absolute z-40  right-0 mt-2  rounded-xl border border-gray-200 bg-white  shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark ${className}`}
    >
      {children}
    </div>
  );
};