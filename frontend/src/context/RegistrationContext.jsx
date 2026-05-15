import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const fetchRegistrations = async () => {
        try {
          const response = await api.get('/registration/my-events');
          // Map to event objects if backend returns populated events
          setRegisteredEvents(response.data.data.map(reg => reg.event) || []);
        } catch (error) {
          console.error("Failed to fetch registrations", error);
        }
      };
      fetchRegistrations();
    } else {
      setRegisteredEvents([]);
    }
  }, [user]);

  const checkConflict = (newEvent) => {
    return registeredEvents.find(event => {
      if (!event) return false;
      // Check if same day
      if (event.date !== newEvent.date) return false;

      // Simple time overlap check (In a real app, use timestamp comparison)
      // For demo, we'll assume a 2-hour window for all events if not specified
      const eventStart = parseTime(event.time);
      const eventEnd = eventStart + 120; // 2 hours in minutes

      const newStart = parseTime(newEvent.time);
      const newEnd = newStart + 120;

      return (newStart < eventEnd && newEnd > eventStart);
    });
  };

  const registerEvent = async (event) => {
    try {
      await api.post(`/registration/register/${event._id}`);
      setRegisteredEvents([...registeredEvents, event]);
    } catch (error) {
      console.error("Registration failed", error);
      throw error.response?.data || { message: "Failed to register" };
    }
  };

  const unregisterEvent = (id) => {
    // Requires delete endpoint in backend. Fallback to local removal for now.
    setRegisteredEvents(registeredEvents.filter(e => e && (e._id !== id && e.id !== id)));
  };

  return (
    <RegistrationContext.Provider value={{ registeredEvents, checkConflict, registerEvent, unregisterEvent }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => useContext(RegistrationContext);

// Helper to convert "10:00 AM" to minutes since midnight
const parseTime = (timeStr) => {
  if (!timeStr) return 0;
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
};
