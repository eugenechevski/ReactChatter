import { VStack, HStack, Box } from "native-base";
import { Slot } from "expo-router";
import { Ionicons, AntDesign, Foundation } from "@expo/vector-icons";
import { Link } from "expo-router";
import IconBox from "@/components/IconBox";

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
        borderTopColor={"black"}
        borderTopWidth={"2"}
      >
        <IconBox>
          <Link href="/main-menu/contacts">
            <AntDesign name="contacts" size={48} />
          </Link>
        </IconBox>
        <IconBox>
          <Link href="/main-menu/chats">
            <Ionicons name="chatbubble-ellipses-sharp" size={36} />
          </Link>
        </IconBox>
        <IconBox>
          <Link href="/settings">
            <Foundation name="wrench" size={36} />
          </Link>
        </IconBox>
      </HStack>
    </VStack>
  );
}
