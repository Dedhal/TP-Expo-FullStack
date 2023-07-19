import { View, Text, StyleSheet, Image, Button, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';

import axios from 'axios'

export default function Liste({ navigation }) {

    const [liste, setListe] = useState([]);

    const getListe = () => {
        axios.get('http://10.74.3.123:5000/get').then((response) => {
            console.log(response.data)
            setListe(response.data)
            console.log(liste)
        })
    }

    useEffect(() => {
        getListe()
    }, [])

    return (
        <View style={styles.container}>
            <Text>Liste</Text>

            {
                liste.map((item, index) => {
                    return (
                        <View key={index} style={styles.card}>
                            <Pressable onPress={() => navigation.navigate('RendezVous', { item: item })}>
                                <Image src={item.picture} style={{ width: 100, height: 100, borderRadius: 150 / 2 }} resizeMode="contain" />
                            </Pressable>
                            <View style={styles.contentWrapper}>
                                
                                <View style={styles.nameWrapper}>
                                    <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
                                    <Text>{item.city}</Text><Text>{item.state}</Text>
                                </View>

                                <View style={styles.delete}>
                                    <Button title="Supprimer" onPress={() => {

                                        axios.post("http://10.74.3.123:5000/delete", item).then((response) => {
                                            console.log(response.data)
                                            getListe()
                                        })
                                    }}
                                    />
                                </View>
                            </View>


                        </View>
                    )
                })
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey',
    },
    card: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: '95%',
        padding: 10,
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    nameWrapper: {
        justifyContent: 'center',
        marginLeft: 10,
    },
    contentWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
    },

    delete: {
        
        alignSelf: 'flex-end',
        
        },


})