import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { createContext, useContext, useReducer, Dispatch } from "react";

interface State {
  userCredential: FirebaseAuthTypes.User;
  userData: User;
}

type Action = 
  | { type: 'SET_USER_CREDENTIAL'; payload: FirebaseAuthTypes.User }
  | { type: 'SET_USER_DATA'; payload: User };

interface UserContextProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const UserContext = createContext<UserContextProps | null>(null);

const initialState: State = {
  userCredential: {} as FirebaseAuthTypes.User,
  userData: {} as User
};

const userReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_USER_CREDENTIAL":
      return {
        ...state,
        userCredential: action.payload,
      };

    case "SET_USER_DATA":
      return {
        ...state,
        userData: action.payload,
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

export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};