import { Button, View, StyleSheet } from 'react-native';

export default function MainMenu({ navigation }) {
    return (
        <View style={styles.container}>
            <Button title="Scanner" onPress={() => navigation.navigate('Scanner')} />
            <Button title="Liste" onPress={() => navigation.navigate('Liste')} />
        </View>
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
})