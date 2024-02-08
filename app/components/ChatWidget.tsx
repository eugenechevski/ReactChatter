import { HStack, VStack, Text } from "native-base";
import IconBox from "@/components/IconBox";
import { Ionicons } from "@expo/vector-icons";

export default function ChatWidget({
  styleProps,
  chat,
  meta,
}: {
  styleProps?: { [key: string]: any };
  chat: Chat;
  meta: ChatMeta;
}) {
  return (
    <HStack
      width={"full"}
      height={"10%"}
      justifyContent={"space-between"}
      alignItems={"center"}
      padding={"5"}
      borderTopColor={"black"}
      borderTopWidth={"2"}
      {...styleProps}
    >
      {/* Chat photo */}
      <IconBox width="20" height="20">
        <Ionicons name="person" size={32} color={"black"} />
      </IconBox>

      {/* Chat name & latest message */}
      <VStack
        width={"3/4"}
        height={"full"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text>{chat?.name}</Text>
        <Text>{chat?.lastMessage}</Text>
      </VStack>

      {/* Unread count */}
      <IconBox width="20" height="20">
        <Text>{meta.unreadCount}</Text>
      </IconBox>
    </HStack>
  );
}
