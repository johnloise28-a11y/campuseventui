import { createContext, useContext, useReducer, useState, useEffect } from "react";

const EventContext = createContext();

const initialState = {
  events: [],
};

function eventReducer(state, action) {
  switch (action.type) {
    case "SET_EVENTS":
      return { ...state, events: action.payload };
    case "ADD_EVENT":
      return { ...state, events: [...state.events, action.payload] };
    case "DELETE_EVENT":
      return { ...state, events: state.events.filter((e) => e.id !== action.payload) };
    case "TOGGLE_STATUS":
      return {
        ...state,
        events: state.events.map((e) =>
          e.id === action.payload
            ? { ...e, status: e.status === "active" ? "inactive" : "active" }
            : e
        ),
      };
    default:
      return state;
  }
}

export function EventProvider({ children }) {
  const [state, dispatch] = useReducer(eventReducer, initialState);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchEvents = () => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then((data) => {
        const formatted = data.slice(0, 20).map((post) => ({
          id: post.id,
          title: post.title,
          body: post.body,
          status: "active",
        }));
        dispatch({ type: "SET_EVENTS", payload: formatted });
        setLastUpdated(new Date());
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  // Initial fetch
  useEffect(() => {
    fetchEvents();
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchEvents();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const addEvent = (event) => dispatch({ type: "ADD_EVENT", payload: event });
  const deleteEvent = (id) => dispatch({ type: "DELETE_EVENT", payload: id });
  const toggleStatus = (id) => dispatch({ type: "TOGGLE_STATUS", payload: id });
  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <EventContext.Provider value={{
      state,
      loading,
      error,
      lastUpdated,
      addEvent,
      deleteEvent,
      toggleStatus,
      isLoggedIn,
      login,
      logout,
    }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventContext);
}