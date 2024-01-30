import { VStack, Text, Button, Input } from "native-base";
import { useGlobalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useUserContext } from "@/context/user/UserContext";

export default function PhoneNumberEnteredScreen() {
  const phoneNumber = useGlobalSearchParams()["phone-number"];
  const router = useRouter();

  const { dispatch } = useUserContext();

  const [code, setCode] = useState("");
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult>(null);
  const [isValidCode, setIsValidCode] = useState(true);

  const confirmCode = () => {
    console.log(code);
    if (confirm) {
      confirm.confirm(code).catch((error) => {
        console.log(error);
        setIsValidCode(false);
      });
    }
  };

  const handleChangePhoneNumber = () => {
    router.replace("/sign-in");
  };

  const onAuthStateChanged = (user: FirebaseAuthTypes.User) => {
    if (user) {
      // Check if the user is new or not
      if (user.metadata.creationTime === user.metadata.lastSignInTime) {
        // New user
        // Create a user with the phone number
        router.replace(`/sign-in/create-account/${phoneNumber}`);
      } else {
        router.replace("/main-menu");
        dispatch({ type: "SET_USER", payload: user });
      }

    }
  };

  const sendCode = async () => {
    auth().verifyPhoneNumber(phoneNumber as string)
    const confirmation = await auth().signInWithPhoneNumber(
      phoneNumber as string
    );
    setConfirm(confirmation);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    sendCode();
  }, []);

  return (
    <VStack
      width={"full"}
      height={"full"}
      space={"3"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {/* Label */}
      <VStack alignItems={"center"}>
        <Text fontSize={"2xl"} shadow={"9"} color={"main.crisp"}>
          Enter the code sent to
        </Text>
        <Text fontSize={"2xl"} shadow={"9"} color={"main.crisp"}>
          {phoneNumber}
        </Text>
      </VStack>

      {/* Input and change phone number button*/}
      <VStack
        width={"80%"}
        space={2}
        justifyItems={"center"}
        alignItems={"center"}
      >
        <Input
          keyboardType="phone-pad"
          width={"50%"}
          placeholder={"Code"}
          backgroundColor={"main.dirty"}
          color={"main.crisp"}
          shadow={"9"}
          value={code}
          onChangeText={setCode}
        />

        {/* Text-like button */}
        <Text
          width={"full"}
          textAlign={"center"}
          color={"main.crisp"}
          onPress={handleChangePhoneNumber}
        >
          Change phone number
        </Text>
      </VStack>

      {/* Error message */}
      {!isValidCode && (
        <Text color={"red.900"}>Invalid code. Please try again.</Text>
      )}

      {/* Button */}
      <Button width={"1/2"} onPress={confirmCode}>
        Sign-in
      </Button>
    </VStack>
  );
}
