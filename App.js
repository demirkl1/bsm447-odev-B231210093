import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { SavedProvider } from './src/context/SavedContext';

export default function App() {
  return (
    <SavedProvider>
      <NavigationContainer>
        <RootNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </SavedProvider>
  );
}
