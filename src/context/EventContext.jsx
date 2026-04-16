import { createContext, useReducer } from "react";

export const EventContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter(e => e.id !== action.payload);
    case "TOGGLE":
      return state.map(e =>
        e.id === action.payload ? { ...e, active: !e.active } : e
      );
    default:
      return state;
  }
};

export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <EventContext.Provider value={{ state, dispatch }}>
      {children}
    </EventContext.Provider>
  );
};