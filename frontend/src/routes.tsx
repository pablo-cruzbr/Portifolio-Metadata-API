import { Routes, Route } from "react-router-dom";
import App from "./App";
import Detalhes from "./detalhes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/detalhes/:id" element={<Detalhes />} />
    </Routes>
  );
}
