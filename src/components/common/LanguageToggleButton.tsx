import { useTranslation } from "react-i18next";

export const LanguageToggleButton: React.FC = () => {
  const { i18n, t } = useTranslation();

  const currentLanguage = i18n.language.startsWith("hi") ? "hi" : "en";
  const nextLanguage = currentLanguage === "en" ? "hi" : "en";

  const handleToggle = () => {
    i18n.changeLanguage(nextLanguage);
  };

  return (
    <button
      onClick={handleToggle}
      className="relative flex items-center justify-center w-11 h-11 text-sm font-semibold text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-700 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
      aria-label={t("layout.langToggle.label", {
        lang: nextLanguage === "en" ? "English" : "Hindi",
      })}
    >
      {/* Show "HI" for Hindi */}
      <span
        className={`absolute transition-opacity duration-200 ${
          currentLanguage === "hi" ? "opacity-100" : "opacity-0"
        }`}
      >
        HI
      </span>
      {/* Show "EN" for English */}
      <span
        className={`absolute transition-opacity duration-200 ${
          currentLanguage === "en" ? "opacity-100" : "opacity-0"
        }`}
      >
        EN
      </span>
    </button>
  );
};