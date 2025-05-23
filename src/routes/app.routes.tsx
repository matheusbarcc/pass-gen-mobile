import { Platform, TouchableWithoutFeedback } from "react-native";
import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { gluestackUIConfig } from "../../config/gluestack-ui.config";

import { Home } from "../screens/Home";
import { History } from "../screens/History";
import { Profile } from "../screens/Profile";

import Password from "phosphor-react-native/src/icons/Password";
import ClipboardText from "phosphor-react-native/src/icons/ClipboardText";
import UserCircle from "phosphor-react-native/src/icons/UserCircle";

type AppRoutes = {
  home: undefined
  history: undefined
  profile: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const { tokens } = gluestackUIConfig
  const iconSize = tokens.space["8"]

  return (
    <Navigator initialRouteName="home" screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: tokens.colors.green800,
      tabBarInactiveTintColor: tokens.colors.base700,
      tabBarStyle: {
        backgroundColor: tokens.colors.white,
        borderTopWidth: 0,
        height: Platform.OS === 'android' ? 96 : 96,
        paddingBottom: tokens.space["12"],
        paddingTop: tokens.space["4"]
      },
      tabBarLabelStyle: {
        marginTop: 4,
        fontSize: 14
      }
    }}>
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <UserCircle color={color} size={iconSize} weight={focused ? "fill" : "regular"} />
          ),
          tabBarLabel: "Perfil",
        }}
      />

      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Password color={color} size={iconSize} weight={focused ? "fill" : "regular"} />
          ),
          tabBarLabel: "Gerar",
        }}
      />

      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <ClipboardText color={color} size={iconSize} weight={focused ? "fill" : "regular"} />
          ),
          tabBarLabel: "Histórico",
        }}
      />
    </Navigator>
  )
}