import { classNames } from "shared/lib/classNames/classNames";
import cls from "./LandSwitcher.module.scss";
import { useTranslation } from "react-i18next";
import { Button, ThemeButton } from "shared/ui/Button/Button";

interface LandSwitcherProps {
  className?: string;
}

export const LandSwitcher = ({ className }: LandSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const toggle = () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };

  return (
    <Button 
    className={classNames(cls.LandSwitcher, {}, [className])}
    theme={ThemeButton.CLEAR}
    onClick={toggle}
    >
    {t("Язык")}
    </Button>
  );
};
