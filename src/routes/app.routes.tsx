import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useAuth } from "../hooks/use-auth"
import { History } from "../screens/History"
import { Home } from "../screens/Home"

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  const { authState, onLogout } = useAuth()

  return (
    <Navigator screenOptions={{ headerShown: false }}>

      {!authState?.authenticated ? (
        <>
          {/* tela de login e tela de cadastro */}
        </>
      ) : (
        <>
          <Screen
            name="home"
            component={Home}
          />

          <Screen
            name="history"
            component={History}
          />
        </>
      )}
    </Navigator>
  )
}