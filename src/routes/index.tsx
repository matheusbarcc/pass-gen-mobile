import { Box } from "@gluestack-ui/themed";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { useAuth } from "../hooks/useAuth";
import { Loading } from "../components/Loading";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { AppRoutes } from "./app.routes";

export function Routes() {
  const { authState, isLoadingStoredToken } = useAuth()

  const theme = DefaultTheme
  theme.colors.background = gluestackUIConfig.tokens.colors.background

  if (isLoadingStoredToken) {
    return <Loading />
  }

  return (
    <Box flex={1} bg="$background">
      <NavigationContainer >
        {authState?.authenticated ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}