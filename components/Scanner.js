import { Alert, StyleSheet, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

import React, { useState, useEffect } from 'react';

import axios from 'axios';

export default function Scanner() {
    
    const [permission, requestPermission] = Camera.useCameraPermissions()
    const [scanned, setScanned] = useState(false);
    
    useEffect(() => {
        if (!permission?.granted) {
            requestPermission()
        }
    }, [])

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);

        axios.get(data).then((response) => {
            console.log(response.data);

            infos = response.data["results"][0]

            console.log(infos)
            
            let data = {}
            data["gender"] = infos["gender"]
            data["firstName"] = infos["name"]["first"]
            data["lastName"] = infos["name"]["last"]
            data["state"] = infos["location"]["state"]
            data["city"] = infos["location"]["city"]
            data["picture"] = infos["picture"]["medium"]

            console.log(data)

            axios.post("http://10.74.3.123:5000/add", data).then((response) => console.log(response.data))

        });

        Alert.alert(
            'Scanné',
            `Bar code with type and data ${data} has been scanned!`,
            [
                {
                    text: 'Ok', onPress: () => setScanned(false)
                },
            ],
            { cancelable: false },
        );
    };

    return (
        <View style={ styles.container }>
            <Camera
                style={styles.camera}
                type={CameraType.back}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    camera: {
        flex: 1,
    },
});