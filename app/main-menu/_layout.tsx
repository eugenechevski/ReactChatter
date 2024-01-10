import { Box } from "native-base";
import { Slot } from "expo-router";

export default function MainMenuLayout() {
  return (
    <Box
      flex={1}
      height={'full'}
      width={'full'}
      alignItems="center"
      justifyContent="center"
    >
      {/** Child root */}
      <Slot />
    </Box>
  );
}
