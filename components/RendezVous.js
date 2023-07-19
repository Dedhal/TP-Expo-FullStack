import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import { Calendar } from 'expo-calendar'
import { useState, useEffect } from 'react'

export default function RendezVous({ navigation, route }, props) {
    const [prop, setProp] = useState(route.params.item)
    const [title, setTitle] = useState(prop.firstName + ' ' + prop.lastName)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const handleAddEvent = async () => {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
            const calendar = await Calendar.getDefaultCalendarAsync();
            await Calendar.createEventAsync(calendar.id, {
                title,
                startDate,
                endDate,
                timeZone: 'Europe/Paris',
                alarms: [{
                    relativeOffset: -30,
                    method: Calendar.AlarmMethod.ALERT,
                }],
            });
        }
    }

    return (
        <View>
            <View style={styles.card}>
                <Image src={prop.picture} style={{ width: 100, height: 100, borderRadius: 150 / 2 }} resizeMode="contain" />

                <View style={styles.contentWrapper}>

                    <View style={styles.nameWrapper}>
                        <Text style={styles.name}>{prop.firstName} {prop.lastName}</Text>
                        <Text>{prop.city}</Text><Text>{prop.state}</Text>
                    </View>
                </View>


            </View>

            <View style={styles.calendar}>
                <Text>Prendre Rendez-vous</Text>
                <TextInput></TextInput>
            </View>

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

    calendar: {
        marginTop: 20,
        
        }


})