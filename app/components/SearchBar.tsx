import { HStack, Input } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import IconBox from "@/components/IconBox";

export default function SearchBar({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <HStack
      width={"full"}
      height={"5%"}
      justifyContent={"center"}
      space={"4"}
      alignItems={"center"}
    >
      <Input
        width={"3/4"}
        height={"12"}
        placeholder={"Search for a message..."}
        value={value}
        onChangeText={setValue}
        backgroundColor={"main.water"}
        borderColor={"main.sky"}
        shadow={"9"}
        color={"main.sky"}
        placeholderTextColor={"main.water"}
      />
      <IconBox width={"12"} height={"12"}>
        <Ionicons name="search" size={36} color={"black"} />
      </IconBox>
    </HStack>
  );
}
