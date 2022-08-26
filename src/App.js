import "./styles/index.scss";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./pages/Test";
import CollapsibleTable from "./components/CollapsibleTable";
import Info from "./pages/Info";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} exact></Route>
        <Route path="/info" element={<Info />} exact></Route>

        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
