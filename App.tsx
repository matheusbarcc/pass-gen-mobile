import 'react-native-get-random-values';

import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { config } from './config/gluestack-ui.config';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        style="dark"
        backgroundColor='transparent'
        translucent
      />
      {fontsLoaded ? <Routes /> : <View />}
    </GluestackUIProvider>
  );
}