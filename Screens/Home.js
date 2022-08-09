import { View, Text, StyleSheet, FlatList, Image, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import * as Network from 'expo-network'

export default function Home() {
    const [data, setData] = useState([])
    const [input, setInput] = useState('')
    const [status, setStatus] = useState(false)
    const navigation = useNavigation()
    const [network, setNetwork] = useState(async () => await Network.getNetworkStateAsync().then(res => setNetwork(res.isConnected)))

    useEffect(() => {
            const fetchData = async () => {
                const response = await fetch('https://restcountries.com/v2/all');
                if (response.ok) {
                    const res = await response.json()
                    setData(res)
                    setStatus(true)
                }
            }
            fetchData()
        
    }, [])
    const Item = ({ obj }) => {
        const region =
            obj.region == "Africa" ? "Afrique" : obj.region == "Asia" ? "Asie" : obj.region == "Americas" ? "Amérique" : obj.region == "Oceania" ? "Océanie" : obj.region == "Europe" ? "Europe" : obj.region == "Polar" ? "Polaire" : obj.region == "Antarctic" ? "Antartique" : obj.region
        return (
            <TouchableOpacity
                activeOpacity={0.4}
                style={styles.item}
                onPress={() => {
                    navigation.navigate('Details', {
                        data: obj
                    })
                }}
            >
                <Image style={{ height: 96, width: 160, borderRadius: 10, }}
                    source={{ uri: obj.flags.png }}
                />
                <View style={styles.info} >
                    <Text style={{ fontSize: 12 }}> Nom: {obj.translations.fr} </Text>
                    <Text style={{ fontSize: 12 }}> Hbts: {String(obj.population).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</Text>
                    <Text style={{ fontSize: 12 }}> Cptl: {obj.capital} </Text>
                    <Text style={{ fontSize: 12 }}> Cnt: {region} </Text>
                </View>
            </TouchableOpacity>
        )
    }

    if (network == true) {
        if (status === true) {
            return (
                <SafeAreaView style={styles.results}>
                    <View style={styles.form}>
                        <TextInput
                            value={input}
                            onChangeText={(e) => setInput(e)}
                            placeholder="Cherchez un pays"
                        ></TextInput>
                    </View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data.filter(el => el.translations.fr.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(input.toLowerCase().replace(/ /g, "")))}
                        renderItem={(e) => <Item obj={e.item} />}
                        keyExtractor={item => item.name}
                    />
                </SafeAreaView >
            )
        } else {
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: '#d6ecf2', }}>
                    <ActivityIndicator size={75} style={{ flex: 1 }} />
                </SafeAreaView>
            )
        }
    } else {
        return (
            <View style={styles.network} >
                <Text style={styles.networkCnt} >Veuillez vérifier votre connection</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    results: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d6ecf2',
        paddingBottom: 30,
    },
    item: {
        flexDirection: 'row',
        marginBottom: 10,
        width: '100%',
        justifyContent: 'center',
        borderRadius: 10,
    },
    info: {
        backgroundColor: '#add8e6',
        marginLeft: 5,
        width: '40%',
        borderRadius: 10,
        justifyContent: 'space-between',
    },
    form: {
        height: 50,
        width: 300,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    },
    network : {
        flex: 1,
        backgroundColor:'#d6ecf2',
        height: '100%',
        alignItems:'center',
        justifyContent: 'center'
    },
    networkCnt: {
        padding: 20,
        backgroundColor:'#add8e6',
        borderRadius: 20,
    }
})