import { Routes, Route } from "react-router-dom";
import { Login } from "./views/Login";
import { HomeAdmin } from "./views/HomeAdmin";
import { ReportCrime } from "./views/ReportCrime"; 
import { CriminalInvestigation } from "./views/CriminalInvestigation";
import { ProfileView } from "./views/ProfileView";
import { LearnMore } from "./views/learnmore";
import { LoaderProvider } from "./context/LoaderContext";
import { Loader } from "./components/Loader";

function App() {
  return (
    <LoaderProvider>
      <Loader />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home-admin" element={<HomeAdmin />} />
        <Route path="/report" element={<ReportCrime />} />
        <Route path="/investigation" element={<CriminalInvestigation />} />
        <Route path="/learn-more" element={<LearnMore />} />  
        <Route path="/profile" element={<ProfileView />} />
      </Routes>
    </LoaderProvider>
  );
}

export default App;
