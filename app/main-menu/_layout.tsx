import { VStack, HStack, Box } from "native-base";
import { Slot } from "expo-router";
import { Link } from "expo-router";
import IconBox from "@/components/IconBox";
import MainIcon from "@/components/MainIcon";

export default function MainMenuLayout() {
  return (
    <VStack
      flex={1}
      height={"full"}
      width={"full"}
      alignItems="center"
      justifyContent="center"
    >
      {/** Child root */}
      <Box height={"90%"} width={"full"}>
        <Slot />
      </Box>
      <HStack
        width={"full"}
        height={"10%"}
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingX={"5"}
        borderTopColor={"main.crisp"}
        borderTopWidth={"2"}
      >
        <IconBox>
          <Link href="/main-menu/contacts">
            <MainIcon iconName={"contacts"} provider="ant" size={48} />
          </Link>
        </IconBox>
        <IconBox>
          <Link href="/main-menu/chats">
            <MainIcon iconName={"chatbubble-ellipses"} provider="ion" />
          </Link>
        </IconBox>
        <IconBox>
          <Link href="/settings">
            <MainIcon iconName={"wrench"} provider="foundation" />
          </Link>
        </IconBox>
      </HStack>
    </VStack>
  );
}
