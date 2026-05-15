import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LandingPage } from "./pages/LandingPage";
import { AuthPage } from "./pages/AuthPage";
import { RoleSelection } from "./pages/RoleSelection";
import { InterestSelection } from "./pages/InterestSelection";
import { OrganizerDashboard } from "./pages/OrganizerDashboard";
import { EventExplorer } from "./pages/EventExplorer";
import { EventDetail } from "./pages/EventDetail";
import { ParticipantDashboard } from "./pages/ParticipantDashboard";
import { CertificatesVault } from "./pages/CertificatesVault";
import { RegistrationProvider } from "./context/RegistrationContext";
import { AuthProvider } from "./context/AuthContext";
import { ManageEvents } from "./pages/ManageEvents";
import { QRScanner } from "./pages/QRScanner";
import { AttendanceDashboard } from "./pages/AttendanceDashboard";
import { OrganizerAnalytics } from "./pages/OrganizerAnalytics";
import { OrganizerCalendar } from "./pages/OrganizerCalendar";
import { CreateEvent } from "./pages/createEvent";
import { AboutPage } from "./pages/AboutPage";
import { Navbar } from "./components/layout/Navbar";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/onboarding/role" element={<RoleSelection />} />
        <Route path="/onboarding/interests" element={<InterestSelection />} />
        <Route path="/dashboard/organizer" element={<OrganizerDashboard />} />
        <Route path="/dashboard/participant" element={<ParticipantDashboard />} />
        <Route path="/explorer" element={<EventExplorer />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/certificates" element={<CertificatesVault />} />
        <Route path="/organizer/manage" element={<ManageEvents />} />
        <Route path="/organizer/scanner" element={<QRScanner />} />
        <Route path="/organizer/attendance" element={<AttendanceDashboard />} />
        <Route path="/organizer/analytics" element={<OrganizerAnalytics />} />
        <Route path="/organizer/calendar" element={<OrganizerCalendar />} />
        <Route path="/organizer/create" element={<CreateEvent />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <RegistrationProvider>
        <Router>
          <div className="min-h-screen text-text-light">
            <Navbar />
            <AnimatedRoutes />
          </div>
        </Router>
      </RegistrationProvider>
    </AuthProvider>
  );
}

export default App;
