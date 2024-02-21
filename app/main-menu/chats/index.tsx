import {
  VStack,
  HStack,
  Text,
  ScrollView,
  useColorMode,
  useColorModeValue,
} from "native-base";

import IconBox from "@/components/IconBox";
import ChatWidget from "@/components/ChatWidget";
import SearchBar from "@/components/SearchBar";
import MainIcon from "@/components/MainIcon";

import { useUserContext } from "@/context/user/UserContext";

import { useState } from "react";


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

  const { toggleColorMode } = useColorMode();
  const colorIcon = useColorModeValue("moon", "sunny");

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
        {/* Color mode button */}
        <IconBox width={"12"} height={"12"}>
          <MainIcon
            iconName={colorIcon}
            provider="ion"
            onPress={toggleColorMode}
          />
        </IconBox>

        {/* User photo */}
        <IconBox>
          <MainIcon iconName="person" provider="ion" size={52} />
        </IconBox>

        {/* Add group button */}
        <IconBox width={"12"} height={"12"}>
          <MainIcon iconName="people" provider="ion" />
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
