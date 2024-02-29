import { VStack, HStack, Text, Box, ScrollView } from "native-base";
import SearchBar from "@/components/SearchBar";
import IconBox from "@/components/IconBox";
import MainIcon from "@/components/MainIcon";
import ContactWidget from "@/components/ContactWidget";
import { useState } from "react";
import nanoid from "@/utils/nanoid";
import { useContactsContext } from "@/context/contacts/ContactsContext";

export default function ContactsScreen() {
  const [searchValue, setSearchValue] = useState("");
  const { state } = useContactsContext();

  const handleSort = () => {};

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
        justifyContent="start"
        alignItems={"center"}
        padding={"4"}
        height={"10%"}
      >
        <IconBox width={12} height={12}>
          <MainIcon provider="material" iconName="sort" size={26} />
        </IconBox>

        <Text
          color={"main.crisp"}
          fontSize={"2xl"}
          fontWeight={"bold"}
          ml={"1/4"}
        >
          Contacts
        </Text>
      </HStack>

      {/* Search bar */}
      <SearchBar value={searchValue} setValue={setSearchValue} />

      {/* Contacts */}
      <ScrollView borderTopWidth={"2"} borderTopColor={"main.crisp"}>
        <VStack>
          {/* Filtered contacts */}
          {state.contacts
            .filter((value) => value.name.includes(searchValue))
            .map((contact) => (
              <ContactWidget key={nanoid()} contact={contact} />
            ))}
        </VStack>
      </ScrollView>
    </VStack>
  );
}
