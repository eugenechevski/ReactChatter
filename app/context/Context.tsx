import { UserProvider } from "@/context/user/UserContext";
import { ContactsProvider } from "./contacts/ContactsContext";
import { ChatsProvider } from "./chats/ChatsContext";

export const ContextProvider = ({ children }) => {
  return (
    <ChatsProvider>
      <ContactsProvider>
        <UserProvider>{children}</UserProvider>
      </ContactsProvider>
    </ChatsProvider>
  );
};
