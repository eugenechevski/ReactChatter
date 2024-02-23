import { UserProvider } from "@/context/user/UserContext";
import { ContactsProvider } from "./contacts/ContactsContext";

export const ContextProvider = ({ children }) => {
  return (
    <ContactsProvider>
      <UserProvider>{children}</UserProvider>
    </ContactsProvider>
  );
};
