import { createContext, useContext, useReducer, Dispatch } from "react";
import { MainChat, MainMessage } from "@/types";

interface State {
  chats: { [chatId: string]: MainChat };
  messages: { [messageId: string]: MainMessage };
}

type Action =
  | { type: "SET_CHATS"; payload: { [chatId: string]: MainChat } }
  | { type: "ADD_CHAT"; payload: MainChat }
  | { type: "REMOVE_CHAT"; payload: string }
  | { type: "UPDATE_CHAT"; payload: MainChat }
  | { type: "ADD_MESSAGE"; payload: MainMessage }
  | { type: "REMOVE_MESSAGE"; payload: string }
  | { type: "UPDATE_MESSAGE"; payload: MainMessage }
  | { type: "SET_MESSAGES"; payload: { [messageId: string]: MainMessage } };

interface ChatsContextProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const ChatsContext = createContext<ChatsContextProps | null>(null);

const initialState: State = {
  chats: {},
  messages: {},
};

const chatsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_CHATS":
      return { ...state, chats: action.payload };
    case "ADD_CHAT":
      return {
        ...state,
        chats: { ...state.chats, [action.payload.id]: action.payload },
      };
    case "REMOVE_CHAT":
      const newChats = { ...state.chats };
      delete newChats[action.payload];
      return { ...state, chats: newChats };
    case "UPDATE_CHAT":
      return {
        ...state,
        chats: { ...state.chats, [action.payload.id]: action.payload },
      };
    case "SET_MESSAGES":
      return { ...state, messages: action.payload };
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: { ...state.messages, [action.payload.id]: action.payload },
      };
    case "REMOVE_MESSAGE":
      const newMessages = { ...state.messages };
      delete newMessages[action.payload];
      return { ...state, messages: newMessages };
    case "UPDATE_MESSAGE":
      return {
        ...state,
        messages: { ...state.messages, [action.payload.id]: action.payload },
      };
    default:
      return state;
  }
};

export const ChatsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatsReducer, initialState);

  return (
    <ChatsContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatsContext.Provider>
  );
};

export const useChatsContext = (): ChatsContextProps => {
  const context = useContext(ChatsContext);
  if (!context) {
    throw new Error("useChats must be used within a ChatsProvider");
  }
  return context;
};
