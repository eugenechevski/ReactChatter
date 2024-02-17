import { HStack, VStack, Text } from "native-base";
import IconBox from "@/components/IconBox";
import MainIcon from "./MainIcon";

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
      height={"20"}
      justifyContent={"space-between"}
      alignItems={"center"}
      padding={"5"}
      borderBottomColor={"main.crisp"}
      borderBottomWidth={"2"}
      {...styleProps}
    >
      {/* Chat photo */}
      <IconBox width="10" height="10">
        <MainIcon iconName="person" provider="ion" size={32} />
      </IconBox>

      {/* Chat name & latest message */}
      <VStack
        width={"3/4"}
        height={"full"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text fontSize="lg" fontWeight={"bold"} color={"main.crisp"}>
          {chat?.name}
        </Text>
        <Text color={"main.crisp"}>
          {chat?.lastMessage.length > 16
            ? chat.lastMessage.slice(0, 16) + "..."
            : chat.lastMessage}
        </Text>
      </VStack>

      {/* Unread count */}
      <IconBox width="10" height="10">
        <Text>{meta.unreadCount}</Text>
      </IconBox>
    </HStack>
  );
}
