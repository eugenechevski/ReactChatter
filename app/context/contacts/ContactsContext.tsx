import { createContext, useContext, useReducer, Dispatch } from "react";

interface State {
  contacts: Contact[];
}

type Action = { type: "SET_CONTACTS"; payload: Contact[] };

interface ContactsContextProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const ContactsContext = createContext<ContactsContextProps | null>(null);

const initialState: State = {
  contacts: [],
};

const contactsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_CONTACTS":
      return { ...state, contacts: action.payload };
    default:
      return state;
  }
};

export const ContactsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contactsReducer, initialState);

  return (
    <ContactsContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactsContext.Provider>
  );
};

export const useContactsContext = (): ContactsContextProps => {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error("useContacts must be used within a ContactsProvider");
  }
  return context;
};
