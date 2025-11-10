import { useNavigation } from "../../context/NavigationContext";
import Switch from "../form/switch/Switch";

export default function NavigationToggle() {
  const { navStyle, toggleNavStyle } = useNavigation();

  return (
    <div className="px-3 py-2">
      <Switch
        label="Switch UI"
        defaultChecked={navStyle === "side"}
        onChange={toggleNavStyle}
      />
    </div>
  );
} 