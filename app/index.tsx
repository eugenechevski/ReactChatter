import { VStack, Text, Image, PresenceTransition, Button } from "native-base";
import logo from "@/assets/images/logo-256.png";
import { useRouter } from "expo-router";

export default function RootScreen() {
  const router = useRouter();

  return (
    <VStack
      backgroundColor={"main.sky"}
      height="100%"
      width="100%"
      alignItems="center"
      justifyContent="center"
      space={"1"}
    >
      <Image source={logo} alt="logo" size={"2xl"} alignSelf={"center"} />
      <Text
        fontSize={"2xl"}
        fontWeight={"bold"}
        color={"main.crisp"}
        shadow={"9"}
      >
        Welcome to React Chatter.
      </Text>
      <Button
        width={"1/3"}
        backgroundColor={"main.water"}
        rounded={"full"}
        shadow={"9"}
        variant="solid"
        colorScheme="main"
        onPress={() => router.push("/sign-in")}
      >
        Let's Go
      </Button>
    </VStack>
  );
}
