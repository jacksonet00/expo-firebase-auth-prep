import React from 'react';
import { StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';

interface LoadingScreenProps {

}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ }) => {
    return (
        <SafeAreaView style={styles.container}>
            <ActivityIndicator />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default LoadingScreen;