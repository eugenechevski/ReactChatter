// React
import { useState, useEffect } from "react";

// NativeBase
import { NativeBaseProvider, Box } from "native-base";

// Expo
import { Slot, useRouter } from "expo-router";

// Styles
import theme from "@/styles/globalStyles";

// Firebase
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

export default function RootLayout() {
  const router = useRouter();

  /**
   * At beginning, it is needed to be determined whether a user is signed in or not.
   */
  const [user, setUser] = useState<null | FirebaseAuthTypes.User>(null);
  const [loading, setLoading] = useState(true);

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);
    setLoading(false);
  };

  // Listen for authentication state to change.
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

  useEffect(() => {
    if (loading) return;

    if (user) {
      // User is signed in
      console.log("User is signed in");
    } else {
      // User is signed out
      console.log("User is signed out");
      router.push("/sign-in");
    }
  }, [user, loading]);

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
