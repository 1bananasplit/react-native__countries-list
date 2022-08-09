import { View, Text, StyleSheet, Image, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'

export const Details = () => {
    const countrie = useState(useRoute().params.data)
    const date = new Date
    const [day, setDay] = useState(date.getDay())
    const UTCtime = countrie[0].timezones[0].replace('UTC', 0).replace('0+', '+').replace('0-', '-').split(':')
    const [h] = useState(parseInt(date.getHours()))
    const [minutes, setMinutes] = useState(UTCtime[1] > 0 ? JSON.stringify(date.getMinutes() + parseInt(UTCtime[1])) : JSON.stringify(date.getMinutes()))
    const [hour, setHour] = useState(JSON.stringify(h + parseInt(UTCtime[0])))
    const [lat] = useState(countrie[0].latlng[0])
    const [lng] = useState(countrie[0].latlng[1])
    const [temp] = useState()
    const [ico] = useState()
    const [desc] = useState()
    const [input, setInput] = useState('32e8ecd80f54e358d52382c4a8284f76')
    // 32e8ecd80f54e358d52382c4a8284f76

    useEffect(() => {
        switch (date.getDay()) {
            case 0:
                if (hour >= 24) { setDay('Lundi') } else {
                    setDay('Dimanche')
                }; break;
            case 1:
                if (hour >= 24) { setDay('Mardi') } else {
                    setDay('Lundi')
                }; break;
            case 2:
                if (hour >= 24) { setDay('Mercredi') } else {
                    setDay('Mardi')
                }; break;
            case 3:
                if (hour >= 24) { setDay('Jeudi') } else {
                    setDay('Mercredi')
                }; break;
            case 4:
                if (hour >= 24) { setDay('Vendredi') } else {
                    setDay('Jeudi')
                }; break;
            case 5:
                if (hour >= 24) { setDay('Samedi') } else {
                    setDay('Vendredi')
                }; break;
            case 6:
                if (hour >= 24) { setDay('Dimanche') } else {
                    setDay('Samedi')
                }; break;
        }
        if (minutes > 60) {
            setMinutes(JSON.stringify(parseInt(minutes) - 60))
            setHour(JSON.stringify(parseInt(hour) + 1))
        }

        if (hour == 24) {
            setHour('00')
        } else if (hour > 24) {
            setHour(JSON.stringify(parseInt(hour) - 24))
        }
    }, [])

    const fetchData = () =>{
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${input}&units=metric&lang=fr`)
            .then(res => res.JSON())
            .then(datas => {
                setTemp(Math.floor(datas.main.temp))
                setIco(datas.weather[0].icon)
                setDesc(datas.weather[0].description)
            })
        }

        const region =
        countrie[0].region=="Africa"?"Afrique": countrie[0].region=="Asia"?"Asie":countrie[0].region=="Americas"?"Amérique":countrie[0].region=="Oceania"?"Océanie":countrie[0].region=="Europe"?"Europe":countrie[0].region=="Polar"?"Polaire":countrie[0].region=="Antarctic"?"Antartique":countrie[0].region

    return (
        <View style={style.details} >

            {/* <View style={style.form}>
                <TextInput
                    style={style.txtInput}
                    value={input}
                    onChangeText={(e) => setInput(e)}
                    placeholder="Entrez la clé API"
                ></TextInput>

                <Button
                    onPress={fetchData}
                    title="search"
                    color="#add8e6"
                     />
            </View> */}
            <View style={{ alignItems: 'center', }}>
                <Image style={style.flag} source={{ uri: countrie[0].flags.png }} />
            </View>

            <View style={{ height: '50%', marginTop: 5, justifyContent: 'space-between' }} >
                <View style={style.infoBox}>
                    <Text style={style.infoName}>Nom:</Text>
                    <Text style={style.info}> {countrie[0].translations.fr}</Text>
                </View>
                <View style={style.infoBox}>
                    <Text style={style.infoName}>Habitants:</Text>
                    <Text style={style.info}> {String(countrie[0].population).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</Text>
                </View>
                <View style={style.infoBox}>
                    <Text style={style.infoName}>Capitale:</Text>
                    <Text style={style.info}> {countrie[0].capital}</Text>
                </View>
                <View style={style.infoBox}>
                    <Text style={style.infoName}>Continent:</Text>
                    <Text style={style.info}> {region}</Text>
                </View>
                <View style={style.infoBox}>
                    <Text style={style.infoName}>Date locale:</Text>
                    <Text style={style.info}>{day} {hour}H {minutes}Mins</Text>
                </View>
                <View style={style.infoBox}>
                    <Text style={style.infoName}>Météo:</Text>
                    {/* <Text style={style.info}>{temp}°C</Text>
                    <Image style={{ height: 50, width: 50 }} source={{ uri: `https://openweathermap.org/img/wn/${ico}@2x.png` }} />
                    <Text style={style.info}>{desc} </Text> */}
                    <Text style={style.info}>(déconnecté)</Text>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    details: {
        flex: 1,
        backgroundColor: '#d6ecf2',
        width: '100%',
        alignItems: 'center',
    },
    infoBox: {
        marginLeft: 5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#add8e6',
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 5,
    },
    infoName: {
        margin: 2,
        fontFamily: 'serif',
        fontSize: 20,
    },
    info: {
        marginTop: 2,
    },
    flag: {
        marginTop: 5,
        height: 184,
        width: 300,
        borderRadius: 10,
    },
    form: {
        marginVertical: 5,
        flexDirection: 'row',
    },
    txtInput: {
        height: 50,
        width: 200,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    }
})