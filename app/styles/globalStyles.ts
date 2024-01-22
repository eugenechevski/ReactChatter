import { Button, extendTheme } from "native-base";
import colors from "./colors";

export default extendTheme({
  colors,
  components: {
    Button: {
      defaultProps: {
        backgroundColor: "main.water",
        rounded: "full",
        shadow: "9",
        _text: {
          color: "main.crisp",
          fontSize: "md",
          shadow: "9",
        },
      },
    },
  },
});
