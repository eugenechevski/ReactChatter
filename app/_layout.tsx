// NativeBase
import { NativeBaseProvider, Box } from "native-base";

// Expo
import { Slot } from "expo-router";

// Styles
import theme from "@/styles/globalStyles";

// Context
import { ContextProvider } from "@/context/Context";

/*
// React Native
import AsyncStorage from '@react-native-async-storage/async-storage';

const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem('@color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  },
  set: async (value: ColorMode) => {
    try {
      await AsyncStorage.setItem('@color-mode', value);
    } catch (e) {
      console.log(e);
    }
  },
};
*/

export default function RootLayout() {
  return (
    <ContextProvider>
      <NativeBaseProvider theme={theme} /*colorModeManager={colorModeManager}*/>
        <Box
          backgroundColor={"main.sky"}
          _dark={{ backgroundColor: "main.dark" }}
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
