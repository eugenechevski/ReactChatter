import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
} from "native-base";
import { customList, type CountryProperty } from "country-codes-list";
import { phone as verifyPhone } from "phone";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function SignInScreen() {
  const phoneExtensions = customList(
    "countryCallingCode" as CountryProperty,
    "{countryNameEn}"
  );
  const [selectedPhoneExtension, setSelectedPhoneExtension] = useState("1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const router = useRouter();

  const handleSignIn = () => {
    const fullPhoneNumber = "+ " + selectedPhoneExtension + " " + phoneNumber;

    const verificationResult = verifyPhone(fullPhoneNumber);

    if (verificationResult.isValid) {
      setIsPhoneNumberValid(true);
      router.replace(`/sign-in/phone-number-entered/${fullPhoneNumber}`);
    } else {
      setIsPhoneNumberValid(false);
    }
  };

  return (
    <VStack
      width={"full"}
      padding={"3"}
      space={"4"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {/* Label */}
      <Text fontSize={"xl"} shadow={"9"} color={"main.crisp"}>
        Enter your phone number
      </Text>

      {/* Input */}
      <HStack
        width={"80%"}
        space={2}
        justifyItems={"center"}
        alignItems={"center"}
      >
        <Select
          borderColor={"main.dirty"}
          width={"80%"}
          selectedValue={selectedPhoneExtension}
          _selectedItem={{
            bg: "main.dirty",
            _text: { color: "main.crisp" },
          }}
          onValueChange={(country) => setSelectedPhoneExtension(country)}
        >
          {Object.keys(phoneExtensions).map((ext) => (
            <Select.Item
              key={ext}
              label={"+ " + ext + " " + phoneExtensions[ext]}
              value={ext}
            />
          ))}
        </Select>
        <InputGroup width={"70%"} height={"10"}>
          <InputLeftAddon children={"+ " + selectedPhoneExtension} />
          <Input
            keyboardType="phone-pad"
            _focus={{ borderColor: "main.sky", borderWidth: 2 }}
            width={"80%"}
            rounded={"2xl"}
            backgroundColor={"white"}
            borderRadius={"full"}
            fontSize={"md"}
            onChangeText={(text) => setPhoneNumber(text)}
            value={phoneNumber}
          ></Input>
        </InputGroup>
      </HStack>

      {/* Error message label */}
      {!isPhoneNumberValid ? (
        <Text fontSize={"md"} color={"red.500"}>
          The phone number is invalid, try again.
        </Text>
      ) : (
        <></>
      )}

      {/* Button */}
      <Button width={"1/2"} onPress={handleSignIn}>
        Send
      </Button>
    </VStack>
  );
}
