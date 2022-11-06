import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { New } from "../screens/New";
import { Pools } from "../screens/Pools";

import { PlusCircle, SoccerBall } from "phosphor-react-native";
import { useTheme } from "native-base";
import { Platform } from "react-native";
import { Find } from "../screens/Find";
import { Details } from "../screens/Details";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const { colors, sizes } = useTheme();

  const size = sizes[6];
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: "beside-icon",
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[500],
        tabBarStyle: {
          position: "absolute",
          height: sizes[22],
          backgroundColor: colors.gray[800],
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          position: "relative",
          top: Platform.OS === "android" ? -10 : 0,
        },
      }}
    >
      <Screen
        name="new"
        options={{
          tabBarIcon: ({ color }) => <PlusCircle color={color} size={size} />,
          tabBarLabel: "Novo bolão",
        }}
        component={New}
      />

      <Screen
        name="pools"
        options={{
          tabBarIcon: ({ color }) => <SoccerBall color={color} size={size} />,
          tabBarLabel: "Meus bolões",
        }}
        component={Pools}
      />

      <Screen
        name="find"
        options={{
          tabBarButton: () => null,
        }}
        component={Find}
      />

      <Screen
        name="details"
        options={{
          tabBarButton: () => null,
        }}
        component={Details}
      />
    </Navigator>
  );
}
