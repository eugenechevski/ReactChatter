import { Box } from "native-base";
import { Slot } from "expo-router";

export default function SignInLayout() {
  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      height={"full"}
      width={"full"}
    >
      <Box
        width={"90%"}
        shadow={"9"}
        rounded={"2xl"}
        backgroundColor={"main.dirty"}
        alignItems={"center"}>
        {/* Children */}
        <Slot />
      </Box>
    </Box>
  );
}
