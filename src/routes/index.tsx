import { Box } from "@gluestack-ui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";

export function Routes() {
  return (
    <Box flex={1} bg="$background">
      <NavigationContainer >
        <AppRoutes />
      </NavigationContainer>
    </Box>
  )
}