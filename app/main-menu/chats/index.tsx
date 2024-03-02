import {
  VStack,
  HStack,
  ScrollView,
  useColorMode,
  useColorModeValue,
} from "native-base";

import IconBox from "@/components/IconBox";
import ChatWidget from "@/components/ChatWidget";
import SearchBar from "@/components/SearchBar";
import MainIcon from "@/components/MainIcon";

import { useChatsContext } from "@/context/chats/ChatsContext";

import { useState, useEffect } from "react";

import nanoid from "@/utils/nanoid";

import { MainChat } from "@/types";

export default function ChatsScreen() {
  const { state } = useChatsContext();
  const [chats, setChats] = useState<MainChat[]>([]);

  const [searchValue, setSearchValue] = useState("");

  const { toggleColorMode } = useColorMode();
  const colorIcon = useColorModeValue("moon", "sunny");

  // Load contacts
  useEffect(() => {
    setChats(Object.values(state.chats));
  }, [state.chats]);

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
      <SearchBar value={searchValue} setValue={setSearchValue} />

      {/* Chats */}
      <ScrollView borderTopWidth={"2"} borderTopColor={"main.crisp"}>
        <VStack>
          {chats
            .filter((value) => value.name.includes(searchValue))
            .map((value) => (
              <ChatWidget key={nanoid()} chat={value} />
            ))}
        </VStack>
      </ScrollView>
    </VStack>
  );
}
