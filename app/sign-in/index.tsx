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
import { phone } from "phone";
import { useState } from "react";

export default function SignInScreen() {
  const phoneExtensions = customList(
    "countryCallingCode" as CountryProperty,
    "{countryNameEn}"
  );
  const [selectedPhoneExtension, setSelectedPhoneExtension] = useState("1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

  const handleSignIn = () => {
    const fullPhoneNumber = "+ " + selectedPhoneExtension + " " + phoneNumber;

    const verificationResult = phone(fullPhoneNumber);

    if (verificationResult.isValid) {
      // TODO: Send verification code to the phone number
      setIsPhoneNumberValid(true);
    } else {
      // TODO
      setIsPhoneNumberValid(false);
    }
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
        Sign in
      </Button>
    </VStack>
  );
}
