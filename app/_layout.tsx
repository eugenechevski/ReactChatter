// NativeBase
import { NativeBaseProvider, Box } from "native-base";

// Expo
import { Slot } from "expo-router";

// Styles
import theme from "@/styles/globalStyles";

// Context
import { ContextProvider } from "@/context/Context";

export default function RootLayout() {
  return (
    <ContextProvider>
      <NativeBaseProvider theme={theme}>
        <Box
          backgroundColor={"main.sky"}
          flex={1}
          minHeight={"full"}
          minWidth={"full"}
          borderWidth={2}
          alignItems="center"
          justifyContent="center"
        >
          {/** Child root */}
          <Slot />
        </Box>
      </NativeBaseProvider>
    </ContextProvider>
  );
}
