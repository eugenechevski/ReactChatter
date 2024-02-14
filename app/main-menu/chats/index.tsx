import { VStack, HStack, Text, ScrollView } from "native-base";

import { Ionicons } from "@expo/vector-icons";

import IconBox from "@/components/IconBox";
import ChatWidget from "@/components/ChatWidget";
import SearchBar from "@/components/SearchBar";
import { useUserContext } from "@/context/user/UserContext";

import { useState } from "react";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import nanoid from "@/utils/nanoid";

const dummyChats = [] as { metadata: ChatMeta; chat: Chat }[];

for (let i = 0; i < 8; i++) {
  dummyChats.push({
    metadata: {
      isMuted: false,
      isPinned: false,
      unreadCount: 1,
    },
    chat: {
      id: "1",
      name: "John Doe",
      photoURL: "",
      description: "",
      isGroup: false,
      members: ["1", "2"],
      creator: "1",
      messages: [
        "Hey, how are you?",
        "I'm good, you? I was wondering if you could help me with something.",
      ],
      lastMessage:
        "I'm good, you? I was wondering if you could help me with something.",
    },
  });
}

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
      paddingTop={"16"}
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
      </HStack>

      {/* Search bar */}
      <SearchBar value={search} setValue={setSearch} />

      {/* Chats */}
      <ScrollView borderTopWidth={"2"} borderTopColor={"main.crisp"}>
        <VStack>
          {dummyChats.map(({ metadata, chat }) => (
            <ChatWidget key={nanoid()} chat={chat} meta={metadata} />
          ))}
        </VStack>
      </ScrollView>
    </VStack>
  );
}
