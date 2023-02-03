import { useAuthUser } from "@react-query-firebase/auth";
import { getAuth } from "firebase/auth";
import React from 'react';
import { StyleSheet } from 'react-native';
import LoadingScreen from "../components/LoadingScreen";
import AuthStack from "../view/AuthStack";
import HomeScreen from "../view/HomeScreen";

interface FirebaseAuthStateProviderProps {

}

const FirebaseAuthStateProvider: React.FC<FirebaseAuthStateProviderProps> = ({ }) => {
    const { data, isLoading } = useAuthUser(['auth'], getAuth());
    const isAuth = !!data;

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (!isAuth) {
        return <AuthStack />;
    }

    return <HomeScreen />;
};

const styles = StyleSheet.create({

});

export default FirebaseAuthStateProvider;