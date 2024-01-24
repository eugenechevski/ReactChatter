import { VStack, Text, Button, Input } from "native-base";
import { useGlobalSearchParams } from "expo-router";
import { useState, useEffect } from "react";

export default function PhoneNumberEnteredScreen() {
  const phoneNumber = useGlobalSearchParams()["phone-number"];
  

  const handleSendCode = () => {

  };

  return (
    <VStack
      width={"full"}
      height={"full"}
      space={"3"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {/* Label */}
      <Text fontSize={"xl"} shadow={"9"} color={"main.crisp"}>
        Enter the code sent to {phoneNumber}
      </Text>

      {/* Input and change phone number button*/}
      <VStack
        width={"80%"}
        space={2}
        justifyItems={"center"}
        alignItems={"center"}
      >
        <Input
          width={"full"}
          placeholder={"Code"}
          backgroundColor={"main.dirty"}
          color={"main.crisp"}
          shadow={"9"}
        />

        {/* Text-like button */}
        <Text width={"full"}>
          Change phone number
        </Text>
      </VStack>

      {/* Button */}
      <Button width={"1/2"} onPress={handleSendCode}>
        Sign-in
      </Button>
    </VStack>
  );
}
