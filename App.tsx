import 'react-native-get-random-values';

import { Jersey20_400Regular, useFonts } from '@expo-google-fonts/jersey-20';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { config } from './config/gluestack-ui.config';
import { Routes } from './src/routes';
import { AuthProvider } from './src/contexts/AuthContext';

export default function App() {
  const [fontsLoaded] = useFonts({ Jersey20_400Regular })

  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        style="dark"
        backgroundColor='transparent'
        translucent
      />
      {fontsLoaded ? (
        <AuthProvider>
          <Routes />
        </AuthProvider>
      ) : <View />}
    </GluestackUIProvider>
  );
}