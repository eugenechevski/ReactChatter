import { VStack, Text, Button, Input } from "native-base";
import { useGlobalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";

export default function PhoneNumberEnteredScreen() {
  const phoneNumber = useGlobalSearchParams()["phone-number"];
  const router = useRouter();

  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [isValidCode, setIsValidCode] = useState(true);

  const handleCodeEntered = () => {
    confirmCode();
  };

  const handleChangePhoneNumber = () => {
    router.replace("/sign-in");
  };

  const confirmCode = async () => {
    try {
      await confirm.confirm(code);
    } catch (error) {
      setIsValidCode(false);
      console.log("Invalid code.");
    }
  };

  // Send code
  useEffect(() => {
    const confirmation = auth().signInWithPhoneNumber(phoneNumber as string);
    setConfirm(confirmation);
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
      <Button width={"1/2"} onPress={handleCodeEntered}>
        Sign-in
      </Button>
    </VStack>
  );
}
