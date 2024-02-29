/* A reusable wrapper around an icon button. */

import { useColorModeValue } from "native-base";
import colors from "@/styles/colors";
import { Ionicons, AntDesign, Foundation, MaterialCommunityIcons } from "@expo/vector-icons";

type IconProvider = "ion" | "ant" | "foundation" | "material";
type IonIcons =
  | "person"
  | "chatbubble-ellipses"
  | "people"
  | "moon"
  | "sunny"
  | "search";
type AntDesign = "contacts";
type Foundation = "wrench";
type MaterialCommunityIcons = "sort";
type IconName = IonIcons | AntDesign | Foundation | MaterialCommunityIcons;
type IconsObject = { [key in IconProvider]: JSX.Element };

export default function MainIcon({
  provider,
  iconName,
  size,
  onPress,
  style,
}: {
  provider: IconProvider;
  iconName: IconName;
  size?: number;
  onPress?: () => void;
  style?: { [key: string]: any };
}): JSX.Element {
  const iconColor = useColorModeValue(colors.main.dark, colors.main.crisp);
  const icons: IconsObject = {
    ion: (
      <Ionicons
        name={iconName as IonIcons}
        size={size ?? 36}
        color={iconColor}
        onPress={onPress}
        style={style}
      />
    ),
    ant: (
      <AntDesign
        name={iconName as AntDesign}
        size={size ?? 36}
        color={iconColor}
        onPress={onPress}
        style={style}
      />
    ),
    foundation: (
      <Foundation
        name={iconName as Foundation}
        size={size ?? 36}
        color={iconColor}
        onPress={onPress}
        style={style}
      />
    ),
    material: (
      <MaterialCommunityIcons
        name={iconName as MaterialCommunityIcons}
        size={size ?? 36}
        color={iconColor}
        onPress={onPress}
        style={style}
      />
    ),
  };

  return <>{icons[provider]}</>;
}
