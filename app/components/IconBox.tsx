import { Box } from "native-base";
import React from "react";

export default function IconBox({ children, ...props }): React.ReactElement {
  return (
    <Box
      width={"16"}
      height={"16"}
      borderRadius={"full"}
      backgroundColor={"main.water"}
      shadow={"9"}
      justifyContent={"center"}
      alignItems={"center"}
      {...props}
    >
      {children}
    </Box>
  );
}
