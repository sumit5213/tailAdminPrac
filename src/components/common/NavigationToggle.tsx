import { useNavigation } from "../../context/NavigationContext";
import Switch from "../form/switch/Switch";
import { useTranslation } from "react-i18next";


export default function NavigationToggle() {
  const { navStyle, toggleNavStyle } = useNavigation();
    const { t } = useTranslation();  


  return (
    <div className="px-3 py-2">
      <Switch
        label={t("layout.navToggle.label")}
        defaultChecked={navStyle === "side"}
        onChange={toggleNavStyle}
      />
    </div>
  );
} 