import "./styles/index.scss";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Info from "./pages/Info";
import { SettingsContextProvider } from "./components/Settings/SettingsContextProvider";

function App() {
  return (
    <SettingsContextProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Home />} exact></Route>
          <Route path="/info" element={<Info />} exact></Route>

          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </SettingsContextProvider>
  );
}

export default App;
