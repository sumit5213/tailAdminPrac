import { Link } from "react-router";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Dropdown } from "../ui/dropdown/Dropdown";
import NavigationToggle from "../common/NavigationToggle";
import { useTranslation } from "react-i18next";
// 1. Import Redux hooks and actions
import { useDispatch, useSelector } from "react-redux";
import {
  toggleDropdown,
  closeAllDropdowns,
  selectActiveDropdown,
} from "../../redux/reducers/dropdownSlice"; 
import { AppDispatch, } from "../../redux/store";

export default function UserDropdown() {
  const { t } = useTranslation();
  
  // 2. Get Redux state and dispatch
  const dispatch = useDispatch<AppDispatch>();
  const activeDropdown = useSelector(selectActiveDropdown);
  const isOpen = activeDropdown === "user"; 

  function handleClick() {
    dispatch(toggleDropdown("user")); 
  }

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400"
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
          <img src="/images/user/owner.jpg" alt="User" />
        </span>
        <span className="block mr-1 font-medium text-theme-sm">Musharof</span>
        <svg
          className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={() => dispatch(closeAllDropdowns())} 
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        {/* ... (user info) ... */}

        <div className="py-2 mt-3 border-t border-b border-gray-200 dark:border-gray-800">
          <NavigationToggle />
        </div>

        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
          <li>
            <DropdownItem
              onItemClick={() => dispatch(closeAllDropdowns())} 
              tag="a"
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              {/* ... (icon) ... */}
              {t("layout.userDropdown.editProfile")}
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={() => dispatch(closeAllDropdowns())} 
              tag="a"
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              {/* ... (icon) ... */}
              {t("layout.userDropdown.accountSettings")}
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={() => dispatch(closeAllDropdowns())} 
              tag="a"
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              {/* ... (icon) ... */}
              {t("layout.userDropdown.support")}
            </DropdownItem>
          </li>
        </ul>
        <Link
          to="/signin"
          onClick={() => dispatch(closeAllDropdowns())} 
          className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
        >
          {/* ... (icon) ... */}
          {t("layout.userDropdown.signOut")}
        </Link>
      </Dropdown>
    </div>
  );
}