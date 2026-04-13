import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/layout/Layout";
import Index from "@/pages/Index";
import Mens from "@/pages/Mens";
import Kids from "@/pages/Kids";
import Accessories from "@/pages/Accessories";
import NotFound from "@/pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/mens" element={<Mens />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/accessories" element={<Accessories />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
