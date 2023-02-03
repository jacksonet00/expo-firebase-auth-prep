import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { getApp } from "firebase/app";
import { ApplicationVerifier, getAuth, PhoneAuthProvider } from "firebase/auth";
import React, { useRef, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { AuthStackNavProps } from './index';

const PhoneForm: React.FC<AuthStackNavProps<"Phone">> = ({
    navigation,
}) => {
    const [phoneNumber, setPhoneNumber] = useState('');

    const recaptchaElement: React.MutableRefObject<any> = useRef(null);

    async function _verifyPhoneNumber(
        phone: string,
        applicationVerifierRef: React.MutableRefObject<ApplicationVerifier>
    ): Promise<[{ verificationId: string; } | null, any]> {
        try {
            const phoneAuthProvider = new PhoneAuthProvider(getAuth());
            const verificationId = await phoneAuthProvider.verifyPhoneNumber(
                phone,
                applicationVerifierRef.current
            );
            return [
                {
                    verificationId,
                },
                null,
            ];
        } catch (error) {
            return [null, error];
        }
    }

    async function handleContinue(): Promise<void> {
        const [res, error] = await _verifyPhoneNumber(
            phoneNumber,
            recaptchaElement as React.MutableRefObject<ApplicationVerifier>,
        );

        if (error) {
        }
        else {
            navigation.navigate("VerificationCode", {
                verificationId: res!.verificationId,
            });
        }
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
                title="Continue"
                onPress={handleContinue}
            />
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaElement}
                firebaseConfig={getApp().options}
                attemptInvisibleVerification={true}
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

export default PhoneForm;