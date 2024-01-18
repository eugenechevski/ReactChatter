import { UserProvider } from "@/context/user/UserContext";

export const ContextProvider = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};
