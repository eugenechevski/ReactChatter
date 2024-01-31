import { useGlobalSearchParams } from "expo-router";
import { VStack, Text, FormControl, Input, Button } from "native-base";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useEffect, useState } from "react";

export default function CreateAccountScreen() {
  const phoneNumber = useGlobalSearchParams()["phone-number"];

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCreateAccount = () => {};

  const onAuthStateChanged = (user: FirebaseAuthTypes.User) => {
    if (user) {
      console.log("User is signed in");
    } else {
      console.log("User is signed out");
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <VStack
      justifyContent={"center"}
      alignItems={"center"}
      padding={"8"}
      width={"full"}
      space={"4"}
    >
      <Text fontSize={"2xl"} shadow={"9"} color={"main.crisp"}>
        Create account for {phoneNumber}
      </Text>
      <FormControl>
        <FormControl.Label _text={{ color: "main.crisp" }}>
          Display name
        </FormControl.Label>
        <Input
          placeholder="John Doe"
          onChangeText={(text) => setDisplayName(text)}
          value={displayName}
        />
      </FormControl>
      <FormControl>
        <FormControl.Label _text={{ color: "main.crisp" }}>
          Email
        </FormControl.Label>
        <Input
          placeholder="johndoe@mail.com"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </FormControl>
      <FormControl>
        <FormControl.Label _text={{ color: "main.crisp" }}>
          Password
        </FormControl.Label>
        <Input onChangeText={(text) => setPassword(text)} value={password} />
      </FormControl>
      <FormControl>
        <FormControl.Label _text={{ color: "main.crisp" }}>
          Confirm password
        </FormControl.Label>
        <Input
          onChangeText={(text) => setConfirmPassword(confirmPassword)}
          value={confirmPassword}
        />
      </FormControl>
      <Button onPress={handleCreateAccount}>Create account</Button>
    </VStack>
  );
}
