import { StatusBar } from "expo-status-bar";
import { View, SafeAreaView, Platform, Text, TouchableOpacity, ScrollView } from "react-native";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import tw from 'twrnc'
import React from "react";
import { styles } from '../theme'

const ios = Platform.OS == 'ios';

export default function HomeScreen() {
    return(
        <View style={tw`flex-1 bg-neutral-800 pt-12`}>
            <SafeAreaView style={ios ? tw`-mb-2` : tw`mb-3`}>
                <StatusBar style="light" />
                <View style={tw`flex-row justify-between items-center mx-4`}>
                    <Bars3CenterLeftIcon size="30" stroke={2} color="white" />
                    <Text style={tw`text-white text-3xl font-bold`}><Text style={styles.text}>M</Text>ovies</Text>
                    <TouchableOpacity>
                        <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 10}}>
                
            </ScrollView>
        </View>
    )
}