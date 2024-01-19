import { Text, Button, VStack, HStack, Input, Box, Select } from "native-base";
import { customList, type CountryProperty } from "country-codes-list";
import { useState } from "react";

export default function SignInScreen() {
  const countryNames = customList(
    "countryNameEn" as CountryProperty,
    "+{countryCallingCode}"
  );
  const [selectedCountry, setSelectedCountry] = useState(countryNames[0]);

  return (
    <VStack
      width={"full"}
      height={"full"}
      space={"4"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Text fontSize={"xl"} shadow={"9"} color={"main.crisp"}>
        Enter your phone number
      </Text>
      <HStack>
        <Select
          selectedValue={selectedCountry}
          _selectedItem={{
            bg: "main.dirty",
          }}
          onValueChange={(country) => setSelectedCountry(country)}
        >
          {Object.keys(countryNames).map((country) => (
            <Select.Item
              key={country}
              label={country + " " + countryNames[country]}
              value={country}
            />
          ))}
        </Select>
        <Input rounded={"2xl"} backgroundColor={"white"} width={"70%"}></Input>
      </HStack>
      <Button fontSize={"lg"} width={"1/2"} rounded={"full"} _hover={{shadow: "8"}}>
        Sign In
      </Button>
    </VStack>
  );
}
