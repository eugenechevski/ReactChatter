import { createContext, useContext, useReducer } from "react";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

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
      const firebaseUser = action.payload as FirebaseAuthTypes.User;
      // Perform a database query to find the user
      const user = {} as User;

      return {
        ...state,
        user: action.payload,
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
