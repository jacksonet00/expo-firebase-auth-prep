import { StyleSheet } from 'react-native';
import { initializeApp } from 'firebase/app';
import * as FirebaseCore from 'expo-firebase-core';
import { QueryClient, QueryClientProvider } from "react-query";
import FirebaseAuthStateProvider from "./providers/FirebaseAuthStateProvider";
import { NavigationContainer } from "@react-navigation/native";

initializeApp(
  FirebaseCore.DEFAULT_WEB_APP_OPTIONS as FirebaseCore.FirebaseOptions
);

export default (): JSX.Element => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <NavigationContainer>
        <FirebaseAuthStateProvider />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({

});
