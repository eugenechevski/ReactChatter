import { VStack, Text, Image, PresenceTransition } from "native-base";
import logo from "@/assets/images/logo-256.png";

export default function RootScreen() {
  return (
    <VStack
      backgroundColor={"main.sky"}
      height="100%"
      width="100%"
      alignItems="center"
      justifyContent="center"
      space={3}
    >
      <PresenceTransition
        initial={{ opacity: 0 }}
        visible={true}
        animate={{
          opacity: 1,
          transition: {
            duration: 1000,
          },
        }}
      >
        <Image
          source={logo}
          alt="logo"
          size={"2xl"}
          alignSelf={"center"}
        />
        <Text
          fontSize={"2xl"}
          fontWeight={"bold"}
          color={"main.crisp"}
          shadow={3}
        >
          Welcome to React Chatter.
        </Text>
      </PresenceTransition>
    </VStack>
  );
}
