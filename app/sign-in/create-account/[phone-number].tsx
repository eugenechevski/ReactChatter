import { useGlobalSearchParams } from "expo-router";
import { VStack, Text, FormControl, Input, Button } from "native-base";

export default function CreateAccountScreen() {
  const phoneNumber = useGlobalSearchParams()["phone-number"];

  return (
    <VStack justifyContent={"center"} alignItems={"center"}>
      <Text>Create account for {phoneNumber}</Text>
      <FormControl>
        <FormControl.Label>Display name</FormControl.Label>
        <Input placeholder="John Doe" />
      </FormControl>
      <FormControl>
        <FormControl.Label>Email</FormControl.Label>
        <Input placeholder="johndoe@mail.com" keyboardType="email-address" />
      </FormControl>
      <FormControl>
        <FormControl.Label>Password</FormControl.Label>
        <Input />
      </FormControl>
      <FormControl>
        <FormControl.Label>Confirm password</FormControl.Label>
        <Input />
      </FormControl>
      <Button>Create account</Button>
    </VStack>
  );
}
