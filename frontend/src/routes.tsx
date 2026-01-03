import { Routes, Route } from "react-router-dom";
import App from "./App";
import Detalhes from "./detalhes";
import DetalhesLandingPage from "./detalhesLandingPage"


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/detalhes/:id" element={<Detalhes />} />
      <Route path="/detalhesLandingPage/:id" element={<DetalhesLandingPage/>}/>
    </Routes>
  );
}
