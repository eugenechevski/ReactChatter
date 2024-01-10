import { Box, Text } from "native-base";
import { Slot } from "expo-router";

export default function SignInLayout({ children }) {
  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      height={"full"}
      width={"full"}
    >
      <Text fontSize="xl">Sign In</Text>

      {/* Children */}
      <Slot />
    </Box>
  );
}
