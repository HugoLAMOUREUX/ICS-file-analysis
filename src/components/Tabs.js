import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useTranslation } from "react-i18next";
import CollapsibleTable from "./CollapsibleTable";
import TextField from "@mui/material/TextField";
import Classification from "./Classification";
import TimeEvolution from "./TimeEvolution";
import useFilter from "../hooks/useFilter";

export default function Tabs() {
  const { eventRecapsArrayFiltered, handleChange, inputHandler, value } =
    useFilter();
  const { t } = useTranslation();

  return (
    <div className="boxMargin">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label={t("firstTab")} value="1" />
              <Tab label={t("secondTab")} value="2" />
              <Tab label={t("thirdTab")} value="3" />
              <Tab label={t("fourthTab")} value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div className="search">
              <TextField
                id="outlined-basic"
                onChange={inputHandler}
                variant="outlined"
                fullWidth
                label={t("search")}
              />
            </div>

            {eventRecapsArrayFiltered.length > 0 ? (
              <CollapsibleTable
                fileArray={eventRecapsArrayFiltered}
                key={eventRecapsArrayFiltered[0].name}
                sort={"duration"}
              />
            ) : (
              <p className="pTabs">{t("selectAFile")}</p>
            )}
          </TabPanel>
          <TabPanel value="2">
            <div className="search">
              <TextField
                id="outlined-basic"
                onChange={inputHandler}
                variant="outlined"
                fullWidth
                label={t("search")}
              />
            </div>
            {eventRecapsArrayFiltered.length > 0 ? (
              <CollapsibleTable
                fileArray={eventRecapsArrayFiltered}
                key={eventRecapsArrayFiltered[0].name}
                sort={"occurence"}
              />
            ) : (
              <p className="pTabs">{t("selectAFile")}</p>
            )}
          </TabPanel>
          <TabPanel value="3">
            <div>
              {eventRecapsArrayFiltered.length > 0 ? (
                <Classification
                  fileArray={eventRecapsArrayFiltered}
                  key={eventRecapsArrayFiltered[0].name}
                />
              ) : (
                <p className="pTabs">{t("selectAFile")}</p>
              )}
            </div>
          </TabPanel>
          <TabPanel value="4">
            <div>
              <TimeEvolution />
            </div>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
