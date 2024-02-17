import { extendTheme } from "native-base";
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
    Text: {
      baseStyle: {
        shadow: "9",
      },
    },
    Input: {
      defaultProps: {
        color: "main.crisp",
        shadow: "9",
        fontSize: "md",
        variant: "filled",
        borderRadius: "full",
        backgroundColor: "main.dirty",
        _focus: {
          borderColor: "main.water",
          borderWidth: 2,
        },
      }
    }
  },
});
