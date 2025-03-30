import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { GluestackUIProvider, Text } from '@gluestack-ui/themed';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { config } from './config/gluestack-ui.config';

export default function App() {
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_700Bold })

  return (
    <GluestackUIProvider config={config}>
      <View style={styles.container}>
        <StatusBar
          style="dark"
          backgroundColor='transparent'
          translucent
        />
        {fontsLoaded ? <Text color="$green700" fontSize={35} >Home</Text> : <View />}
      </View>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
