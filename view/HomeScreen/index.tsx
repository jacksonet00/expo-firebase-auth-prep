import { signOut, getAuth } from "firebase/auth";
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

interface HomeScreenProps {

}

const HomeScreen: React.FC<HomeScreenProps> = ({ }) => {
    async function handleSignOut() {
        await signOut(getAuth());
    }

    return (
        <View style={styles.container}>
            <Text>{getAuth().currentUser!.phoneNumber}</Text>
            <Button title="Sign Out" onPress={handleSignOut} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});

export default HomeScreen;