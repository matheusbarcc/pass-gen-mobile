import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useAuth } from "../hooks/useAuth"
import { History } from "../screens/History"
import { Home } from "../screens/Home"
import { SignIn } from "../screens/SignIn"
import { Loading } from "../components/Loading"

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  const { authState, isLoadingStoredToken } = useAuth()

  if(isLoadingStoredToken) {
    return <Loading />
  }

  return (
    <Navigator screenOptions={{ headerShown: false }}>

      {!authState?.authenticated ? (
        <>
          <Screen
            name="signin"
            component={SignIn}
          />
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