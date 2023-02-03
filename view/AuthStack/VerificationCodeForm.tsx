import { PhoneAuthProvider, signInWithCredential, getAuth } from "firebase/auth";
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { AuthStackNavProps } from ".";

const VerificationCodeForm: React.FC<AuthStackNavProps<"VerificationCode">> = ({ route }) => {
    const { verificationId } = route.params;

    const [verificationCode, setVerificationCode] = useState('');

    async function handleContinue(): Promise<void> {
        const authCredential = PhoneAuthProvider.credential(verificationId!, verificationCode);
        try {
            await signInWithCredential(getAuth(), authCredential);
        }
        catch (error) {
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={verificationCode}
                onChangeText={(text) => setVerificationCode(text)}
                placeholder="6-digit Verification Code"
            />
            <Button
                title="Continue"
                onPress={handleContinue}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    }
});

export default VerificationCodeForm;