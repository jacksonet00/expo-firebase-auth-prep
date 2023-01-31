import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from "react";
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { useAuthSignInWithPhoneNumber } from "@react-query-firebase/auth";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { getApp, initializeApp } from 'firebase/app';
import * as FirebaseCore from 'expo-firebase-core';
import { QueryClient, QueryClientProvider } from "react-query";

initializeApp(
  FirebaseCore.DEFAULT_WEB_APP_OPTIONS as FirebaseCore.FirebaseOptions
);

export default function Providers() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <App />
    </QueryClientProvider>
  );
}

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const recaptchaElement: React.MutableRefObject<any> = useRef(null);

  const { mutate: submitPhoneNumber } = useAuthSignInWithPhoneNumber(getAuth());

  function handleSubmitPhoneNumber() {
    console.log(submitPhoneNumber({
      phoneNumber,
      // TODO: try appending this to the DOM in an async fn onMount
      appVerifier: new RecaptchaVerifier('recaptcha', {}, getAuth()),
    }));
  }

  function handleSubmitVerificationCode() {
    console.log(verificationCode);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        placeholder="Phone Number"
      />
      <Button
        title="Submit"
        onPress={handleSubmitPhoneNumber}
      />
      <TextInput
        style={styles.input}
        value={verificationCode}
        onChangeText={(text) => setVerificationCode(text)}
        placeholder="Phone Number"
      />
      <Button
        title="Submit"
        onPress={handleSubmitVerificationCode}
      />
      <StatusBar style="auto" />
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaElement}
        firebaseConfig={getApp().options}
        attemptInvisibleVerification={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  }
});
