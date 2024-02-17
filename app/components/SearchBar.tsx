import { HStack, Input } from "native-base";
import IconBox from "@/components/IconBox";
import MainIcon from "@/components/MainIcon";

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
      shadow={"9"}
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
        <MainIcon provider="ion" iconName="search" />
      </IconBox>
    </HStack>
  );
}
