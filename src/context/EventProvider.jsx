import { createContext, useContext, useReducer, useState } from "react";

const EventContext = createContext();

const initialState = {
  events: [
    { id: 1, title: "Orientation Day", status: "active" },
    { id: 2, title: "Tech Summit", status: "inactive" },
    { id: 3, title: "Sports Fest", status: "active" },
  ],
};

function eventReducer(state, action) {
  switch (action.type) {
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

  const addEvent = (event) => dispatch({ type: "ADD_EVENT", payload: event });
  const deleteEvent = (id) => dispatch({ type: "DELETE_EVENT", payload: id });
  const toggleStatus = (id) => dispatch({ type: "TOGGLE_STATUS", payload: id });
  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <EventContext.Provider value={{
      state,
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