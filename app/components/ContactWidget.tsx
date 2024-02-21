import { HStack, VStack, Text } from "native-base";
import IconBox from "@/components/IconBox";
import MainIcon from "./MainIcon";

export default function ContactWidget({
  styleProps,
  contact,
}: {
  styleProps?: { [key: string]: any };
  contact: Contact;
}) {
  return (
    <HStack
      width={"full"}
      height={"20"}
      justifyContent={"start"}
      alignItems={"center"}
      padding={"5"}
      borderBottomColor={"main.crisp"}
      borderBottomWidth={"2"}
      {...styleProps}
    >
      {/* Chat photo // TODO: replace with photo */}
      <IconBox width="10" height="10">
        <MainIcon iconName="person" provider="ion" size={32} />
      </IconBox>

      {/* Chat name & latest message */}
      <VStack
        width={"full"}
        height={"full"}
        justifyContent={"center"}
        alignItems={"start"}
        marginLeft={"12"}
      >
        <Text fontSize="lg" fontWeight={"bold"} color={"main.crisp"}>
          {contact?.name}
        </Text>
        <Text fontSize="sm" color={"main.crisp"}>
          {contact?.hasApp ? "On" : "Not on" + " React Chatter"}
        </Text>
      </VStack>
    </HStack>
  );
}
