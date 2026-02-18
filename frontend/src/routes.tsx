import { Routes, Route } from "react-router-dom";
import App from "./App";
import Detalhes from "./detalhes";
import DetalhesLandingPage from "./detalhesLandingPage"
import DetalhesApp from "./detalhesApp"
import DetalhesAlltiControl from "./detalhesAlltiControl"
import DetalhesFreelancerr from "./detalhesFreelancerr"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/detalhes/:id" element={<Detalhes />} />
      <Route path="/detalhesApp" element={<DetalhesApp/>} />
      <Route path="/detalhesLandingPage/:id" element={<DetalhesLandingPage/>}/>
      <Route path="/detalhesAlltiControl" element={<DetalhesAlltiControl/>}/>
      <Route path="/detalhesFreelancerr/:id" element={<DetalhesFreelancerr/>}/>
    </Routes>
  );
}
