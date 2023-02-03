import { RouteProp } from "@react-navigation/native";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import React from 'react';
import { StyleSheet } from 'react-native';
import PhoneForm from "./PhoneForm";
import VerificationCodeForm from "./VerificationCodeForm";

interface AuthStackProps {

}

export type AuthStackParamList = {
    Phone: undefined;
    VerificationCode: {
        verificationId: string;
    };
};

export type AuthStackNavProps<T extends keyof AuthStackParamList> = {
    navigation: StackNavigationProp<AuthStackParamList, T>;
    route: RouteProp<AuthStackParamList, T>;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack: React.FC<AuthStackProps> = ({ }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Phone"
                component={PhoneForm}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="VerificationCode"
                component={VerificationCodeForm}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({

});

export default AuthStack;