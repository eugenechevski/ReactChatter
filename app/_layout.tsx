import React from "react";
import { NativeBaseProvider, Box } from "native-base";
import { Slot } from "expo-router";
import theme from "@/styles/globalStyles.ts";

export default function RootLayout() {
  return (
    <NativeBaseProvider theme={theme}>
      <Box
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
  );
}
