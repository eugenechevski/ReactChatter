// React
import { useState, useEffect } from "react";

// NativeBase
import { VStack, Text, Image, Button } from "native-base";

// Expo
import { useRouter } from "expo-router";

// Styles and assets
import logo from "@/assets/images/logo-256.png";

// Firebase
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

// Context
import { useUserContext } from "@/context/user/UserContext";

export default function RootScreen() {
  const router = useRouter();
  const { dispatch } = useUserContext();

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
      dispatch({ type: "SET_USER", payload: user });
    } else {
      // User is signed out
      console.log("User is signed out");
      router.push("/sign-in");
    }
  }, [user, loading]);

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
