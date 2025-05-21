import 'react-native-get-random-values';

import { Jersey20_400Regular, useFonts } from '@expo-google-fonts/jersey-20';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { StatusBar } from 'expo-status-bar';
import { config } from './config/gluestack-ui.config';
import { Loading } from './src/components/Loading';
import { AuthContextProvider } from './src/contexts/AuthContext';
import { Routes } from './src/routes';
import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jersey20_400Regular,
    Poppins_400Regular,
    Poppins_700Bold
  })

  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        style="auto"
        backgroundColor='transparent'
        translucent
      />
      {fontsLoaded ? (
        <AuthContextProvider>
          <Routes />
        </AuthContextProvider>
      ) : <Loading />}
    </GluestackUIProvider>
  );
}