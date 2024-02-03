import { VStack, HStack, Box } from "native-base";
import { Slot } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import colors from "@/styles/colors";

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
        <Box
          rounded={"full"}
          borderWidth={6}
          width={36}
          height={36}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <FontAwesome.Button
            name="phone"
            backgroundColor={colors.main.sky}
            size={32}
            iconStyle={{
              color: "black",
              alignSelf: "center",
              textAlign: "center",
              paddingLeft: 6,
              width: 28,
              height: 32,
            }}
          />
        </Box>
      </HStack>
    </VStack>
  );
}
