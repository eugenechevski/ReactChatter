import { createContext, useContext, useReducer } from "react";

const UserContext = createContext(null);

const initialState = {
  user: {} as User,
};

const userReducer = (state, action) => {
  switch (action.type) {
    // Receives a firebase user object
    // Find the user in the database
    // Sets the user object in the state
    case "SET_USER":
      return {
        ...state,
        user: action.payload as User,
      };

    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
