import { VStack, HStack, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import IconBox from "@/components/IconBox";
import ChatWidget from "@/components/ChatWidget";
import SearchBar from "@/components/SearchBar";

import { useState } from "react";
import { useUserContext } from "@/context/user/UserContext";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

const dummyChats = [
  {
    metadata: {
      isMuted: false,
      isPinned: false,
      unreadCount: 0,
    },
    chat: {
      id: "1",
      name: "John Doe",
      photoURL: "",
      description: "",
      isGroup: false,
      members: ["1", "2"],
      creator: "1",
      messages: ["Hey, how are you?", "I'm good, you?"],
      lastMessage: "I'm good, you?"
    }
  }
] as {metadata: ChatMeta, chat: Chat}[];

export default function ChatsScreen() {
  const { state } = useUserContext();
  const [search, setSearch] = useState("");

  return (
    <VStack
      height={"full"}
      width={"full"}
      alignItems="center"
      justifyContent="start"
      space={8}
      paddingY={"16"}
    >
      <HStack
        width={"full"}
        height={"10%"}
        justifyItems={"center"}
        alignItems={"center"}
        justifyContent={"space-between"}
        padding={"4"}
      >
        {/* Dark mode button */}
        <IconBox width={"12"} height={"12"}>
          <Ionicons name="moon" size={36} color={"black"} />
        </IconBox>

        {/* User photo */}
        <IconBox>
          <Ionicons name="person" size={52} color={"black"} />
        </IconBox>

        {/* Add group button */}
        <IconBox width={"12"} height={"12"}>
          <Ionicons name="people" size={36} color={"black"} />
        </IconBox>

        <Text>
          {state.userData.displayName}
        </Text>
      </HStack>

      {/* Search bar */}
      <SearchBar value={search} setValue={setSearch} />

      {/* Chats */}
      <VStack maxHeight={"90%"} overflowY={"scroll"}>
        {dummyChats.map(({metadata, chat}) => (
          <ChatWidget key={chat.id} chat={chat} meta={metadata}/>
        ))}
      </VStack>
    </VStack>
  );
}
