import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const lngs = {
    fr: { nativeName: "Français" },
    en: { nativeName: "English" },
  };
  const { i18n } = useTranslation();

  return (
    <div className="languageSelector">
      {Object.keys(lngs).map((lng) => (
        <div key={lng}>
          <button
            type="submit"
            className="buttonSelector"
            onClick={() => i18n.changeLanguage(lng)}
            disabled={i18n.resolvedLanguage === lng}
          >
            <img src={"./" + lng + ".png"} alt={lng} height="30px" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default LanguageSelector;
