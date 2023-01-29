import React from "react";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "../components/Settings/LanguageSelector";

const Info = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div>
      <div className="upBar">
        <h2>{t("infoTitle")}</h2>

        <div className="lSelector">
          <LanguageSelector />
        </div>
      </div>
      <div className="getBackCenter">
        <div className="explication">
          <p>{t("goal")}</p>
          <br />
          <p>{t("format")}</p>
          <br />
          <p>{t("format2")}</p>
          <br />
          <img src={t("image1")} alt="Example d'affichage avec ce formattage" />
          <br />
          <br />
          <p>{t("format3")}</p>
          <br />
          <p>{t("format4")}</p>
          <p>{t("format5")}</p>
          <br />
          <p>{t("settings")}</p>
          <br />
          <img
            src={t("image2")}
            alt="Example d'affichage du troisième onglet de classification"
          />
          <br />
          <br />
          <p>{t("classifyUnknown")}</p>
        </div>
        <Button variant="contained" onClick={() => navigate("/")}>
          {t("getBack")}
        </Button>
      </div>
    </div>
  );
};

export default Info;
